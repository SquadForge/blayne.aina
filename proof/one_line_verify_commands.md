# One-Line Terminal Verification Commands

The proof bundle uses only Python 3's standard library. No package installation, candidate binary, network connection, or `squad.exe` is required during verification.

## macOS / Linux / Bash

```bash
curl -fsSL https://blayneaina.com/proof/aina-refusal-proof-pack-v1.zip -o aina-proof.zip && unzip -q aina-proof.zip -d aina-proof && cd aina-proof && python verify_refusal_proof.py
```

## Windows PowerShell

```powershell
Invoke-WebRequest -Uri "https://blayneaina.com/proof/aina-refusal-proof-pack-v1.zip" -OutFile "aina-proof.zip"; Expand-Archive -Path "aina-proof.zip" -DestinationPath "aina-proof" -Force; Set-Location "aina-proof"; python verify_refusal_proof.py
```

## Git clone and verify

```bash
git clone https://github.com/SquadForge/blayne.aina.git && cd blayne.aina/proof && python verify_refusal_proof.py
```

## Checks performed

- Four refusal records, including three complete unchanged-destination digest chains and one absent-preimage reason-only case.
- 45/45 fresh candidate-binary conformance results and 20/20 evidence results.
- 12 public-safe schema declarations.
- All listed files against `SHA256SUMS.txt`.
- No absolute local paths or private-key material.

The conformance results are author-controlled release-qualification evidence, not independent third-party certification.
