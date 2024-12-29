# harbour-word-puzzle
GitHub for Word puzzle

Release process

There will be main branch which is a code for the releases in Jolla Harbour, Chum, OpenRepos.net and Mer OBS. The phases for the release are:

1. The new version will be devoloped in dev(version) branch
2. Tranlations are updated in GitHub
3. When translations are ready check their visualization
4. Remove extra console.logs from the code
5. Finalize harbour-word-puzzle.changes file
6. Test the app
7. Do Jolla Harbour tests for the rpms (https://forum.sailfishos.org/t/missing-harbour-validator/2583/3):
    alias sfdk=~/SailfishOS/bin/sfdk
    sfdk config target=SailfishOS-4.6.0.13-aarch64
    sfdk check harbour-word-puzzle-0.1.6-1.aarch64.rpm
8. Commit changes for the version, amend commits if changes are needed in the test process
9. Merge dev branch to the main, "git checkout main", "git merge dev016"
10. Move the source to GitHub
11. Download zip from https://github.com/Rikujolla/harbour-word-puzzle/archive/refs/heads/main.zip
12. Extract the zip file and rename the folder harbour-word-puzzle-0.1.6
13. Create package from GitHub main to the Mer OBS (tar -czvf harbour-word-puzzle-0.1.6.tar.bz2 harbour-word-puzzle-0.1.6)
14. Load the local rpms to Jolla Harbour and edit release info
15. Load the local rpms to OpenRepos and edit release info

