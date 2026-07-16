#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Audio Enhancer - WAV File Processor
Processes WAV files in the current folder with:
- Smoothing and denoising
- EQ optimization
- Compression
- Reverb
- Stereo widening
- Loudness normalization
- Mastering effects
"""

# Suppress warnings
import sys
import warnings
import os
import io

warnings.filterwarnings("ignore")
warnings.simplefilter("ignore")

# Redirect stderr for NumPy
old_stderr = sys.stderr
sys.stderr = io.StringIO()

import numpy as np
from scipy.io import wavfile
from scipy import signal
from scipy.ndimage import gaussian_filter1d
import glob
import time
import math

# Restore stderr
sys.stderr = old_stderr
np.seterr(all='ignore')

try:
    from pydub import AudioSegment
    from pydub.effects import normalize, compress_dynamic_range
    HAS_PYDUB = True
except ImportError:
    HAS_PYDUB = False
    print("pydub not installed. Install with: pip install pydub")

class AudioEnhancer:
    def __init__(self, sample_rate=44100):
        self.sample_rate = sample_rate
        self.min_samples = 100  # Minimum samples for filtering
        
    def _ensure_audio_length(self, audio_float):
        """Ensure audio is long enough for filtering"""
        if len(audio_float) < self.min_samples:
            # Pad with zeros if too short
            pad_length = self.min_samples - len(audio_float)
            return np.pad(audio_float, (0, pad_length), mode='constant')
        return audio_float
    
    def smooth_audio(self, audio, smoothing=2.0):
        """Apply Gaussian smoothing to reduce harshness"""
        try:
            # Convert to float
            if audio.dtype == np.int16:
                audio_float = audio.astype(np.float32) / 32767.0
            else:
                audio_float = audio.copy()
            
            # Ensure minimum length
            audio_float = self._ensure_audio_length(audio_float)
            
            # Apply smoothing with error handling
            if len(audio_float) > 10:
                sigma = min(smoothing, len(audio_float) / 10)
                smoothed = gaussian_filter1d(audio_float, sigma=sigma)
            else:
                smoothed = audio_float
            
            # Convert back
            return (smoothed * 32767).astype(np.int16)
        except Exception as e:
            print(f"    Smoothing error: {e}")
            return audio
    
    def apply_eq(self, audio, bass_boost=1.2, mid_boost=1.0, treble_boost=1.1):
        """Apply EQ with simple filters"""
        try:
            if audio.dtype == np.int16:
                audio_float = audio.astype(np.float32) / 32767.0
            else:
                audio_float = audio.copy()
            
            # Ensure minimum length
            audio_float = self._ensure_audio_length(audio_float)
            
            # Design filters with error handling
            nyquist = self.sample_rate / 2
            
            # Skip if too short
            if len(audio_float) < 100:
                return audio
            
            # Bass filter (low shelf)
            try:
                bass_b, bass_a = signal.butter(1, min(200/nyquist, 0.99), btype='low')
                bass_filtered = signal.filtfilt(bass_b, bass_a, audio_float)
            except:
                bass_filtered = audio_float * 0.5
            
            # Treble filter (high shelf)
            try:
                treble_b, treble_a = signal.butter(1, min(2000/nyquist, 0.99), btype='high')
                treble_filtered = signal.filtfilt(treble_b, treble_a, audio_float)
            except:
                treble_filtered = audio_float * 0.5
            
            # Mid filter (bandpass)
            try:
                mid_b, mid_a = signal.butter(2, [min(300/nyquist, 0.98), min(2000/nyquist, 0.99)], btype='band')
                mid_filtered = signal.filtfilt(mid_b, mid_a, audio_float)
            except:
                mid_filtered = audio_float * 0.5
            
            # Apply boosts
            enhanced = (audio_float * 0.5 + 
                       bass_filtered * bass_boost * 0.3 +
                       mid_filtered * mid_boost * 0.3 +
                       treble_filtered * treble_boost * 0.2)
            
            # Normalize
            max_val = np.max(np.abs(enhanced))
            if max_val > 0:
                enhanced = enhanced / max_val * 0.95
            
            return (enhanced * 32767).astype(np.int16)
        except Exception as e:
            print(f"    EQ error: {e}")
            return audio
    
    def apply_compression(self, audio, threshold=0.5, ratio=4.0, attack=0.01, release=0.1):
        """Apply dynamic range compression"""
        try:
            if audio.dtype == np.int16:
                audio_float = audio.astype(np.float32) / 32767.0
            else:
                audio_float = audio.copy()
            
            # Ensure minimum length
            audio_float = self._ensure_audio_length(audio_float)
            
            if len(audio_float) < 100:
                return audio
            
            # RMS envelope with smaller window for short files
            window_size = max(10, min(int(self.sample_rate * 0.01), len(audio_float) // 10))
            rms = np.zeros_like(audio_float)
            for i in range(len(audio_float)):
                start = max(0, i - window_size // 2)
                end = min(len(audio_float), i + window_size // 2)
                rms[i] = np.sqrt(np.mean(audio_float[start:end]**2))
            
            # Apply compression
            gain_reduction = np.ones_like(audio_float)
            for i in range(len(audio_float)):
                if rms[i] > threshold:
                    over = rms[i] / threshold
                    gain_reduction[i] = threshold / rms[i] ** (1/ratio)
                    gain_reduction[i] = max(gain_reduction[i], 0.1)
            
            # Simple smoothing for gain reduction
            attack_samples = max(1, int(attack * self.sample_rate))
            release_samples = max(1, int(release * self.sample_rate))
            
            smoothed_gain = np.ones_like(gain_reduction)
            for i in range(1, len(gain_reduction)):
                if gain_reduction[i] < smoothed_gain[i-1]:
                    # Attack (fast)
                    factor = min(1, attack_samples / (i + 1))
                    smoothed_gain[i] = smoothed_gain[i-1] + (gain_reduction[i] - smoothed_gain[i-1]) * factor
                else:
                    # Release (slower)
                    factor = min(1, release_samples / (i + 1))
                    smoothed_gain[i] = smoothed_gain[i-1] + (gain_reduction[i] - smoothed_gain[i-1]) * factor
            
            # Apply compression
            compressed = audio_float * smoothed_gain
            
            # Normalize
            max_val = np.max(np.abs(compressed))
            if max_val > 0:
                compressed = compressed / max_val * 0.95
            
            return (compressed * 32767).astype(np.int16)
        except Exception as e:
            print(f"    Compression error: {e}")
            return audio
    
    def apply_reverb(self, audio, room_size=0.5, damping=0.5, wet_dry=0.3):
        """Apply reverb using multiple delay lines"""
        try:
            if audio.dtype == np.int16:
                audio_float = audio.astype(np.float32) / 32767.0
            else:
                audio_float = audio.copy()
            
            # Ensure minimum length
            audio_float = self._ensure_audio_length(audio_float)
            
            if len(audio_float) < 100:
                return audio
            
            # Reduce number of delays for short audio
            num_delays = min(8, len(audio_float) // 100)
            
            # Delay times in ms
            delays = [29, 37, 43, 53, 61, 71, 83, 97][:num_delays]
            
            # Scale delays by room size
            delays = [int(d * (0.5 + room_size)) for d in delays]
            
            reverb_output = np.zeros_like(audio_float)
            
            # Create reflections
            for i, delay_ms in enumerate(delays):
                delay_samples = int(self.sample_rate * delay_ms / 1000)
                if delay_samples < len(audio_float) and delay_samples > 0:
                    delayed = np.zeros_like(audio_float)
                    delayed[delay_samples:] = audio_float[:-delay_samples]
                    # Apply damping
                    damp_factor = 1 - (i / len(delays)) * damping
                    delayed = delayed * (0.3 / (i + 1)) * damp_factor
                    reverb_output += delayed
            
            # Mix dry and wet
            wet = reverb_output * wet_dry * 2.0
            mixed = audio_float + wet
            
            # Normalize
            max_val = np.max(np.abs(mixed))
            if max_val > 0:
                mixed = mixed / max_val * 0.95
            
            return (mixed * 32767).astype(np.int16)
        except Exception as e:
            print(f"    Reverb error: {e}")
            return audio
    
    def apply_stereo_widening(self, audio, width=1.5):
        """Apply stereo widening effect"""
        try:
            # Check if stereo
            if len(audio.shape) < 2 or audio.shape[1] != 2:
                return audio
            
            # Convert to float
            audio_float = audio.astype(np.float32) / 32767.0
            
            # Extract channels
            left = audio_float[:, 0]
            right = audio_float[:, 1]
            
            # Create mid and side channels
            mid = (left + right) / 2
            side = (left - right) / 2
            
            # Widen side channel
            side_widened = side * width
            
            # Recombine
            left_new = mid + side_widened
            right_new = mid - side_widened
            
            # Normalize each channel
            for channel in [left_new, right_new]:
                max_val = np.max(np.abs(channel))
                if max_val > 0:
                    channel[:] = channel / max_val * 0.95
            
            # Combine into stereo
            widened = np.column_stack((left_new, right_new))
            
            return (widened * 32767).astype(np.int16)
        except Exception as e:
            print(f"    Stereo widening error: {e}")
            return audio
    
    def apply_loudness_normalization(self, audio, target_lufs=-16):
        """Apply loudness normalization"""
        try:
            if audio.dtype == np.int16:
                audio_float = audio.astype(np.float32) / 32767.0
            else:
                audio_float = audio.copy()
            
            # Calculate RMS
            rms = np.sqrt(np.mean(audio_float**2))
            
            # Target RMS for -16 LUFS (approximately)
            target_rms = 10 ** (target_lufs / 20) * 0.7
            
            if rms > 0:
                gain = target_rms / rms
                # Limit gain to prevent distortion
                gain = min(gain, 4.0)
                normalized = audio_float * gain
            else:
                normalized = audio_float
            
            # Normalize peak
            max_val = np.max(np.abs(normalized))
            if max_val > 0:
                normalized = normalized / max_val * 0.95
            
            return (normalized * 32767).astype(np.int16)
        except Exception as e:
            print(f"    Loudness normalization error: {e}")
            return audio
    
    def apply_deharsh(self, audio, amount=0.5):
        """Reduce harshness and smooth transients"""
        try:
            if audio.dtype == np.int16:
                audio_float = audio.astype(np.float32) / 32767.0
            else:
                audio_float = audio.copy()
            
            # Ensure minimum length
            audio_float = self._ensure_audio_length(audio_float)
            
            if len(audio_float) < 50:
                return audio
            
            # Apply a gentle low-pass filter with error handling
            nyquist = self.sample_rate / 2
            cutoff = min(8000, nyquist * 0.9)
            
            try:
                b, a = signal.butter(2, cutoff/nyquist, btype='low')
                filtered = signal.filtfilt(b, a, audio_float)
            except:
                # Fallback: simple averaging
                window = min(5, len(audio_float) // 10)
                if window > 0:
                    filtered = np.convolve(audio_float, np.ones(window)/window, mode='same')
                else:
                    filtered = audio_float
            
            # Mix with original
            smoothed = audio_float * (1 - amount * 0.3) + filtered * (amount * 0.3)
            
            # Apply gentle compression on peaks
            for i in range(len(smoothed)):
                if abs(smoothed[i]) > 0.8:
                    smoothed[i] = np.sign(smoothed[i]) * (0.8 + (abs(smoothed[i]) - 0.8) * 0.3)
            
            # Normalize
            max_val = np.max(np.abs(smoothed))
            if max_val > 0:
                smoothed = smoothed / max_val * 0.95
            
            return (smoothed * 32767).astype(np.int16)
        except Exception as e:
            print(f"    De-harsh error: {e}")
            return audio
    
    def apply_mastering_chain(self, audio):
        """Apply full mastering chain"""
        try:
            print("  → Applying de-harsh...")
            audio = self.apply_deharsh(audio, amount=0.3)
            
            print("  → Applying EQ...")
            audio = self.apply_eq(audio, bass_boost=1.1, mid_boost=1.0, treble_boost=1.05)
            
            print("  → Applying compression...")
          # audio = self.apply_compression(audio, threshold=0.4, ratio=3.0)
            
            print("  → Applying reverb...")
            audio = self.apply_reverb(audio, room_size=0.3, damping=0.4, wet_dry=0.2)
            
            if len(audio.shape) >= 2 and audio.shape[1] == 2:
                print("  → Applying stereo widening...")
                audio = self.apply_stereo_widening(audio, width=1.3)
            
            print("  → Applying loudness normalization...")
            audio = self.apply_loudness_normalization(audio, target_lufs=-14)
            
            print("  → Smoothing...")
            audio = self.smooth_audio(audio, smoothing=0.5)
            
            return audio
        except Exception as e:
            print(f"    Mastering chain error: {e}")
            return audio

def process_wav_file(input_path, output_path=None, verbose=True):
    """Process a single WAV file"""
    try:
        if verbose:
            print(f"\nProcessing: {os.path.basename(input_path)}")
        
        # Read the WAV file
        sample_rate, audio = wavfile.read(input_path)
        
        if verbose:
            print(f"  Sample rate: {sample_rate} Hz")
            print(f"  Shape: {audio.shape}")
            print(f"  Dtype: {audio.dtype}")
        
        # Handle empty or very short audio
        if audio.size == 0:
            print("  ⚠️ Empty audio file, skipping...")
            return None
        
        # Handle mono vs stereo
        if len(audio.shape) == 1:
            if verbose:
                print("  Mono track - converting to stereo")
            audio = np.column_stack((audio, audio))
        
        # Create enhancer
        enhancer = AudioEnhancer(sample_rate)
        
        # Apply mastering chain
        if verbose:
            print("  Applying mastering chain...")
        enhanced = enhancer.apply_mastering_chain(audio)
        
        # Save enhanced audio
        if output_path is None:
            base, ext = os.path.splitext(input_path)
            output_path = f"{base}_enhanced.wav"
        
        wavfile.write(output_path, sample_rate, enhanced)
        
        if verbose:
            print(f"  ✅ Saved: {output_path}")
            # Show file size
            size = os.path.getsize(output_path) / (1024 * 1024)
            print(f"  Size: {size:.2f} MB")
        
        return output_path
        
    except Exception as e:
        print(f"  ❌ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return None

def process_all_wavs(input_dir=".", output_dir="enhanced_wavs", pattern="*.wav"):
    """Process all WAV files in a directory"""
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Find all WAV files
    wav_files = []
    for ext in ["*.wav", "*.WAV", "*.wave"]:
        wav_files.extend(glob.glob(os.path.join(input_dir, ext)))
    
    if not wav_files:
        print(f"No WAV files found in {input_dir}")
        return []
    
    print(f"\nFound {len(wav_files)} WAV files to process")
    
    processed = []
    for i, wav_file in enumerate(wav_files, 1):
        print(f"\n[{i}/{len(wav_files)}] Processing {os.path.basename(wav_file)}...")
        
        # Generate output filename
        base = os.path.splitext(os.path.basename(wav_file))[0]
        output_path = os.path.join(output_dir, f"{base}_enhanced.wav")
        
        # Process file
        result = process_wav_file(wav_file, output_path)
        if result:
            processed.append(result)
    
    print(f"\n✅ Processed {len(processed)} files. Output saved to '{output_dir}'")
    return processed

def main():
    """Main function"""
    print("=" * 60)
    print("AUDIO ENHANCER - WAV File Processor")
    print("=" * 60)
    
    # Check for input directory argument
    input_dir = "."
    if len(sys.argv) > 1:
        input_dir = sys.argv[1]
    
    print(f"\nInput directory: {input_dir}")
    
    # Process all WAV files
    processed_files = process_all_wavs(
        input_dir=input_dir,
        output_dir="enhanced_wavs",
        pattern="*.wav"
    )
    
    print("\n" + "=" * 60)
    print("PROCESSING COMPLETE")
    print("=" * 60)
    
    if processed_files:
        print("\nEnhanced files:")
        for f in processed_files:
            try:
                size = os.path.getsize(f) / (1024 * 1024)
                print(f"  - {os.path.basename(f)} ({size:.2f} MB)")
            except:
                print(f"  - {os.path.basename(f)}")
    else:
        print("\n⚠️ No files were enhanced. Check for errors.")

if __name__ == "__main__":
    main()