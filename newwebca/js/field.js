const YEAR = "2016";

//Change the constants below if file types or names are different
const fieldblue = "blue.png";
const fieldbluerotated = "blue_flipped.png";
const fieldred = "red.png";
const fieldredrotated = "red_flipped.png";

function setTeamRed(rotated) {
	//startField.setXInverted(false);
	//startField.setYInverted(false);
	//startField.setImage("./img/" + YEAR + "/" + fieldred);
	if(!rotated) {
		teleopField.setImage("./img/" + YEAR + "/" + fieldblue);
		autonField.setImage("./img/" + YEAR + "/" + fieldblue);
	}
	else {
		teleopField.setImage("./img/" + YEAR + "/" + fieldbluerotated);
		autonField.setImage("./img/" + YEAR + "/" + fieldbluerotated);
	}
}

function setTeamBlue(rotated) {
	//startField.setXInverted(true);
	//startField.setYInverted(false);
	//startField.setImage("./img/" + YEAR + "/" + fieldblue);
	if(!rotated) {
		teleopField.setImage("./img/" + YEAR + "/" + fieldred);
		autonField.setImage("./img/" + YEAR + "/" + fieldred);
	}
	else {
		teleopField.setImage("./img/" + YEAR + "/" + fieldredrotated);
		autonField.setImage("./img/" + YEAR + "/" + fieldredrotated);
	}
}
