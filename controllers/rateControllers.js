const Rate = require("../models/rate");
const scrapeRatesBon = require("../scrapeRatesTest");

exports.getRate = async (req, res) => {
    try {
      // Récupérer tous les taux depuis la base de données mongodb
      const rates = await Rate.find(); 
      res.status(200).json(rates);
    } catch (error) {
      console.error("Erreur lors de la récupération des taux :", error.message);
      res.status(400).json({ message: "Erreur lors de la récupération des taux" });
    }
  };

exports.refreshRate = async (req, res) => {
    try {
      // fonctions de scraping pour récupérer les taux
      const rates = await scrapeRatesBon();
  
      // chaque taux récupéré et enregistrer dans MongoDB
      for (const rateData of rates) {
        const { site, rate } = rateData;
  
        // Vérifier si un taux pour ce site existe déjà
        const existingRate = await Rate.findOne({ site });
  
        if (existingRate) {
          // Mettre à jour le taux existant
          existingRate.rate = rate;
          existingRate.updateDate = new Date();
          await existingRate.save();
        } else {
          // Créer un nouveau taux
          const newRate = new Rate({ site, rate });
          await newRate.save();
        }
      }
  
      res.status(200).send("Taux mis à jour et enregistrés dans la base de données.");
    } catch (error) {
      console.error("Erreur lors de l'actualisation des taux :", error.message);
      res.status(400).json({ message: "Erreur lors de l'actualisation des taux" });
    }
  };
