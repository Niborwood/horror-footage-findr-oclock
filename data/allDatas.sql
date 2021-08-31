BEGIN;

INSERT INTO "movie" ("name", "id") VALUES

    ('01 - C''EST ARRIVE PRES DE CHEZ VOUS', '10086'),
    ('02 - V/H/S 2', '159117'),
    ('03 - The Poughkeepsie Tapes', '38410'),
    ('04 - The Blair 22 Project (22)', '2667'),
    ('05 - Cannibal Holocaust', '8689'),
    ('06 - Marble Hornets', '124380'),
    ('07 - Trolljegeren', '46146'),
    ('08 - Noroi: The Curse', '21506'),
    ('09 - Les Documents Interdits', '116684'),
    ('10 - Murder Death Koreatown', '675522'),
    ('11 - Grave Encounters', '50698'),
    ('12 - [REC]', '8329'),
    ('13 - Host', '723072'),
    ('14 - Butterfly Kisses', '480733'),
    ('15 - Resolution', '121606'),
    ('16 - Home Movie', '27258'),
    ('17 - What We Do In The Shadows', '246741'),
    ('18 - The Visit', '298312'),
    ('19 - The Good Neighbor', '339994'),
    ('20 - Open Windows', '151368'),
    ('21 - V/H/S', '84348'),
    ('22 - Chronicle', '76726'),
    ('23 - Hell House LLC', '359246'),
    ('24 - The Bay', '123105'),
    ('25 - The Dark Tapes', '390883'),
    ('26 - Phoenix Forgotten', '443319'),
    ('27 - As Above, So Below', '256274'),
    ('28 - The Sacrament', '211067'),
    ('29 - 2 Activity : The Marked Ones', '227348'),
    ('30 - Grave Encounters 2', '134366'),
    ('31 - Searching', '489999'),
    ('32 - The 24 Of Michael King', '272692'),
    ('33 - 2 Activity 3', '72571'),
    ('34 - The Taking Of Deborah Logan (39, 21, 24)', '297608'),
    ('35 - Cloverfield (39, 30, 26)', '7191'),
    ('36 - Gonjiam: Haunted Asylum', '508642'),
    ('37 - Apollo 18', '50357'),
    ('38 - Ghostwatch', '46633'),
    ('39 - Hell House 2', '532973'),
    ('40 - Hell House 3', '614722'),
    ('41 - Behind The Mask', '10961'),
    ('42 - Creep', '250574'),
    ('43 - Creep 2', '396493'),
    ('44 - Digging Up The Marrow', '279972'),
    ('45 - Savageland', '326446'),
    ('46 - The Houses October Built', '293572'),
    ('47 - The Den', '244610'),
    ('48 - There Are 4', '320508'),
    ('49 - 2 Activity 4', '82990'),
    ('50 - Be My Cat', '328216'),
    ('51 - Preservation', '265019'),
    ('52 - Lake Mungo', '27374'),
    ('53 - Diary Of The Dead', '13025'),
    ('54 - A5licted', '210947'),
    ('55 - A Haunted House', '139038'),
    ('56 - Megan Is Missing', '63197'),
    ('57 - Leaving D.C ', '413469'),
    ('58 - Man vs', '343112'),
    ('59 - Shooting The Warwicks', '176074'),
    ('60 - 2 Activity', '23827'),
    ('61 - Death Of A Vlogger', '614196'),
    ('62 - Mockingbird', '289712'),
    ('63 - Oc33', '118315'),
    ('64 - Bad Ben', '821660'),
    ('65 - Quarantine', '13812'),
    ('66 - Unfriended', '277685'),
    ('67 - Jeruzalem', '339547'),
    ('68 - Sorgoï Prakov', '359642'),
    ('69 - Frazier Park Recut', '480635'),
    ('70 - The Lost Footage of Leah Sullivan', '555559'),
    ('71 - Exhibit A', '49341'),
    ('72 - 23 Abduction', '258193'),
    ('73 - The Tunnel', '46221'),
    ('74 - 2 Activity 5', '146301'),
    ('75 - The Dyatlov Pass Incident', '169219'),
    ('76 - Amber Alert', '135670'),
    ('77 - Exists', '124470'),
    ('78 - Unfriended : Dark Web', '505058'),
    ('79 - The River', '39336'),
    ('80 - The McPherson Tape', '204611'),
    ('81 - The Borderlands', '207774'),
    ('82 - Die Präsenz', '303856'),
    ('83 - Night Shot', '574466'),
    ('84 - Followed', '521531'),
    ('85 - Pyramide', '282813'),
    ('86 - The Monster project', '462036'),
    ('87 - The Fear Footage', '551412'),
    ('88 - The Fear Footage 2', '658829'),
    ('89 - The Fear Footage 3', '790509'),
    ('90 - Survive The Hollow Shoals', '506986'),
    ('91 - Willow Creek', '185460'),
    ('92 - The Conspiracy', '133369'),
    ('93 - Steelmanville Road', '810263'),
    ('94 - 2 Activity 2', '41436'),
    ('95 - C40 Ground', '472591'),
    ('96 - A Haunted House 2', '184345'),
    ('97 - Rorschach', '419464'),
    ('98 - The Devil’s Doorway', '524789'),
    ('99 - V/H/S/ Viral', '267806'),
    ('100 - A Record Of Sweet Murder', '291492'),
    ('101 - The Houses October Built 2', '466344'),
    ('102 - The Gallows', '299245'),
    ('103 - Area 51', '57876'),
    ('104 - The Darkest Dawn', '423733'),
    ('105 - Blair 22', '351211'),
    ('106 - The Last Exorcism', '38358'),
    ('107 - The Last Exorcism 2', '146203'),
    ('108 - Rec 2', '10664'),
    ('109 - The Collingswood Story', '54511'),
    ('110 - Long Pigs', '74727'),
    ('111 - One Cut Of The Dead', '513434');
 
