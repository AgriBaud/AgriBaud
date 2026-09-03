const DB = {
  "cultures": {
    "tomate": {
      "id": "tomate",
      "nom": "Tomate",
      "saison": "Saison Sèche / Contre-saison",
      "duree_jours": 90,
      "rendement": "15 à 30 tonnes/ha",
      "zone_adaptee": "Sud, Centre, Nord (avec irrigation)",
      "image": "tomate.jpg",
      "budget": {
        "cout_intrants": "350 000 FCFA/ha",
        "cout_main_oeuvre": "150 000 FCFA/ha",
        "revenu_estime": "1 500 000 FCFA/ha"
      },
      "etapes": [
        {
          "titre": "Préparation du sol & Pépinière",
          "description": "Labour, pulvérisation, apport de fumure organique. Semis en pépinière sous ombrière.",
          "semaine": "Semaine 1-3",
          "jour": 0,
          "nom": "Préparation du sol & Pépinière"
        },
        {
          "titre": "Repiquage",
          "description": "Transplantation des jeunes plants (15-20 cm) au champ. Ecartement 80x40 cm.",
          "semaine": "Semaine 4",
          "jour": 21,
          "nom": "Repiquage"
        },
        {
          "titre": "Entretien (Sarclage & Tuteurage)",
          "description": "Premier sarclage, installation des tuteurs pour soutenir les plants.",
          "semaine": "Semaine 6",
          "jour": 35,
          "nom": "Entretien (Sarclage & Tuteurage)"
        },
        {
          "titre": "Fertilisation & Floraison",
          "description": "Apport de NPK et Urée. Début de la floraison, irrigation régulière requise.",
          "semaine": "Semaine 8",
          "jour": 49,
          "nom": "Fertilisation & Floraison"
        },
        {
          "titre": "Récolte",
          "description": "Récolte échelonnée des fruits à maturité (virant au rouge).",
          "semaine": "Semaine 12-16",
          "jour": 77,
          "nom": "Récolte"
        }
      ],
      "maladies_communes": [
        "Mildiou",
        "Flétrissement bactérien"
      ],
      "lien_vers_fichier": "tomate.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Solanum lycopersicum"
    },
    "mais": {
      "id": "mais",
      "nom": "Maïs",
      "saison": "Grande et Petite Saison des pluies",
      "duree_jours": 110,
      "rendement": "2 à 4 tonnes/ha",
      "zone_adaptee": "Toutes les zones (Atlantique, Centre, Nord)",
      "image": "mais-doux.jpg",
      "budget": {
        "cout_intrants": "120 000 FCFA/ha",
        "cout_main_oeuvre": "80 000 FCFA/ha",
        "revenu_estime": "500 000 FCFA/ha"
      },
      "etapes": [
        {
          "titre": "Préparation du sol",
          "description": "Défrichement, labour (souvent à la houe ou tracteur).",
          "semaine": "Semaine 1",
          "jour": 0,
          "nom": "Préparation du sol"
        },
        {
          "titre": "Semis",
          "description": "Semis direct, 2 à 3 graines par poquet (écartement 80x40 cm).",
          "semaine": "Semaine 2",
          "jour": 7,
          "nom": "Semis"
        },
        {
          "titre": "Démariage & 1er Sarclage",
          "description": "Laisser 1 à 2 plants vigoureux par poquet. Sarclage pour éliminer les mauvaises herbes.",
          "semaine": "Semaine 4",
          "jour": 21,
          "nom": "Démariage & 1er Sarclage"
        },
        {
          "titre": "2ème Sarclo-buttage & Fertilisation",
          "description": "Apport d'Urée. Buttage pour renforcer l'ancrage des racines.",
          "semaine": "Semaine 6",
          "jour": 35,
          "nom": "2ème Sarclo-buttage & Fertilisation"
        },
        {
          "titre": "Floraison & Fructification",
          "description": "Sortie des panicules mâles et soies femelles.",
          "semaine": "Semaine 9",
          "jour": 56,
          "nom": "Floraison & Fructification"
        },
        {
          "titre": "Récolte",
          "description": "Récolte en grains secs ou frais (selon le marché).",
          "semaine": "Semaine 14-16",
          "jour": 91,
          "nom": "Récolte"
        }
      ],
      "maladies_communes": [
        "Chenille Légionnaire d'Automne",
        "Charbon du maïs"
      ],
      "lien_vers_fichier": "mais.html",
      "categorie": "Cereales",
      "nom_scientifique": "Zea mays"
    },
    "gombo": {
      "id": "gombo",
      "nom": "Gombo",
      "saison": "Saison des pluies",
      "duree_jours": 70,
      "rendement": "8 à 12 tonnes/ha",
      "zone_adaptee": "Sud, Centre, Nord",
      "image": "gombo.jpg",
      "budget": {
        "cout_intrants": "100 000 FCFA/ha",
        "cout_main_oeuvre": "90 000 FCFA/ha",
        "revenu_estime": "800 000 FCFA/ha"
      },
      "etapes": [
        {
          "titre": "Préparation et Semis",
          "description": "Labour léger. Semis direct, 3 graines par poquet. Ecartement 100x50 cm.",
          "semaine": "Semaine 1",
          "jour": 0,
          "nom": "Préparation et Semis"
        },
        {
          "titre": "Démariage",
          "description": "Garder le plant le plus vigoureux par poquet.",
          "semaine": "Semaine 3",
          "jour": 14,
          "nom": "Démariage"
        },
        {
          "titre": "Sarclage et Fertilisation",
          "description": "Nettoyage du champ, apport léger en azote.",
          "semaine": "Semaine 5",
          "jour": 28,
          "nom": "Sarclage et Fertilisation"
        },
        {
          "titre": "Floraison",
          "description": "Apparition des fleurs jaunes, début d'arrosage intensif si saison sèche.",
          "semaine": "Semaine 7",
          "jour": 42,
          "nom": "Floraison"
        },
        {
          "titre": "Récolte",
          "description": "Récolte tous les 2-3 jours des gousses tendres.",
          "semaine": "Semaine 9-14",
          "jour": 56,
          "nom": "Récolte"
        }
      ],
      "maladies_communes": [
        "Oïdium",
        "Viroses (Mosaïque)"
      ],
      "lien_vers_fichier": "gombo.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Abelmoschus esculentus"
    },
    "piment": {
      "id": "piment",
      "nom": "Piment",
      "saison": "Toute l'année (avec irrigation)",
      "duree_jours": 120,
      "rendement": "5 à 10 tonnes/ha",
      "zone_adaptee": "Sud, Centre",
      "image": "piment.jpg",
      "budget": {
        "cout_intrants": "250 000 FCFA/ha",
        "cout_main_oeuvre": "200 000 FCFA/ha",
        "revenu_estime": "1 200 000 FCFA/ha"
      },
      "etapes": [
        {
          "titre": "Pépinière",
          "description": "Semis sur planche ombragée. Arrosage régulier.",
          "semaine": "Semaine 1-4",
          "jour": 0,
          "nom": "Pépinière"
        },
        {
          "titre": "Repiquage",
          "description": "Mise en terre au champ (densité 80x80 cm).",
          "semaine": "Semaine 5",
          "jour": 28,
          "nom": "Repiquage"
        },
        {
          "titre": "Sarclage & Fumure",
          "description": "Apport de NPK et nettoyage des adventices.",
          "semaine": "Semaine 8",
          "jour": 49,
          "nom": "Sarclage & Fumure"
        },
        {
          "titre": "Floraison",
          "description": "Arrosage strict pour éviter la chute des fleurs.",
          "semaine": "Semaine 12",
          "jour": 77,
          "nom": "Floraison"
        },
        {
          "titre": "Récolte",
          "description": "Récolte des piments verts ou rouges (selon variété et marché).",
          "semaine": "Semaine 16+",
          "jour": 105,
          "nom": "Récolte"
        }
      ],
      "maladies_communes": [
        "Flétrissement bactérien",
        "Anthracnose"
      ],
      "lien_vers_fichier": "piment.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Capsicum spp."
    },
    "manioc": {
      "id": "manioc",
      "nom": "Manioc",
      "saison": "Début saison des pluies",
      "duree_jours": 300,
      "rendement": "15 à 25 tonnes/ha",
      "zone_adaptee": "Sud, Centre",
      "image": "feuilles.jpg",
      "budget": {
        "cout_intrants": "80 000 FCFA/ha",
        "cout_main_oeuvre": "120 000 FCFA/ha",
        "revenu_estime": "900 000 FCFA/ha"
      },
      "etapes": [
        {
          "titre": "Préparation (Billonnage)",
          "description": "Confection des billons ou buttes pour faciliter le développement des tubercules.",
          "semaine": "Semaine 1",
          "jour": 0,
          "nom": "Préparation (Billonnage)"
        },
        {
          "titre": "Plantation",
          "description": "Enfouissement des boutures (20-30 cm) à 45°. Ecartement 1m x 1m.",
          "semaine": "Semaine 2",
          "jour": 7,
          "nom": "Plantation"
        },
        {
          "titre": "1er Sarclage",
          "description": "Contrôle précoce des mauvaises herbes.",
          "semaine": "Semaine 6",
          "jour": 35,
          "nom": "1er Sarclage"
        },
        {
          "titre": "2ème Sarclage",
          "description": "Fermeture du couvert végétal.",
          "semaine": "Semaine 12",
          "jour": 77,
          "nom": "2ème Sarclage"
        },
        {
          "titre": "Tubérisation & Maturation",
          "description": "Grossissement des tubercules.",
          "semaine": "Semaine 15-40",
          "jour": 98,
          "nom": "Tubérisation & Maturation"
        },
        {
          "titre": "Récolte",
          "description": "Arrachage manuel ou mécanique des tubercules.",
          "semaine": "Semaine 40-45",
          "jour": 273,
          "nom": "Récolte"
        }
      ],
      "maladies_communes": [
        "Mosaïque du manioc",
        "Pourridié"
      ],
      "lien_vers_fichier": "manioc.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Manihot esculenta"
    },
    "ail": {
      "id": "ail",
      "nom": "Ail",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "ail.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "ail.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Allium sativum"
    },
    "amarante": {
      "id": "amarante",
      "nom": "Amarante",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "amarante.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "amarante.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Amaranthus spp."
    },
    "aubergine": {
      "id": "aubergine",
      "nom": "Aubergine",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "aubergine.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "aubergine.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Solanum melongena"
    },
    "basilic": {
      "id": "basilic",
      "nom": "Basilic",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "basilic.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "basilic.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Ocimum basilicum"
    },
    "betterave": {
      "id": "betterave",
      "nom": "Betterave",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "betterave.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "betterave.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Beta vulgaris"
    },
    "brocoli": {
      "id": "brocoli",
      "nom": "Brocoli",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "brocoli.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "brocoli.html",
      "categorie": "Autres",
      "nom_scientifique": "Brassica oleracea var. italica"
    },
    "carotte": {
      "id": "carotte",
      "nom": "Carotte",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "carotte.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "carotte.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Daucus carota"
    },
    "celeri": {
      "id": "celeri",
      "nom": "Celeri",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "celeri.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "celeri.html",
      "categorie": "Autres",
      "nom_scientifique": "Apium graveolens"
    },
    "chou-rave": {
      "id": "chou-rave",
      "nom": "Chou-rave",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "chou-rave.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "chou-rave.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Brassica oleracea var. gongylodes"
    },
    "chou": {
      "id": "chou",
      "nom": "Chou",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "chou.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "chou.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Brassica oleracea"
    },
    "chou_fleur": {
      "id": "chou_fleur",
      "nom": "Chou fleur",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "chou_fleur.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "chou_fleur.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Brassica oleracea var. botrytis"
    },
    "concombre": {
      "id": "concombre",
      "nom": "Concombre",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "concombre.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "concombre.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Cucumis sativus"
    },
    "coriandre": {
      "id": "coriandre",
      "nom": "Coriandre",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "coriandre.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "coriandre.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Coriandrum sativum"
    },
    "courge": {
      "id": "courge",
      "nom": "Courge",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "courge.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "courge.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Cucurbita spp."
    },
    "courgette": {
      "id": "courgette",
      "nom": "Courgette",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "courgette.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "courgette.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Cucurbita pepo"
    },
    "cresson": {
      "id": "cresson",
      "nom": "Cresson",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "cresson.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "cresson.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Nasturtium officinale"
    },
    "culture": {
      "id": "culture",
      "nom": "Culture",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "tout.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "culture.html",
      "categorie": "Autres",
      "nom_scientifique": "Espèce non précisée"
    },
    "epinard": {
      "id": "epinard",
      "nom": "Epinard",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "epinard.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "epinard.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Spinacia oleracea"
    },
    "feve": {
      "id": "feve",
      "nom": "Feve",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "feve.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "feve.html",
      "categorie": "Legumineuses",
      "nom_scientifique": "Vicia faba"
    },
    "gingembre": {
      "id": "gingembre",
      "nom": "Gingembre",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "gingembre.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "gingembre.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Zingiber officinale"
    },
    "haricot": {
      "id": "haricot",
      "nom": "Haricot",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "haricot.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "haricot.html",
      "categorie": "Legumineuses",
      "nom_scientifique": "Phaseolus vulgaris"
    },
    "laitue": {
      "id": "laitue",
      "nom": "Laitue",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "laitue.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "laitue.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Lactuca sativa"
    },
    "mais-doux": {
      "id": "mais-doux",
      "nom": "Mais-doux",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "mais-doux.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "mais-doux.html",
      "categorie": "Cereales",
      "nom_scientifique": "Zea mays var. saccharata"
    },
    "melon": {
      "id": "melon",
      "nom": "Melon",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "melon.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "melon.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Cucumis melo"
    },
    "menthe": {
      "id": "menthe",
      "nom": "Menthe",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "menthe.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "menthe.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Mentha spp."
    },
    "navet": {
      "id": "navet",
      "nom": "Navet",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "navet.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "navet.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Brassica rapa subsp. rapa"
    },
    "oignon": {
      "id": "oignon",
      "nom": "Oignon",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "oignon.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "oignon.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Allium cepa"
    },
    "oignon_vert": {
      "id": "oignon_vert",
      "nom": "Oignon vert",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "oignon_vert.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "oignon_vert.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Allium fistulosum"
    },
    "panais": {
      "id": "panais",
      "nom": "Panais",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "panais.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "panais.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Pastinaca sativa"
    },
    "pasteque": {
      "id": "pasteque",
      "nom": "Pasteque",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "pasteque.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "pasteque.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Citrullus lanatus"
    },
    "patisson": {
      "id": "patisson",
      "nom": "Patisson",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "patisson.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "patisson.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Cucurbita pepo var. ovifera"
    },
    "persil": {
      "id": "persil",
      "nom": "Persil",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "persil.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "persil.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Petroselinum crispum"
    },
    "piment_africain": {
      "id": "piment_africain",
      "nom": "Piment africain",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "piment_africain.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "piment_africain.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Capsicum chinense"
    },
    "poireau": {
      "id": "poireau",
      "nom": "Poireau",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "poireau.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "poireau.html",
      "categorie": "Aromatiques",
      "nom_scientifique": "Allium porrum"
    },
    "pois-chiche": {
      "id": "pois-chiche",
      "nom": "Pois-chiche",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "pois-chiche.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "pois-chiche.html",
      "categorie": "Legumineuses",
      "nom_scientifique": "Cicer arietinum"
    },
    "pois": {
      "id": "pois",
      "nom": "Pois",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "pois.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "pois.html",
      "categorie": "Legumineuses",
      "nom_scientifique": "Pisum sativum"
    },
    "poivron": {
      "id": "poivron",
      "nom": "Poivron",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "poivron.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "poivron.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Capsicum annuum"
    },
    "pomme_de_terre": {
      "id": "pomme_de_terre",
      "nom": "Pomme de terre",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "pomme_de_terre.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "pomme_de_terre.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Solanum tuberosum"
    },
    "potiron": {
      "id": "potiron",
      "nom": "Potiron",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "potiron.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "potiron.html",
      "categorie": "Legumes Fruits",
      "nom_scientifique": "Cucurbita maxima"
    },
    "radis-noir": {
      "id": "radis-noir",
      "nom": "Radis-noir",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "radis-noir.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "radis-noir.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Raphanus sativus var. niger"
    },
    "radis": {
      "id": "radis",
      "nom": "Radis",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "radis.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "radis.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Raphanus sativus"
    },
    "salsifis": {
      "id": "salsifis",
      "nom": "Salsifis",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "salsifis.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "salsifis.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Tragopogon porrifolius"
    },
    "talinum": {
      "id": "talinum",
      "nom": "Talinum",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "talinum.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "talinum.html",
      "categorie": "Legumes Feuilles",
      "nom_scientifique": "Talinum triangulare"
    },
    "taro": {
      "id": "taro",
      "nom": "Taro",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "taro.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "taro.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Colocasia esculenta"
    },
    "topinambour": {
      "id": "topinambour",
      "nom": "Topinambour",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "topinambour.jpg",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "lien_vers_fichier": "topinambour.html",
      "categorie": "Tubercules",
      "nom_scientifique": "Helianthus tuberosus"
    },
    "morelle": {
      "id": "morelle",
      "nom": "Morelle Noire",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "morelle.jpg",
      "categorie": "Legumes Feuilles",
      "lien_vers_fichier": "morelle.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Solanum nigrum"
    },
    "corete": {
      "id": "corete",
      "nom": "Corète",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "corete.jpg",
      "categorie": "Legumes Feuilles",
      "lien_vers_fichier": "corete.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Corchorus olitorius"
    },
    "igname": {
      "id": "igname",
      "nom": "Igname",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "igname.jpg",
      "categorie": "Tubercules",
      "lien_vers_fichier": "igname.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Dioscorea spp."
    },
    "patate": {
      "id": "patate",
      "nom": "Patate Douce",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "patate.jpg",
      "categorie": "Tubercules",
      "lien_vers_fichier": "patate.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Ipomoea batatas"
    },
    "riz": {
      "id": "riz",
      "nom": "Riz",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "riz.jpg",
      "categorie": "Cereales",
      "lien_vers_fichier": "riz.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Oryza sativa"
    },
    "sorgho": {
      "id": "sorgho",
      "nom": "Sorgho",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "sorgho.jpg",
      "categorie": "Cereales",
      "lien_vers_fichier": "sorgho.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Sorghum bicolor"
    },
    "mil": {
      "id": "mil",
      "nom": "Mil",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "mil.jpg",
      "categorie": "Cereales",
      "lien_vers_fichier": "mil.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Pennisetum glaucum"
    },
    "fonio": {
      "id": "fonio",
      "nom": "Fonio",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "fonio.jpg",
      "categorie": "Cereales",
      "lien_vers_fichier": "fonio.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Digitaria exilis"
    },
    "niebe": {
      "id": "niebe",
      "nom": "Niébé",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "niebe.jpg",
      "categorie": "Legumineuses",
      "lien_vers_fichier": "niebe.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Vigna unguiculata"
    },
    "soja": {
      "id": "soja",
      "nom": "Soja",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "soja.jpg",
      "categorie": "Legumineuses",
      "lien_vers_fichier": "soja.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Glycine max"
    },
    "arachide": {
      "id": "arachide",
      "nom": "Arachide",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "arachide.jpg",
      "categorie": "Legumineuses",
      "lien_vers_fichier": "arachide.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Arachis hypogaea"
    },
    "voandzou": {
      "id": "voandzou",
      "nom": "Voandzou",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "voandzou.jpg",
      "categorie": "Legumineuses",
      "lien_vers_fichier": "voandzou.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Vigna subterranea"
    },
    "banane": {
      "id": "banane",
      "nom": "Banane Plantain",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "banane.jpg",
      "categorie": "Fruitiers",
      "lien_vers_fichier": "banane.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Musa spp."
    },
    "ananas": {
      "id": "ananas",
      "nom": "Ananas",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "ananas.jpg",
      "categorie": "Fruitiers",
      "lien_vers_fichier": "ananas.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Ananas comosus"
    },
    "mangue": {
      "id": "mangue",
      "nom": "Mangue",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "mangue.jpg",
      "categorie": "Fruitiers",
      "lien_vers_fichier": "mangue.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Mangifera indica"
    },
    "papaye": {
      "id": "papaye",
      "nom": "Papaye",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "papaye.jpg",
      "categorie": "Fruitiers",
      "lien_vers_fichier": "papaye.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Carica papaya"
    },
    "avocat": {
      "id": "avocat",
      "nom": "Avocat",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "avocat.jpg",
      "categorie": "Fruitiers",
      "lien_vers_fichier": "avocat.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Persea americana"
    },
    "orange": {
      "id": "orange",
      "nom": "Orange",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "orange.jpg",
      "categorie": "Fruitiers",
      "lien_vers_fichier": "orange.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Citrus sinensis"
    },
    "citron": {
      "id": "citron",
      "nom": "Citron",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "citron.jpg",
      "categorie": "Fruitiers",
      "lien_vers_fichier": "citron.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Citrus limon"
    },
    "coton": {
      "id": "coton",
      "nom": "Coton",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "coton.jpg",
      "categorie": "Cultures de Rente",
      "lien_vers_fichier": "coton.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Gossypium spp."
    },
    "sesame": {
      "id": "sesame",
      "nom": "Sésame",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "sesame.jpg",
      "categorie": "Cultures de Rente",
      "lien_vers_fichier": "sesame.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Sesamum indicum"
    },
    "curcuma": {
      "id": "curcuma",
      "nom": "Curcuma",
      "saison": "Toute saison (à confirmer)",
      "duree_jours": 0,
      "rendement": "Non spécifié",
      "zone_adaptee": "Toutes zones",
      "image": "curcuma.jpg",
      "categorie": "Aromatiques",
      "lien_vers_fichier": "curcuma.html",
      "budget": {
        "cout_intrants": "N/A",
        "cout_main_oeuvre": "N/A",
        "revenu_estime": "N/A"
      },
      "etapes": [
        {
          "titre": "Mise à jour en cours",
          "description": "Données en cours de collecte.",
          "semaine": "-",
          "jour": 0,
          "nom": "Mise à jour en cours"
        }
      ],
      "maladies_communes": [],
      "nom_scientifique": "Curcuma longa"
    }
  },
  "maladies": [
    {
      "nom": "Chenille Légionnaire d'Automne",
      "symptome": "Feuilles perforées, présence de sciure dans le cornet (Maïs).",
      "traitement_bio": "Application d'extrait de graines de Neem ou de champignon Beauveria bassiana.",
      "traitement_chimique": "Insecticide homologué (ex: Emamectine benzoate).",
      "image": "feuilles.jpg"
    },
    {
      "nom": "Flétrissement bactérien",
      "symptome": "Flétrissement soudain de la plante entière alors qu'elle est encore verte (Tomate, Piment).",
      "traitement_bio": "Arrachage et destruction des plants infectés. Rotation stricte des cultures.",
      "traitement_chimique": "Aucun traitement chimique curatif efficace. Prévention avant tout.",
      "image": "tomate.jpg"
    },
    {
      "nom": "Mildiou",
      "symptome": "Taches brunâtres sur les feuilles, duvet blanchâtre en dessous. Pourriture des fruits.",
      "traitement_bio": "Bouillie bordelaise (cuivre), purin de prêle.",
      "traitement_chimique": "Fongicide systémique (ex: Mancozèbe + Métalaxyl).",
      "image": "feuilles.jpg"
    },
    {
      "nom": "Mosaïque du manioc",
      "symptome": "Décoloration, jaunissement et déformation des feuilles de manioc. Réduction du rendement.",
      "traitement_bio": "Utilisation de boutures saines certifiées. Arrachage des plants malades.",
      "traitement_chimique": "Lutte contre la mouche blanche (vecteur) avec des insecticides spécifiques.",
      "image": "feuilles.jpg"
    },
    {
      "nom": "Oïdium",
      "symptome": "Feutrage blanc poudreux sur les feuilles (Gombo, Courgette).",
      "traitement_bio": "Soufre mouillable, pulvérisation de lait dilué ou bicarbonate de soude.",
      "traitement_chimique": "Fongicide à base de soufre ou triazoles.",
      "image": "gombo.jpg"
    },
    {
      "nom": "Pourriture apicale",
      "symptome": "Tache noire et sèche à la base du fruit (cul noir sur Tomate/Poivron).",
      "traitement_bio": "Arrosage régulier (éviter le stress hydrique), paillage, apport de coquilles d'œufs broyées.",
      "traitement_chimique": "Engrais foliaire riche en calcium.",
      "image": "tomate.jpg"
    },
    {
      "nom": "Pucerons",
      "symptome": "Feuilles recroquevillées, présence de miellat collant et fourmis.",
      "traitement_bio": "Pulvérisation d'eau savonneuse (savon noir) ou macération d'ail.",
      "traitement_chimique": "Insecticide systémique.",
      "image": "feuilles.jpg"
    },
    {
      "nom": "Charbon du Maïs",
      "symptome": "Excroissances boursouflées et grisâtres sur les épis ou tiges.",
      "traitement_bio": "Couper et brûler délicatement les épis infectés avant qu'ils n'éclatent.",
      "traitement_chimique": "Traitement des semences (préventif uniquement).",
      "image": "mais-doux.jpg"
    },
    {
      "nom": "Nématodes à galles",
      "symptome": "Retard de croissance, jaunissement, présence de nodosités (galles) sur les racines.",
      "traitement_bio": "Rotation des cultures, planter des œillets d'Inde (Tagètes) comme nématicide naturel.",
      "traitement_chimique": "Nématicides de sol (très toxiques, à éviter si possible).",
      "image": "racines.jpg"
    },
    {
      "nom": "Pourridié des racines",
      "symptome": "Dépérissement rapide, racines noircies et pourries (Manioc, arbres fruitiers).",
      "traitement_bio": "Assainissement du sol, éviter l'excès d'humidité, arrachage.",
      "traitement_chimique": "Fongicide du sol.",
      "image": "tubercules.jpg"
    }
  ],
  "marche": [
    {
      "produit": "Tomate locale",
      "prix_kg": 400,
      "marche": "Dantokpa",
      "tendance": "baisse",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Maïs grain sec",
      "prix_kg": 250,
      "marche": "Bohicon",
      "tendance": "hausse",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Gombo frais",
      "prix_kg": 350,
      "marche": "Ouando (Porto-Novo)",
      "tendance": "stable",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Piment Habanero",
      "prix_kg": 1200,
      "marche": "Dantokpa",
      "tendance": "hausse",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Manioc tubercule",
      "prix_kg": 150,
      "marche": "Azovè",
      "tendance": "stable",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Igname (Moroko)",
      "prix_kg": 800,
      "marche": "Glazoué",
      "tendance": "baisse",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Oignon violet",
      "prix_kg": 600,
      "marche": "Dantokpa",
      "tendance": "hausse",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Soja grain",
      "prix_kg": 300,
      "marche": "Parakou",
      "tendance": "baisse",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Riz local décortiqué",
      "prix_kg": 500,
      "marche": "Malanville",
      "tendance": "hausse",
      "date": "02 Sept 2026"
    },
    {
      "produit": "Aubergine",
      "prix_kg": 300,
      "marche": "Dantokpa",
      "tendance": "stable",
      "date": "02 Sept 2026"
    }
  ]
};