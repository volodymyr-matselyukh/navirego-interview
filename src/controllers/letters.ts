import express from "express";

const texts = [
	"Ще не вмерла України ні слава, ні воля. Ще нам, браття молодії, усміхнеться доля. Згинуть наші вороженьки, як роса на сонці,Запануєм і ми, браття, у своїй сторонці. Душу й тіло ми положим за нашу свободу,І покажем, що ми, браття, козацького роду.",
	"Oh, say can you see, by the dawn's early light, What so proudly we hailed at the twilight's last gleaming? Whose broad stripes and bright stars, through the perilous fight,O'er the ramparts we watched, were so gallantly streaming? And the rockets' red glare, the bombs bursting in air,Gave proof through the night that our flag was still there. O say, does that star-spangled banner yet wave O'er the land of the free and the home of the brave?",
	"Jeszcze Polska nie zginęła,Kiedy my żyjemy. Co nam obca przemoc wzięła,Szablą odbierzemy. Marsz, marsz, Dąbrowski,Z ziemi włoskiej do Polski. Za twoim przewodem Złączym się z narodem. Przejdziem Wisłę, przejdziem Wartę,Będziem Polakami. Dał nam przykład Bonaparte,Jak zwyciężać mamy.",
	"Thou art the ruler of the minds of all people,dispenser of India's destiny. Thy name rouses the hearts of the Punjab, Sindh, Gujarat and Maratha,of the Dravida, Orissa and Bengal. It echoes in the hills of the Vindhyas and Himalayas, mingles in the music of the Yamuna and Gangesand is chanted by the waves of the Indian Sea. They pray for thy blessings and sing thy praise. The saving of all people waits in thy hand,thou dispenser of India's destiny. Victory, Victory, Victory to thee.",
	"Allons enfants de la Patrie,Le jour de gloire est arrivé! Contre nous de la tyrannie L'étendard sanglant est levé, (bis)Entendez-vous dans les campagnesMugir ces féroces soldats? Ils viennent jusque dans vos brasÉgorger vos fils, vos compagnes! Aux armes, citoyens, Formez vos bataillons, Marchons, marchons! Qu'un sang impur Abreuve nos sillons!",
	"Deutschland, Deutschland über alles,Über alles in der Welt, Wenn es stets zu Schutz und TrutzeBrüderlich zusammenhält. Von der Maas bis an die Memel,Von der Etsch bis an den Belt,Deutschland, Deutschland über alles,Über alles in der Welt!",
	"God save our gracious King! Long live our noble King! God save the King! Send him victorious,Happy and glorious,Long to reign over us:God save the King!",
	"1234567890"
];

const secondsDelay = 2; 

const getLetterForGenerator = (generatorId: number) => {
	const milliseconds = new Date().getTime();

	const seconds = Math.round(milliseconds / 1000);

	const neededText = texts[generatorId];

	const textLength = neededText.length;

	let currentIndex = seconds % textLength;
	currentIndex = (Math.floor(currentIndex / secondsDelay));

	return {
		letter: neededText[currentIndex],
		index: currentIndex
	}
}

const shouldReturnTeapot = () => {
	const random = getRandomArbitrary(0, 100);

	if(random <= 5)
	{
		return true;
	}

	return false;
}

function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export const getLetter = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {

		const generatorIndex = req.params["letter"];
		const generatorNumber = parseInt(generatorIndex);

		if (isNaN(generatorNumber)) {
			return res.status(400).json({
				error: {
					message: "invalid url"
				}
			});
		}

		if (generatorNumber < 0 || generatorNumber > texts.length - 1) {
			return res.status(400).json({
				error: {
					message: "index out or range"
				}
			});
		}

		if(shouldReturnTeapot())
		{
			return res.status(418).json(
			{
				message: "I am too tired. Try the next time."
			});
		}

		const letterInfo = getLetterForGenerator(generatorNumber);

		return res.status(200).json(letterInfo);

	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}