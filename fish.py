import requests, json, time, sys

OUT_FILE = "worms_fish_species.json"

# AphiaID for “Pisces” in WoRMS
FISH_APHIAID = 126728  # Root taxon for all fishes

def print_progress(current, total):
    bar_len = 40
    fraction = current / total if total else 0
    filled = int(bar_len * fraction)
    bar = '#' * filled + '-' * (bar_len - filled)
    sys.stdout.write(f'\rProgress: |{bar}| {current}/{total}')
    sys.stdout.flush()

def fetch_worms_species():
    url = f"https://www.marinespecies.org/rest/AphiaRecordsByClassification/{FISH_APHIAID}?marine_only=false"
    r = requests.get(url, timeout=60)
    r.raise_for_status()
    data = r.json()
    collected = []
    for rec in data:
        if rec.get("rank") == "Species":
            lineage = {
                "species": rec.get("scientificname"),
                "genus": rec.get("genus"),
                "family": rec.get("family"),
                "order": rec.get("order"),
                "class": rec.get("class"),
                "phylum": rec.get("phylum"),
            }
            collected.append(lineage)
        print_progress(len(collected), len(data))
    print()
    return collected

def main():
    print("Fetching all fish species from WoRMS ...")
    species_list = fetch_worms_species()
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(species_list, f, ensure_ascii=False, indent=2)
    print(f"[DONE] collected {len(species_list)} species; saved to {OUT_FILE}")

if __name__ == "__main__":
    main()
