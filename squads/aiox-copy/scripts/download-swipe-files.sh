#!/usr/bin/env bash
# =============================================================================
# Download Stefan Georgi Swipe Files from Google Drive (rate-limit safe)
# Source: https://drive.google.com/drive/folders/125ukhHDuUCja1TZiZXjHfstxoyKT-bLc
# Strategy: Download one subfolder at a time with delay between each
# =============================================================================

set -uo pipefail

DEST_DIR="$(cd "$(dirname "$0")/.." && pwd)/data/swipe-files"
GDOWN="$(which gdown)"
LOG="$DEST_DIR/download.log"
DELAY=20  # seconds between folder downloads

mkdir -p "$DEST_DIR/copy-resources-and-swipes"
mkdir -p "$DEST_DIR/copy-resources-and-swipes-1"

# All subfolder IDs from "Copy Resources and Swipes" (folder 1)
declare -A FOLDERS_1=(
  ["4 Minute Hypergrowth Trick"]="1pjlcM6OQZvoH_5XnqVQJ4XKPkA_PlHYF"
  ["Affiliate Manager Job Posting Swipe"]="1RxCGmPSbyYNcH5jSzT411-k3mN4Y5n6E"
  ["Angel Investor Summit"]="1ZRlWN6Hkkk4DpLKCZUfKD19D11nDwCwl"
  ["Arthrozene"]="1zUixxGOlNN5GOw3sP4fWmFfd-g4-tAY1"
  ["Backyard Liberty"]="1oAM5ksD5SNDBjK-6zXIsI5PkDOq_eHx4"
  ["Beauty Food Bible"]="1LZLtRNYVMxGl2rzO-gbhVW6Es7vBN_DB"
  ["Beverly Hills MD"]="13EHuFtn_nWOAa0hZ1E9ZpFAcW8Khipfm"
  ["Boardroom Swipe File"]="10OFH-oSXYdpOJWNoHu6cKbDsXTvpERCM"
  ["Boston Brain Science"]="1tcJoqP20aPHhvoGyTkhdUZdIKF4MjPwf"
  ["Brownstone Research"]="1CLvpC1FC1wt28RcltzSpUtTLVYiTaeWI"
  ["Burn Sales Letter"]="11sAmeEx4_DzMknzWanVyuKQbUjjmOBnw"
  ["Cannabis Lots"]="1mSYnsvz9KdpBiOnMSmCuye1uPZ_bfpxl"
  ["Chad is Coming for Your Lifeblood"]="1zCk5YS-vebxBOVFuZ0WPTvpBjv_JAtTx"
  ["City Beauty"]="1REYrc2jeEUi8Rn6rv4yn6MPH7cT8rj8m"
  ["City Beauty VSL - 2"]="1Kpd7OxCD1DlwxlKlQlMrrW51K5LlubrU"
  ["Daniel Levis"]="1Lt-mKQfgjUX4v0osNqDV_ndSTMe2mkbp"
  ["Dean Graziosi Free Book Funnel"]="1MlSNiKwja-t06BspAa0UalgiepA2S364"
  ["Digestion Defense"]="17cXVXhfrqzyoxmzYjCk_N1JQehX3YdTw"
  ["Dr. Al Sears"]="1ioRcFekRb8hTOfSrEeJKwo3wwc-PEBsM"
  ["Dr. Gundry - Bio Complete 3"]="1KqR3zWCziQH7zvLnpsO7LOZfpPxW3hqR"
  ["Eds Supplement Intensive Sales Letter"]="1khHtCy00Ws71fuM__Yv7S9fJ5DtwlA2P"
  ["Email Swipes"]="1Bng1GCsrLT661Lc2eOyWajOpMh6ZN9FD"
  ["Emo Letter Examples"]="1kC1-DylS0EqB6l450XRXv0yy_QrUjMLs"
  ["Eugene Schwartz"]="1y1HHuo-fvip-mOAVeTmTgIU3t1aK5TaU"
  ["Fascinations"]="1X9PP6BYKcp4IY1gKqz26yTuHDxg34mQ5"
  ["Flat Belly Fix"]="1fgKtilhNASfm2Si3RdKIGckkWxA64PM0"
  ["Funnel Building"]="1SytTV8A35ZLuYcFV7SxsprXNwKW12fjE"
  ["General Copywriting"]="1rlhGB_2CLHQKZGzvAZzoL9aPSZYW8R4i"
  ["Golden Hippo Transcripts"]="1IGyMsU43ioKYWmj05fbtS51ozqjHkOhc"
  ["Gutcleanse Protocol"]="1kou0DxKhpQF-n9SWgmo1nmamxm5hDB4C"
  ["Halbert"]="1IeGo_RSRDyV045GCtQKKQ-TiOrFPlKAI"
  ["Hard to Find Ads - Advertorial Collection"]="1C4SduiR8ArdTVH7QyZddtuRjUIESxPHs"
  ["Headlines"]="1hbfMg3ZKAA5DnaI5IUW5CLuN6VzIlaGf"
  ["How Dr. Axe Killed It With Webinars"]="1hIa3fPMnRh8WZ6A8UU3h3C-J0brahT1Y"
  ["Inner Skin Research"]="1Cdyu-Rqn8K6f0LQbrH0VpwDosKDTWp9k"
  ["John Benson"]="16WtHRy5UXQ20l1yu5MxLYT0kuPx0vMyS"
  ["John Carlton"]="16oCIRwE0_UsPhlcqFNE_uwRnF1Dx2YSD"
  ["Justin Goff Interviews With CA Members"]="1CHjPu1kxdnj70B1LPONJD3f6XmILMpJn"
  ["Keto Book Funnels"]="1Gp16qlfhIwMMLSFQPp9jwffncflocWLU"
  ["Keto Funnels With Upsells Examples"]="1yfP8WtUq585CHX2_Jnu8_QWPwsbt4EMa"
  ["Liver Toxins"]="1LFdIf2clwCFVOXOzdcH-5S2tisF4ekVw"
  ["Male Enhancement Swipes"]="1HTTJKqOX3nLBo_K-flYk8naXmDc-S_V0"
  ["Massive Agora Swipe File"]="14eRonZKHYWjqhylXeVsedgGtgQ_zebq_"
  ["Michael Fiore"]="1IOIdA9SB52a-DiYR8nlD7eRY3ZWFjkaW"
  ["Mike Morgan"]="1IE3DCTLLidgcO-QasffTsL_BnHFPaV7-"
  ["Military Hero Meditation"]="1a2AF3_WOJjPUFgUCLcy9sRoXtDH5t8KZ"
  ["Mini Sales Letter Scripts"]="1x_NMoTZfBjaeAuIVYjiL9qCJoKspquL-"
  ["Miracle Cure"]="1FVTOnQ4OFgX_1E9a1qStDrPjv3m9h28j"
  ["My Funnel Freedom"]="1t215HBbXvrYm4N4mIupJuQp-de0dgyml"
  ["Native Path Keto Funnel"]="1J19ZplNGKAQE0Oi2ituV9m6xTwoP1-xx"
  ["NSFW - Dating Sex Etc"]="1bNeGdAC0XBAojs8wib3lWzBg62kUbcgN"
  ["On Persuasion"]="1YqnwB5CXNaB9N7t9_B2_Sua74WZLjg6Y"
  ["Original Venus Factor"]="1fYPMIIuh8zzp3JhyMDYeJsDIcybmebPj"
  ["Others Resources for Me"]="16pUaZy1pX5uQe3xE4lAgSAybfgIwIuj2"
  ["Oxford Club OReilly Transcript"]="1SwNhXzVa6MgX8e7T4bWODfX6t3Nh0ZgS"
  ["Palm Beach Group"]="148EHoDp8amQNp93DsGcpgMT_0NKgo59Z"
  ["Parris Lampropoulous Swipes"]="1c9Em_FiIY8UpUbzRi22AyV7epgfutj2l"
  ["Phone Closers - Chris Taylor"]="17D7wYyMRVIdSsFqUb0KOJ7gIkuSiZGfD"
  ["Pimsleur Approach Transcript"]="1DdNwzOXXueWaHa2MH--BNWyADoFN7NFc"
  ["Power 4 Homes"]="1NARIZtKR89FA60DF5E858o-ZUYQ2Pc-e"
  ["Pro Paradigm Press"]="13UPdcUDHP0z5vLc8RFlOkQn1LRmfvZBP"
  ["Proof-Building Authority"]="1rf47c93893CRjeDNJZknqXHTyI82cSRW"
  ["Quantum Growth By King Kong"]="19o3lspYh6hlJ68yBSKIl3HetvEo85zYa"
  ["QVC Skincare Compliance Document"]="1vqf4RSG40Htb24ee49x1WwWgjfBK_nWM"
  ["Red Tea Detox Script"]="1eKMI6w332dr2QMVM-0R3q24Nga-0e3WZ"
  ["Resurge"]="1w6liqxA54DxL2Cf6joJoLsBN_HwuYVsH"
  ["Salus Gut Offer"]="1ogKJE1l977XOog2xNFBpZi51aVui8R8h"
  ["Sell Like Crazy - Book Trailer"]="1WRo8JoQ-8UKB7lo23k0Xgqi0goGLExq4"
  ["Sell like Crazy - Upsell Sales Funnel"]="1C4HYmGb5xQ6ZKX4Pwiz64Tx3_vuRJhc8"
  ["Shapiro Hair"]="1FtLBHkv2Lt_ztXRH2x48BJIJxl6KRh_W"
  ["SPG Copywriter Training Post"]="1_Ubh3huDM-Wy9okwIW0P5qWyaON9874l"
  ["Stem Cell Restore With Comments"]="1U7Mbzeih46bN9MBfjs-cQANxHsbq7Mih"
  ["The Keto Shark Tank Lander"]="1zsxxumbBzhY_TWQWOSTnmec-mKBzC-uJ"
  ["The new Gut Fix"]="1nnuchaM7eHVp5MGZhcT9Ra9-Yws_DU2_"
  ["Top Clickbank Weight Loss Offers"]="1yxMfZFyK1pjE8djYfWLOURSMWYE8tmEP"
  ["Topline Health Swipes"]="13legOoJyCyA8f9zyiPY8bboYmHVY7GDU"
  ["United Probiotic Script"]="1X5IFX8vLbjvCNZ6JsheJ0cPtsZaX2cjD"
  ["Vedda Blood Sugar"]="1PtNsjDlDrYYY84F6wBTVdMa4-hqZTsVo"
  ["Worlds Greatest Treasury Boardroom"]="1YjNqecxGuvXlwDpCYm-AX6TI7furFC28"
  ["Yoga Burn"]="1tcTirzdmvDQvFSp20QF7wvfSrts3bfzU"
)

