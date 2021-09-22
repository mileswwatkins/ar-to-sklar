# Ar To Sklar

A Chrome extension inspired by [Cloud To Butt](https://github.com/panicsteve/cloud-to-butt): automate [Sam Sklar](https://sklar.substack.com)'s signature joke of replacing all phonemes that rhyme with `sklar`. Operates on all non-user-input text on every webpage.

## Example

Turns:

> The article takes two bad parts of social media and assumes that those are the only uses for it.

into:

> The sklarticle takes two bad sklarts of social media and assumes that those sklar the only uses for it.

## Usage

Install the Chrome extension following [these steps](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest):

1. [Download the code in this repository](https://github.com/mileswwatkins/ar-to-sklar/archive/refs/heads/main.zip), and un-zip the contents
1. In your Chrome browser, navigate to `chrome://extensions`
1. Enable `Developer Mode`
1. Click `Load unpacked` and select the `ar-to-sklar-main` directory you downloaded
1. Browse the web!

## Credits

- Heavily re-uses code from [Steven Frank](https://github.com/panicsteve)'s [Cloud To Butt](https://github.com/panicsteve/cloud-to-butt) Chrome extension
- Uses the [CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) to determine whether a word rhymes with `sklar`
- Uses [`stdlib`'s JSONified version](https://github.com/stdlib-js/datasets-cmudict/blob/main/data/dict.json) of the original CMU file