INSERT INTO "question" ("title", "name") VALUES

    ('Niveau horreur, vos kinks, c''est plutôt...', 'cat'),
    ('Quels types de films souhaitez-vous voir ?', 'type'),
    ('Il doit venir d''où, ce film ?', 'from'),
    ('On part piocher à quelles époques ?', 'date'),
    ('Chaud pour un film de niche, ou on y va doucement ?', 'rare'),
    ('Des petites excentricités ?', 'extr');

INSERT INTO "tag" ("description", "value", "question_id") VALUES

    -- 'Niveau horreur, vos kinks, c'est plutôt...', 
    ('Les thrillers', 'thriller', '1'), 
    ('Le paranormal', 'paranormal','1'), 
    ('La science-fiction', 'sf', '1'), 
    ('Les monstres', 'monsters', '1'), 

    -- 'Quels types de films souhaitez-vous voir ?',
    ('Un found footage classique', 'ff', '2'), 
    ('Un faux-documentaire', 'mockumentary', '2'), 
    ('Un film à sketchs', 'sketch', '2'), 
    ('Une série', 'series', '2'), 
    ('Un film-écran', 'screen', '2'), 

    -- 'Il doit venir d'où, ce film ?',
    ('de France', 'france', '3'), 
    ('d''Europe', 'europe', '3'), 
    ('des USA [/] Canada', 'usa', '3'), 
    ('d''Asie', 'asia', '3'), 
    ('... et de quelques recoins du monde', 'other', '3'), 

    -- 'On part piocher à quelles époques ?',
    ('les 70/80s', '70-80s', '4'), 
    ('les 90s', '90s', '4'), 
    ('les années 2000', '00s', '4'), 
    ('de 2010 à aujourd''hui', '10s', '4'), 

    -- 'Chaud pour un film de niche, ou on y va doucement ?',
    ('Sors-moi quelque chose je n''ai problablement pas vu', 'rare', '5'), 
    ('Si c''est un peu connu, c''est ok', 'common', '5'), 

    -- 'Des petites excentricités ?',
    ('Des démons', 'demon', '6'), 
    ('Des sorcières', 'witch', '6'), 
    ('Des aliens', 'alien', '6'), 
    ('Des possessions', 'possession', '6'), 
    ('Des tueurs en série', 'serial-killer', '6'), 
    ('De l''apocalypse', 'apocalypse', '6'), 
    ('Des losers', 'loser', '6'), 
    ('Des hôpitaux psychiatriques', 'hospital', '6'), 
    ('Des clowns', 'clown', '6'), 
    ('Des blockbusters', 'blockbuster', '6'), 
    ('Du gore', 'gore', '6'), 
    ('Des forêts cheloues', 'woods', '6'), 
    ('Des sectes', 'cult', '6'), 
    ('Des yetis', 'bigfoot', '6'), 
    ('De la mythologie', 'mythology', '6'), 
    ('Des webcams', 'webcam', '6'), 
    ('Des zombies / infectés', 'zombie', '6'), 
    ('De la fausse télé-réalité', 'reality-show', '6'), 
    ('Du drame (oui, c''est possible)', 'drama', '6'), 
    ('Des vieux', 'old', '6'), 
    ('De la comédie', 'comedy', '6'), 
    ('De la flotte', 'water', '6'), 
    ('Inspiré d''une histoire vraie', 'true-story', '6'), 
    ('WTF', 'wtf', '6'), 
    ('Des vampires', 'vampires', '6');