# Single file in folder 1
LINKS_DOC_ID="1OMeJJFd4QWV_RtLiWr96Le2_bVV0eA4F"

# Folder 2 subfolders
declare -A FOLDERS_2=(
  ["Boardroom Swipe File"]="10OFH-oSXYdpOJWNoHu6cKbDsXTvpERCM"
  ["Compliance"]="UNKNOWN"
  ["Massive Agora Swipe File"]="14eRonZKHYWjqhylXeVsedgGtgQ_zebq_"
  ["Master Activator Revolution"]="UNKNOWN"
  ["Others Resources for Me"]="16pUaZy1pX5uQe3xE4lAgSAybfgIwIuj2"
  ["Parris Lampropoulous Swipes"]="1c9Em_FiIY8UpUbzRi22AyV7epgfutj2l"
  ["Topline Health Swipes"]="13legOoJyCyA8f9zyiPY8bboYmHVY7GDU"
)

echo "$(date '+%Y-%m-%d %H:%M:%S') — Starting swipe file download (rate-limit safe)" | tee "$LOG"
echo "Destination: $DEST_DIR" | tee -a "$LOG"
echo "Delay between folders: ${DELAY}s" | tee -a "$LOG"
echo "Total folders: ${#FOLDERS_1[@]} (folder 1) + ${#FOLDERS_2[@]} (folder 2)" | tee -a "$LOG"
echo "" | tee -a "$LOG"

