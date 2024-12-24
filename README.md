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
7. Do Jolla Harbour tests for the rpms (https://forum.sailfishos.org/t/missing-harbour-validator/2583/3)
8. Commit changes for the version, amend commits if changes are needed in the test process
9. Merge dev branch to the master
10. Move the source to GitHub
11. Create package from GitHub main to the Mer OBS (tar -czvf harbour-word-puzzle-0.1.4.tar.bz2 harbour-word-puzzle-0.1.4)
12. Load the local rpms to Jolla Harbour and edit release info
13. Load the local rpms to OpenRepos and edit release info