INSERT INTO "horror_user" ("pseudo", "email", "password") VALUES

    ('sadelena', 'sadelena@truc.fr', 'testillon'),
    ('robinozo', 'robinozo@truc.fr', 'jkiffhorror'),
    ('correntinus', 'correntinus@truc.fr', 'tchoutchou'),
    ('arnhost', 'arnhost@truc.fr', 'intheforest');

INSERT INTO "horror_user_has_movie" ("movie_id", "horror_user_id", "watchlist", "watched", "rating") VALUES

    ('10086', '3', 'true', 'true', '2');

INSERT INTO "movie_has_tag" ("movie_id", "tag_id") VALUES

    ('10086', '6'),
    ('10086', '20'),
    ('10086', '11'),
    ('10086', '16'),
    ('10086', '1'),
    ('10086', '25'),
    ('10086', '38'),
    ('10086', '31'),
    ('10086', '40'),
    ('159117', '7'),
    ('159117', '20'),
    ('159117', '12'),
    ('159117', '18'),
    ('159117', '2'),
    ('159117', '31'),
    ('159117', '33'),
    ('159117', '26'),
    ('159117', '21'),
    ('38410', '6'),
    ('38410', '19'),
    ('38410', '12'),
    ('38410', '17'),
    ('38410', '1'),
    ('38410', '25'),
    ('8689', '6'),
    ('8689', '20'),
    ('8689', '11'),
    ('8689', '15'),
    ('8689', '1'),
    ('8689', '31'),
    ('124380', '8'),
    ('124380', '19'),
    ('124380', '12'),
    ('124380', '18'),
    ('124380', '2'),
    ('124380', '21'),
    ('46146', '6'),
    ('46146', '20'),
    ('46146', '11'),
    ('46146', '18'),
    ('46146', '4'),
    ('46146', '35'),
    ('46146', '32'),
    ('21506', '5'),
    ('21506', '20'),
    ('21506', '13'),
    ('21506', '17'),
    ('21506', '2'),
    ('21506', '21'),
    ('21506', '24'),
    ('116684', '8'),
    ('116684', '19'),
    ('116684', '10'),
    ('116684', '15'),
    ('116684', '2'),
    ('116684', '23'),
    ('675522', '5'),
    ('675522', '19'),
    ('675522', '12'),
    ('675522', '18'),
    ('675522', '2'),
    ('675522', '27'),
    ('675522', '43'),
    ('50698', '6'),
    ('50698', '20'),
    ('50698', '12'),
    ('50698', '17'),
    ('50698', '2'),
    ('50698', '21'),
    ('50698', '38'),
    ('50698', '28'),
    ('8329', '6'),
    ('8329', '20'),
    ('8329', '11'),
    ('8329', '17'),
    ('8329', '4'),
    ('8329', '38'),
    ('8329', '37'),
    ('723072', '9'),
    ('723072', '20'),
    ('723072', '12'),
    ('723072', '18'),
    ('723072', '2'),
    ('723072', '21'),
    ('723072', '36'),
    ('480733', '5'),
    ('480733', '19'),
    ('480733', '12'),
    ('480733', '18'),
    ('480733', '21'),
    ('121606', '5'),
    ('121606', '19'),
    ('121606', '12'),
    ('121606', '18'),
    ('121606', '4'),
    ('121606', '32'),
    ('121606', '27'),
    ('27258', '5'),
    ('27258', '19'),
    ('27258', '12'),
    ('27258', '17'),
    ('27258', '2'),
    ('27258', '21'),
    ('27258', '39'),
    ('246741', '6'),
    ('246741', '20'),
    ('246741', '14'),
    ('246741', '18'),
    ('246741', '4'),
    ('246741', '41'),
    ('246741', '45'),
    ('246741', '35'),
    ('298312', '5'),
    ('298312', '20'),
    ('298312', '12'),
    ('298312', '18'),
    ('298312', '1'),
    ('298312', '40'),
    ('298312', '41'),
    ('339994', '5'),
    ('339994', '20'),
    ('339994', '12'),
    ('339994', '18'),
    ('339994', '1'),
    ('339994', '40'),
    ('339994', '39'),
    ('151368', '9'),
    ('151368', '19'),
    ('151368', '12'),
    ('151368', '18'),
    ('151368', '1'),
    ('151368', '25'),
    ('151368', '36'),
    ('84348', '7'),
    ('84348', '20'),
    ('84348', '12'),
    ('84348', '18'),
    ('84348', '2'),
    ('84348', '21'),
    ('84348', '31'),
    ('76726', '5'),
    ('76726', '20'),
    ('76726', '12'),
    ('76726', '18'),
    ('76726', '3'),
    ('76726', '39'),
    ('76726', '30'),
    ('359246', '5'),
    ('359246', '20'),
    ('359246', '12'),
    ('359246', '18'),
    ('359246', '2'),
    ('359246', '29'),
    ('359246', '21'),
    ('123105', '6'),
    ('123105', '20'),
    ('123105', '12'),
    ('123105', '18'),
    ('123105', '1'),
    ('123105', '42'),
    ('390883', '7'),
    ('390883', '19'),
    ('390883', '12'),
    ('390883', '18'),
    ('390883', '2'),
    ('390883', '31'),
    ('443319', '5'),
    ('443319', '19'),
    ('443319', '12'),
    ('443319', '18'),
    ('443319', '3'),
    ('443319', '23'),
    ('256274', '5'),
    ('256274', '20'),
    ('256274', '12'),
    ('256274', '18'),
    ('256274', '2'),
    ('256274', '21'),
    ('256274', '35'),
    ('211067', '5'),
    ('211067', '20'),
    ('211067', '12'),
    ('211067', '18'),
    ('211067', '1'),
    ('211067', '39'),
    ('211067', '33'),
    ('211067', '43'),
    ('227348', '5'),
    ('227348', '20'),
    ('227348', '12'),
    ('227348', '18'),
    ('227348', '2'),
    ('227348', '21'),
    ('227348', '24'),
    ('227348', '30'),
    ('134366', '6'),
    ('134366', '20'),
    ('134366', '12'),
    ('134366', '18'),
    ('134366', '2'),
    ('134366', '21'),
    ('134366', '28'),
    ('614196', '6'),
    ('614196', '19'),
    ('614196', '11'),
    ('614196', '18'),
    ('614196', '2'),
    ('614196', '2'),
    ('614196', '41'),
    ('614196', '21'),
    ('614196', '38'),
    ('289712', '5'),
    ('289712', '20'),
    ('289712', '12'),
    ('289712', '18'),
    ('289712', '1'),
    ('289712', '25'),
    ('289712', '29'),
    ('118315', '6'),
    ('118315', '19'),
    ('118315', '13'),
    ('118315', '17'),
    ('118315', '2'),
    ('118315', '25'),
    ('118315', '21'),
    ('118315', '24'),
    ('118315', '33'),
    ('821660', '5'),
    ('821660', '19'),
    ('821660', '12'),
    ('821660', '18'),
    ('821660', '2'),
    ('821660', '21'),
    ('821660', '27'),
    ('13812', '6'),
    ('13812', '20'),
    ('13812', '12'),
    ('13812', '17'),
    ('13812', '4'),
    ('13812', '37'),
    ('277685', '9'),
    ('277685', '20'),
    ('277685', '12'),
    ('277685', '18'),
    ('277685', '2'),
    ('277685', '21'),
    ('339547', '5'),
    ('339547', '20'),
    ('339547', '14'),
    ('339547', '18'),
    ('339547', '4'),
    ('339547', '35'),
    ('339547', '37'),
    ('359642', '5'),
    ('359642', '19'),
    ('359642', '10'),
    ('359642', '18'),
    ('359642', '1'),
    ('359642', '25'),
    ('359642', '44'),
    ('359642', '41'),
    ('480635', '5'),
    ('480635', '19'),
    ('480635', '12'),
    ('480635', '18'),
    ('480635', '1'),
    ('480635', '32'),
    ('480635', '25'),
    ('555559', '5'),
    ('555559', '19'),
    ('555559', '12'),
    ('555559', '18'),
    ('555559', '2'),
    ('555559', '21'),
    ('49341', '5'),
    ('49341', '19'),
    ('49341', '11'),
    ('49341', '17'),
    ('49341', '1'),
    ('49341', '25'),
    ('49341', '39'),
    ('258193', '3'),
    ('258193', '20'),
    ('258193', '12'),
    ('258193', '18'),
    ('258193', '3'),
    ('258193', '23'),
    ('46221', '6'),
    ('46221', '19'),
    ('46221', '14'),
    ('46221', '18'),
    ('46221', '2'),
    ('46221', '21'),
    ('146301', '5'),
    ('146301', '20'),
    ('146301', '12'),
    ('146301', '18'),
    ('146301', '2'),
    ('146301', '21'),
    ('146301', '24'),
    ('146301', '30'),
    ('169219', '6'),
    ('169219', '19'),
    ('169219', '11'),
    ('169219', '18'),
    ('169219', '4'),
    ('169219', '35'),
    ('169219', '43'),
    ('135670', '5'),
    ('135670', '19'),
    ('135670', '12'),
    ('135670', '1'),
    ('135670', '25'),
    ('124470', '5'),
    ('135670', '20'),
    ('135670', '12'),
    ('135670', '18'),
    ('135670', '4'),
    ('135670', '35'),
    ('135670', '34'),
    ('135670', '32'),
    ('505058', '9'),
    ('505058', '20'),
    ('505058', '12'),
    ('505058', '18'),
    ('505058', '2'),
    ('505058', '21'),
    ('505058', '36'),
    ('39336', '8'),
    ('39336', '19'),
    ('39336', '12'),
    ('39336', '18'),
    ('39336', '2'),
    ('39336', '38'),
    ('39336', '21'),
    ('39336', '39'),
    ('39336', '42'),
    ('204611', '5'),
    ('204611', '19'),
    ('204611', '12'),
    ('204611', '15'),
    ('204611', '3'),
    ('204611', '23'),
    ('207774', '5'),
    ('207774', '19'),
    ('207774', '11'),
    ('207774', '18'),
    ('207774', '2'),
    ('207774', '21'),
    ('207774', '24'),
    ('303856', '5'),
    ('303856', '19'),
    ('303856', '11'),
    ('303856', '18'),
    ('303856', '2'),
    ('303856', '21'),
    ('303856', '5'),
    ('303856', '19'),
    ('303856', '11'),
    ('303856', '18'),
    ('303856', '2'),
    ('303856', '21'),
    ('574466', '6'),
    ('574466', '19'),
    ('574466', '10'),
    ('574466', '18'),
    ('574466', '2'),
    ('574466', '21'),
    ('574466', '38'),
    ('574466', '28'),
    ('521531', '6'),
    ('521531', '20'),
    ('521531', '12'),
    ('521531', '18'),
    ('521531', '2'),
    ('521531', '21'),
    ('521531', '38'),
    ('282813', '5'),
    ('282813', '20'),
    ('282813', '12'),
    ('282813', '18'),
    ('282813', '2'),
    ('282813', '35'),
    ('282813', '21'),
    ('462036', '5'),
    ('462036', '19'),
    ('462036', '12'),
    ('462036', '18'),
    ('462036', '4'),
    ('462036', '21'),
    ('462036', '45'),
    ('551412', '7'),
    ('551412', '19'),
    ('551412', '12'),
    ('551412', '18'),
    ('551412', '2'),
    ('551412', '21'),
    ('658829', '7'),
    ('658829', '19'),
    ('658829', '12'),
    ('658829', '18'),
    ('658829', '2'),
    ('658829', '21'),
    ('790509', '7'),
    ('790509', '19'),
    ('790509', '12'),
    ('790509', '18'),
    ('790509', '2'),
    ('790509', '21'),
    ('506986', '6'),
    ('506986', '19'),
    ('506986', '12'),
    ('506986', '18'),
    ('506986', '2'),
    ('506986', '32'),
    ('506986', '38'),
    ('506986', '21'),
    ('489999', '9'),
    ('489999', '20'),
    ('489999', '12'),
    ('489999', '18'),
    ('489999', '1'),
    ('489999', '39'),
    ('489999', '36'),
    ('272692', '5'),
    ('272692', '19'),
    ('272692', '12'),
    ('272692', '18'),
    ('272692', '2'),
    ('272692', '39'),
    ('272692', '21'),    
    ('72571', '5'),
    ('72571', '20'),
    ('72571', '12'),
    ('72571', '18'),
    ('72571', '2'),
    ('72571', '21'),
    ('72571', '24'),
    ('72571', '30'),   
    ('297608', '6'),
    ('297608', '20'),
    ('297608', '12'),
    ('297608', '18'),
    ('297608', '2'),
    ('297608', '39'),
    ('297608', '21'),
    ('297608', '24'),
    ('297608', '40'),   
    ('7191', '5'),
    ('7191', '20'),
    ('7191', '12'),
    ('7191', '17'),
    ('7191', '4'),
    ('7191', '39'),
    ('7191', '30'),
    ('7191', '26'),   
    ('508642', '6'),
    ('508642', '19'),
    ('508642', '13'),
    ('508642', '18'),
    ('508642', '2'),
    ('508642', '21'),
    ('508642', '28'),   
    ('50357', '5'),
    ('50357', '19'),
    ('50357', '12'),
    ('50357', '18'),
    ('50357', '3'),
    ('50357', '23'),   
    ('46633', '6'),
    ('46633', '19'),
    ('46633', '11'),
    ('46633', '16'),
    ('46633', '2'),
    ('46633', '38'),
    ('46633', '21'),
    ('46633', '24'),    
    ('532973', '6'),
    ('532973', '20'),
    ('532973', '12'),
    ('532973', '18'),
    ('532973', '2'),
    ('532973', '29'),
    ('532973', '21'),    
    ('614722', '6'),
    ('614722', '20'),
    ('614722', '12'),
    ('614722', '18'),
    ('614722', '2'),
    ('614722', '29'),
    ('614722', '21'),    
    ('10961', '6'),
    ('10961', '20'),
    ('10961', '12'),
    ('10961', '17'),
    ('10961', '1'),
    ('10961', '25'),
    ('10961', '41'),   
    ('250574', '5'),
    ('250574', '20'),
    ('250574', '12'),
    ('250574', '18'),
    ('250574', '1'),
    ('250574', '32'),
    ('250574', '25'),
    ('250574', '27'),  
    ('396493', '5'),
    ('396493', '20'),
    ('396493', '12'),
    ('396493', '18'),
    ('396493', '1'),
    ('396493', '32'),
    ('396493', '25'),
    ('396493', '27'),
    ('279972', '6'),
    ('279972', '20'),
    ('279972', '12'),
    ('279972', '18'),
    ('279972', '4'),
    ('279972', '41'),   
    ('326446', '6'),
    ('326446', '19'),
    ('326446', '12'),
    ('326446', '18'),
    ('326446', '4'),
    ('326446', '37'),
    ('293572', '6'),
    ('293572', '20'),
    ('293572', '12'),
    ('293572', '18'),
    ('293572', '2'),
    ('293572', '25'),
    ('293572', '29'),
    ('244610', '5'),
    ('244610', '20'),
    ('244610', '12'),
    ('244610', '18'),
    ('244610', '1'),
    ('244610', '25'),
    ('244610', '36'),
    ('320508', '5'),
    ('320508', '19'),
    ('320508', '12'),
    ('320508', '18'),
    ('320508', '4'),
    ('320508', '44'),
    ('320508', '23'),
    ('82990', '5'),
    ('82990', '20'),
    ('82990', '12'),
    ('82990', '18'),
    ('82990', '2'),
    ('82990', '21'),
    ('82990', '24'),
    ('82990', '2'),
    ('328216', '5'),
    ('328216', '19'),
    ('328216', '11'),
    ('328216', '18'),
    ('328216', '1'),
    ('328216', '44'),
    ('328216', '25'),
    ('265019', '5'),
    ('265019', '20'),
    ('265019', '12'),
    ('265019', '17'),
    ('265019', '2'),
    ('265019', '25'),
    ('265019', '32'),
    ('27374', '6'),
    ('27374', '20'),
    ('27374', '14'),
    ('27374', '17'),
    ('27374', '2'),
    ('27374', '21'),
    ('27374', '39'),
    ('13025', '5'),
    ('13025', '20'),
    ('13025', '12'),
    ('13025', '17'),
    ('13025', '4'),
    ('13025', '30'),
    ('13025', '37'),
    ('13025', '26'),
    ('210947', '5'),
    ('210947', '20'),
    ('210947', '12'),
    ('210947', '18'),
    ('210947', '4'),
    ('210947', '37'),
    ('139038', '5'),
    ('139038', '20'),
    ('139038', '12'),
    ('139038', '18'),
    ('139038', '2'),
    ('139038', '41'),
    ('63197', '5'),
    ('63197', '20'),
    ('63197', '12'),
    ('63197', '18'),
    ('63197', '1'),
    ('63197', '25'),
    ('63197', '36'),
    ('413469', '5'),
    ('413469', '19'),
    ('413469', '12'),
    ('413469', '18'),
    ('413469', '2'),
    ('413469', '32'),
    ('413469', '27'),
    ('343112', '6'),
    ('343112', '19'),
    ('343112', '12'),
    ('343112', '18'),
    ('343112', '4'),
    ('343112', '32'),
    ('343112', '38'),
    ('176074', '6'),
    ('176074', '19'),
    ('176074', '12'),
    ('176074', '18'),
    ('176074', '1'),
    ('176074', '38'),
    ('176074', '41'),
    ('23827', '5'),
    ('23827', '20'),
    ('23827', '12'),
    ('23827', '17'),
    ('23827', '2'),
    ('23827', '30'),
    ('23827', '21'),
    ('23827', '24'),
    ('185460', '5'),
    ('185460', '20'),
    ('185460', '12'),
    ('185460', '18'),
    ('185460', '4'),
    ('185460', '32'),
    ('185460', '34'),
    ('133369', '5'),
    ('133369', '19'),
    ('133369', '12'),
    ('133369', '18'),
    ('133369', '1'),
    ('133369', '33'),
    ('810263', '5'),
    ('810263', '19'),
    ('810263', '12'),
    ('810263', '18'),
    ('810263', '2'),
    ('810263', '21'),
    ('41436', '5'),
    ('41436', '20'),
    ('41436', '12'),
    ('41436', '18'),
    ('41436', '2'),
    ('41436', '21'),
    ('41436', '24'),
    ('41436', '30'),
    ('472591', '5'),
    ('472591', '19'),
    ('472591', '10'),
    ('472591', '18'),
    ('472591', '4'),
    ('472591', '32'),
    ('184345', '5'),
    ('184345', '20'),
    ('184345', '12'),
    ('184345', '18'),
    ('184345', '2'),
    ('184345', '41'),
    ('419464', '5'),
    ('419464', '19'),
    ('419464', '12'),
    ('419464', '18'),
    ('419464', '2'),
    ('419464', '21'),
    ('419464', '24'),
    ('524789', '5'),
    ('524789', '19'),
    ('524789', '11'),
    ('524789', '18'),
    ('524789', '2'),
    ('524789', '21'),
    ('524789', '24'),
    ('267806', '7'),
    ('267806', '20'),
    ('267806', '12'),
    ('267806', '18'),
    ('267806', '2'),
    ('267806', '21'),
    ('291492', '5'),
    ('291492', '19'),
    ('291492', '13'),
    ('291492', '18'),
    ('291492', '4'),
    ('291492', '25'),
    ('291492', '23'),
    ('466344', '6'),
    ('466344', '20'),
    ('466344', '12'),
    ('466344', '18'),
    ('466344', '2'),
    ('466344', '25'),
    ('466344', '29'),
    ('299245', '5'),
    ('299245', '20'),
    ('299245', '12'),
    ('299245', '18'),
    ('299245', '2'),
    ('299245', '21'),
    ('299245', '30'),
    ('57876', '5'),
    ('57876', '20'),
    ('57876', '12'),
    ('57876', '18'),
    ('57876', '3'),
    ('57876', '23'),
    ('423733', '5'),
    ('423733', '19'),
    ('423733', '11'),
    ('423733', '18'),
    ('423733', '3'),
    ('423733', '23'),
    ('423733', '26'),
    ('351211', '5'),
    ('351211', '20'),
    ('351211', '12'),
    ('351211', '18'),
    ('351211', '2'),
    ('351211', '30'),
    ('351211', '22'),
    ('351211', '32'),
    ('38358', '5'),
    ('38358', '20'),
    ('38358', '12'),
    ('38358', '18'),
    ('38358', '2'),
    ('38358', '21'),
    ('38358', '24'),
    ('146203', '5'),
    ('146203', '20'),
    ('146203', '12'),
    ('146203', '18'),
    ('146203', '2'),
    ('146203', '21'),
    ('146203', '24'),
    ('10664', '5'),
    ('10664', '20'),
    ('10664', '11'),
    ('10664', '17'),
    ('10664', '4'),
    ('10664', '37'),
    ('10664', '30'),
    ('54511', '5'),
    ('54511', '19'),
    ('54511', '12'),
    ('54511', '17'),
    ('54511', '4'),
    ('54511', '36'),
    ('74727', '6'),
    ('74727', '19'),
    ('74727', '12'),
    ('74727', '17'),
    ('74727', '4'),
    ('74727', '31'),
    ('74727', '25'),
    ('513434', '6'),
    ('513434', '20'),
    ('513434', '13'),
    ('513434', '18'),
    ('513434', '4'),
    ('513434', '37'),
    ('513434', '41');


COMMIT;