SUCCESS=0
FAIL=0
SKIP=0
CONSECUTIVE_FAILS=0

# Download folder 1 subfolders one by one
echo "━━━ Folder 1: Copy Resources and Swipes ━━━" | tee -a "$LOG"

for name in "${!FOLDERS_1[@]}"; do
  id="${FOLDERS_1[$name]}"
  dest="$DEST_DIR/copy-resources-and-swipes/$name"

  # Skip if already downloaded
  if [[ -d "$dest" ]] && [[ $(find "$dest" -type f 2>/dev/null | wc -l) -gt 0 ]]; then
    echo "[SKIP] $name (already exists)" | tee -a "$LOG"
    SKIP=$((SKIP + 1))
    continue
  fi

  echo "[DL] $name ..." | tee -a "$LOG"
  mkdir -p "$dest"

  if $GDOWN --folder "https://drive.google.com/drive/folders/$id" -O "$dest" --remaining-ok 2>>"$LOG"; then
    file_count=$(find "$dest" -type f 2>/dev/null | wc -l | tr -d ' ')
    echo "  ✓ $file_count files" | tee -a "$LOG"
    SUCCESS=$((SUCCESS + 1))
    CONSECUTIVE_FAILS=0
  else
    echo "  ✗ FAILED (rate limit or permission)" | tee -a "$LOG"
    FAIL=$((FAIL + 1))
    CONSECUTIVE_FAILS=$((CONSECUTIVE_FAILS + 1))

    if [[ $CONSECUTIVE_FAILS -ge 3 ]]; then
      echo "" | tee -a "$LOG"
      echo "⚠ 3 consecutive failures — pausing 120s before retry" | tee -a "$LOG"
      sleep 120
      CONSECUTIVE_FAILS=0
    fi
  fi

  sleep $DELAY
