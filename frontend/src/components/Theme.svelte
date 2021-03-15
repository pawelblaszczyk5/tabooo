<style global>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';

	@layer utilities {
		.glass-sm {
			background: var(--primaryOpacity25);
			box-shadow: 0 8px 32px 0 var(--primaryOpacity40);
			backdrop-filter: blur(4px);
		}
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		color: var(--primaryFontColor);
		font-family: Overpass, sans-serif;
	}

	body {
		--primary: #06d6a0;
		--primaryOpacity25: rgba(6, 214, 160, 0.25);
		--primaryOpacity40: rgba(6, 214, 160, 0.4);
		--primaryAccent: #ffd166;
		--primaryAccentHover: #ffda85;
		--primaryAccentFocus: #ffe099;
		--secondaryAccent: #118ab2;
		--secondaryAccentHover: #1082a8;
		--secondaryAccentFocus: #0e7395;
		--primaryFirstTeam: #073b4c;
		--primarySecondTeam: #ef476f;
		--primaryFontColor: #333;
		--secondaryFontColor: #eee;
		--darkAccentColor: #333;
		background-color: var(--primary);
	}

	.theme--dark {
		--primary: #212f45;
		--primaryOpacity25: rgba(33, 47, 69, 0.25);
		--primaryOpacity40: rgba(33, 47, 69, 0.4);
		--primaryAccent: #144552;
		--primaryAccentHover: #0b525b;
		--primaryAccentFocus: #065a60;
		--secondaryAccent: #272640;
		--secondaryAccentHover: #312244;
		--secondaryAccentFocus: #3e1f47;
		--primaryFirstTeam: #006466;
		--primarySecondTeam: #4d194d;
		--primaryFontColor: #eee;
		--secondaryFontColor: #eee;
		--darkAccentColor: #666;
	}

	.theme--elegant {
		--primary: #a8dadc;
		--primaryOpacity25: rgba(168, 218, 220, 0.25);
		--primaryOpacity40: rgba(168, 218, 220, 0.4);
		--primaryAccent: #d8f1d0;
		--primaryAccentHover: #e5f6df;
		--primaryAccentFocus: #f1faee;
		--secondaryAccent: #457b9d;
		--secondaryAccentHover: #4b86aa;
		--secondaryAccentFocus: #5590b4;
		--primaryFirstTeam: #1d3557;
		--primarySecondTeam: #e63946;
		--primaryFontColor: #333;
		--secondaryFontColor: #eee;
		--darkAccentColor: #333;
	}

	.theme--candy {
		--primary: #caffbf;
		--primaryOpacity25: rgba(202, 255, 191, 0.25);
		--primaryOpacity40: rgba(202, 255, 191, 0.4);
		--primaryAccent: #fdffb6;
		--primaryAccentHover: #fcffad;
		--primaryAccentFocus: #fbff85;
		--secondaryAccent: #9bf6ff;
		--secondaryAccentHover: #85f5ff;
		--secondaryAccentFocus: #70f3ff;
		--primaryFirstTeam: #ffadad;
		--primarySecondTeam: #bdb2ff;
		--primaryFontColor: #111;
		--secondaryFontColor: #111;
		--darkAccentColor: #333;
	}

	.theme--toned {
		--primary: #bee3db;
		--primaryOpacity25: rgba(190, 227, 219, 0.25);
		--primaryOpacity40: rgba(190, 227, 219, 0.4);
		--primaryAccent: #89b0ae;
		--primaryAccentHover: #9dbebc;
		--primaryAccentFocus: #a9c6c4;
		--secondaryAccent: #faf9f9;
		--secondaryAccentHover: #f6f4f4;
		--secondaryAccentFocus: #ece9e9;
		--primaryFirstTeam: #555b6e;
		--primarySecondTeam: #ffd6ba;
		--primaryFontColor: #111;
		--secondaryFontColor: #111;
		--darkAccentColor: #333;
	}
</style>
