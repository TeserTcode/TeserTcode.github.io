import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import cmath

# Function to apply domain coloring
def domain_coloring(func, xlim=(-5, 5), ylim=(-5, 5), resolution=500):
    x = np.linspace(xlim[0], xlim[1], resolution)
    y = np.linspace(ylim[0], ylim[1], resolution)
    X, Y = np.meshgrid(x, y)
    Z = X + 1j * Y

    # Apply the function to the grid
    F = np.vectorize(func)(Z)

    # Compute the hue and saturation based on the argument and modulus of the function result
    H = np.angle(F) / (2 * np.pi) + 0.5
    S = np.log1p(np.abs(F))

    # Normalize S to [0, 1] for visualization
    S = (S - np.min(S)) / (np.max(S) - np.min(S))

    # Create the HSV image
    HSV = np.zeros(F.shape + (3,))
    HSV[..., 0] = H  # Hue
    HSV[..., 1] = S  # Saturation
    HSV[..., 2] = 1  # Value (set to 1 for full brightness)

    # Convert HSV to RGB
    RGB = mcolors.hsv_to_rgb(HSV)

    # Plot the RGB image
    plt.imshow(RGB, extent=(xlim[0], xlim[1], ylim[0], ylim[1]))
    plt.xlabel('Re(z)')
    plt.ylabel('Im(z)')
    plt.title('Domain Coloring')
    plt.show()

# Define the function you want to color (example: 2^z)
def func(z):
    return 2**z

# Domain coloring for the function
domain_coloring(func)