done

# Download Links doc
echo "" | tee -a "$LOG"
echo "[DL] Links To Existing or Current Funnels.docx ..." | tee -a "$LOG"
$GDOWN "https://drive.google.com/uc?id=$LINKS_DOC_ID" -O "$DEST_DIR/copy-resources-and-swipes/Links To Existing or Current Funnels.docx" 2>>"$LOG" && echo "  ✓" | tee -a "$LOG" || echo "  ✗" | tee -a "$LOG"

# Folder 2 — skip duplicates already in folder 1
echo "" | tee -a "$LOG"
echo "━━━ Folder 2: Copy Resources and Swipes-1 (skipping duplicates) ━━━" | tee -a "$LOG"

for name in "${!FOLDERS_2[@]}"; do
  id="${FOLDERS_2[$name]}"
  [[ "$id" == "UNKNOWN" ]] && { echo "[SKIP] $name (ID unknown)" | tee -a "$LOG"; continue; }

  # Check if already downloaded in folder 1
  if [[ -d "$DEST_DIR/copy-resources-and-swipes/$name" ]]; then
    echo "[SKIP] $name (exists in folder 1)" | tee -a "$LOG"
    continue
  fi

  dest="$DEST_DIR/copy-resources-and-swipes-1/$name"
  mkdir -p "$dest"
  echo "[DL] $name ..." | tee -a "$LOG"
  $GDOWN --folder "https://drive.google.com/drive/folders/$id" -O "$dest" --remaining-ok 2>>"$LOG" && echo "  ✓" | tee -a "$LOG" || echo "  ✗" | tee -a "$LOG"
  sleep $DELAY
done

# Summary
echo "" | tee -a "$LOG"
echo "━━━ SUMMARY ━━━" | tee -a "$LOG"
TOTAL_FILES=$(find "$DEST_DIR" -type f ! -name "download.log" ! -name ".DS_Store" | wc -l | tr -d ' ')
TOTAL_SIZE=$(du -sh "$DEST_DIR" 2>/dev/null | cut -f1)
echo "Success: $SUCCESS | Failed: $FAIL | Skipped: $SKIP" | tee -a "$LOG"
echo "Total files: $TOTAL_FILES" | tee -a "$LOG"
echo "Total size: $TOTAL_SIZE" | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') — Download complete" | tee -a "$LOG"
