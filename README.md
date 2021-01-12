# QC Tool

QC Tool provides QC checks for Japanese translations.

It checks:
- That the text does not contain full-width ！, ？, ：,（, ）, full-width spaces
- That the text does not contain hald-width ･
- It counts the characters in the "Japanese way", half-width latin characters count as 0.5 character.

## How to use

Open `index.html`, insert your translation and click on `QC Check`.