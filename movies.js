/* Film library. Add a row to RAW and it shows up everywhere. */
/* ============ DATA ============
   title|year|genres|themes|runtime|rating|language|director|cast|synopsis|moods  */
const RAW = `
Parasite|2019|Thriller,Drama|class-divide,con-artist,dark-comedy|132|8.5|Korean|Bong Joon-ho|Song Kang-ho, Cho Yeo-jeong|A broke family cons its way into the employ of a rich one, until the basement gives up its secret.|dark,tense,thoughtful
Memories of Murder|2003|Crime,Drama|serial-killer,whodunit,small-town|131|8.1|Korean|Bong Joon-ho|Song Kang-ho, Kim Sang-kyung|Two rural detectives fumble through Korea's first serial murder case and never quite recover.|dark,tense,sad
Oldboy|2003|Thriller,Mystery|revenge,mind-bending,prison|120|8.3|Korean|Park Chan-wook|Choi Min-sik, Yoo Ji-tae|A man locked up for fifteen years without explanation gets five days to find out why.|dark,weird,tense
The Handmaiden|2016|Thriller,Romance|con-artist,forbidden-love,period|145|8.1|Korean|Park Chan-wook|Kim Min-hee, Kim Tae-ri|A pickpocket is planted as maid to a Japanese heiress, and every layer of the plan is a lie.|weird,tense,romantic
Burning|2018|Mystery,Drama|class-divide,obsession,slow-burn|148|7.5|Korean|Lee Chang-dong|Yoo Ah-in, Steven Yeun|A delivery boy suspects a rich stranger of something monstrous, but proof never arrives.|dark,thoughtful,weird
I Saw the Devil|2010|Thriller,Horror|revenge,serial-killer|144|7.8|Korean|Kim Jee-woon|Lee Byung-hun, Choi Min-sik|An agent hunts his fiancee's killer, then keeps letting him go to prolong the punishment.|dark,tense
The Chaser|2008|Thriller,Crime|serial-killer,chase|125|7.8|Korean|Na Hong-jin|Kim Yoon-seok, Ha Jung-woo|An ex-cop turned pimp realises his missing women all got into the same car.|dark,tense
The Wailing|2016|Horror,Mystery|cult,haunting,small-town|156|7.4|Korean|Na Hong-jin|Kwak Do-won, Hwang Jung-min|A village sickness spreads and a bumbling cop must decide which outsider to believe.|dark,weird,tense
Train to Busan|2016|Horror,Action|survival,parenthood,disaster|118|7.6|Korean|Yeon Sang-ho|Gong Yoo, Ma Dong-seok|A father and daughter are trapped on a high-speed train as an outbreak tears through the carriages.|tense,sad,adrenaline
Decision to Leave|2022|Mystery,Romance|obsession,whodunit|139|7.2|Korean|Park Chan-wook|Park Hae-il, Tang Wei|A detective falls for the widow at the centre of the death he's investigating.|thoughtful,romantic,tense
Inception|2010|Sci-Fi,Action|heist,mind-bending,grief|148|8.8|English|Christopher Nolan|Leonardo DiCaprio, Marion Cotillard|A thief who steals through dreams is hired to plant an idea instead.|epic,tense,thoughtful
Interstellar|2014|Sci-Fi,Drama|space,parenthood,survival|169|8.7|English|Christopher Nolan|Matthew McConaughey, Jessica Chastain|A farmer-pilot leaves his kids behind to find humanity somewhere past the wormhole.|epic,sad,thoughtful
The Dark Knight|2008|Action,Crime|chaos,vigilante,moral-dilemma|152|9.0|English|Christopher Nolan|Christian Bale, Heath Ledger|A clown with no plan sets out to prove that any good man will break.|dark,epic,tense
The Prestige|2006|Mystery,Drama|obsession,rivalry,mind-bending|130|8.5|English|Christopher Nolan|Hugh Jackman, Christian Bale|Two magicians destroy each other over a trick neither will explain.|dark,thoughtful,weird
Memento|2000|Thriller,Mystery|revenge,mind-bending,grief|113|8.4|English|Christopher Nolan|Guy Pearce, Carrie-Anne Moss|A man who can't form new memories hunts his wife's killer, backwards.|dark,thoughtful,weird
Oppenheimer|2023|Drama,History|war,moral-dilemma,biography|180|8.3|English|Christopher Nolan|Cillian Murphy, Robert Downey Jr.|The man who built the bomb spends the rest of his life being asked whether he should have.|epic,dark,thoughtful
Dunkirk|2017|War,Thriller|war,survival|106|7.8|English|Christopher Nolan|Fionn Whitehead, Tom Hardy|Three timelines converge on a beach where 400,000 men are waiting to be rescued.|tense,epic
Whiplash|2014|Drama,Music|musician,obsession,abuse|106|8.5|English|Damien Chazelle|Miles Teller, J.K. Simmons|A drummer and a teacher who believes genius is beaten out of people.|tense,dark,adrenaline
La La Land|2016|Romance,Musical|musician,ambition,first-love|128|8.0|English|Damien Chazelle|Ryan Gosling, Emma Stone|Two dreamers in Los Angeles discover their ambitions don't fit in the same life.|romantic,sad,feelgood
Prisoners|2013|Thriller,Crime|kidnapping,moral-dilemma,parenthood|153|8.1|English|Denis Villeneuve|Hugh Jackman, Jake Gyllenhaal|A father takes the investigation of his daughter's disappearance into his own basement.|dark,tense,sad
Sicario|2015|Thriller,Crime|cartel,moral-dilemma|121|7.6|English|Denis Villeneuve|Emily Blunt, Benicio del Toro|An FBI agent joins a cross-border task force whose rules nobody will explain to her.|dark,tense
Arrival|2016|Sci-Fi,Drama|aliens,language,grief|116|7.9|English|Denis Villeneuve|Amy Adams, Jeremy Renner|A linguist must talk to visitors whose language rewires how she experiences time.|thoughtful,sad,epic
Blade Runner 2049|2017|Sci-Fi,Mystery|AI,identity,dystopia|164|8.0|English|Denis Villeneuve|Ryan Gosling, Harrison Ford|A replicant cop uncovers a secret that could end the fragile order he polices.|dark,thoughtful,epic
Dune|2021|Sci-Fi,Adventure|space,dynasty,destiny|155|8.0|English|Denis Villeneuve|Timothee Chalamet, Rebecca Ferguson|A noble house is handed a desert planet worth killing for, and walks into the trap.|epic,thoughtful
Dune Part Two|2024|Sci-Fi,Adventure|space,revenge,destiny|166|8.5|English|Denis Villeneuve|Timothee Chalamet, Zendaya|A grieving heir becomes the messiah he was warned not to be.|epic,adrenaline,dark
Fight Club|1999|Drama,Thriller|identity,anti-capitalism,mind-bending|139|8.8|English|David Fincher|Brad Pitt, Edward Norton|An insomniac office drone starts a basement fight club that becomes something worse.|dark,weird,thoughtful
Se7en|1995|Thriller,Crime|serial-killer,whodunit|127|8.6|English|David Fincher|Brad Pitt, Morgan Freeman|Two detectives chase a killer who murders by the seven deadly sins.|dark,tense
Zodiac|2007|Mystery,Crime|serial-killer,obsession,journalism|157|7.7|English|David Fincher|Jake Gyllenhaal, Mark Ruffalo|The case that nobody solved and nobody could put down.|dark,thoughtful,tense
Gone Girl|2014|Thriller,Mystery|marriage,media,con-artist|149|8.1|English|David Fincher|Ben Affleck, Rosamund Pike|A wife vanishes and the nation decides her husband did it.|dark,tense,weird
The Social Network|2010|Drama,Biography|ambition,betrayal,friendship|120|7.8|English|David Fincher|Jesse Eisenberg, Andrew Garfield|Facebook gets built, and every friendship in the room gets billed for it.|thoughtful,tense
Everything Everywhere All at Once|2022|Sci-Fi,Comedy|multiverse,found-family,parenthood|139|7.8|English|Daniel Kwan, Daniel Scheinert|Michelle Yeoh, Ke Huy Quan|A laundromat owner mid-audit must save every version of her life, including this one.|weird,funny,sad
Mad Max Fury Road|2015|Action,Sci-Fi|survival,dystopia,chase|120|8.1|English|George Miller|Tom Hardy, Charlize Theron|One long road chase out of a tyrant's desert and straight back into it.|adrenaline,epic
Ex Machina|2014|Sci-Fi,Thriller|AI,manipulation|108|7.7|English|Alex Garland|Alicia Vikander, Oscar Isaac|A coder is flown out to test whether a robot is conscious, or whether he is the test.|tense,thoughtful,weird
Her|2013|Romance,Sci-Fi|AI,loneliness,marriage|126|8.0|English|Spike Jonze|Joaquin Phoenix, Scarlett Johansson|A lonely writer falls in love with the voice of his operating system.|sad,thoughtful,romantic
Eternal Sunshine of the Spotless Mind|2004|Romance,Sci-Fi|memory,heartbreak,mind-bending|108|8.3|English|Michel Gondry|Jim Carrey, Kate Winslet|A couple erase each other and meet again anyway.|sad,weird,romantic
The Matrix|1999|Sci-Fi,Action|dystopia,identity,chosen-one|136|8.7|English|The Wachowskis|Keanu Reeves, Laurence Fishburne|A hacker learns his whole world is a program running on his body's heat.|epic,adrenaline,thoughtful
Children of Men|2006|Sci-Fi,Thriller|dystopia,survival,hope|109|7.9|English|Alfonso Cuaron|Clive Owen, Julianne Moore|Eighteen years into global infertility, one woman is pregnant.|dark,tense,thoughtful
Snowpiercer|2013|Sci-Fi,Action|class-divide,dystopia,revolt|126|7.1|English|Bong Joon-ho|Chris Evans, Tilda Swinton|The last humans circle a frozen Earth on a train sorted strictly by class.|dark,adrenaline,weird
Groundhog Day|1993|Comedy,Romance|time-loop,redemption|101|8.0|English|Harold Ramis|Bill Murray, Andie MacDowell|A sour weatherman lives the same small-town day until he stops being a jerk.|funny,feelgood,thoughtful
Edge of Tomorrow|2014|Sci-Fi,Action|time-loop,war,aliens|113|7.9|English|Doug Liman|Tom Cruise, Emily Blunt|A coward dies on the beach, wakes up, and dies better every time.|adrenaline,funny,tense
Source Code|2011|Sci-Fi,Thriller|time-loop,identity|93|7.5|English|Duncan Jones|Jake Gyllenhaal, Michelle Monaghan|A soldier relives eight minutes on a doomed train until he finds the bomber.|tense,thoughtful
Predestination|2014|Sci-Fi,Thriller|time-loop,identity,mind-bending|97|7.4|English|The Spierig Brothers|Ethan Hawke, Sarah Snook|A time agent chases a bomber across decades and into his own origin.|weird,thoughtful,tense
Primer|2004|Sci-Fi,Drama|time-loop,mind-bending|77|6.8|English|Shane Carruth|Shane Carruth, David Sullivan|Two engineers build a time machine in a garage and immediately lose control of it.|weird,thoughtful
Coherence|2013|Sci-Fi,Thriller|multiverse,mind-bending,dinner-party|89|7.2|English|James Ward Byrkit|Emily Baldoni, Maury Sterling|A comet passes and a dinner party starts meeting other versions of itself.|weird,tense,thoughtful
Looper|2012|Sci-Fi,Action|time-loop,assassin,moral-dilemma|119|7.4|English|Rian Johnson|Joseph Gordon-Levitt, Bruce Willis|A hitman for the future is sent his own older self to kill.|tense,adrenaline
Knives Out|2019|Mystery,Comedy|whodunit,inheritance,class-divide|130|7.9|English|Rian Johnson|Daniel Craig, Ana de Armas|A crime novelist dies rich, and every relative had a reason.|funny,tense,cozy
No Country for Old Men|2007|Thriller,Crime|chase,fate,moral-dilemma|122|8.2|English|Coen Brothers|Javier Bardem, Josh Brolin|A welder takes a case of drug money and a man with a cattle gun comes for it.|dark,tense,thoughtful
Fargo|1996|Crime,Comedy|kidnapping,small-town,whodunit|98|8.1|English|Coen Brothers|Frances McDormand, William H. Macy|A car salesman hires two idiots to kidnap his wife and everything gets bloodier from there.|funny,dark,cozy
The Big Lebowski|1998|Comedy,Crime|mistaken-identity,friendship|117|8.1|English|Coen Brothers|Jeff Bridges, John Goodman|A slacker gets mistaken for a millionaire and just wants his rug back.|funny,weird,cozy
There Will Be Blood|2007|Drama,History|greed,rivalry,father-son|158|8.2|English|Paul Thomas Anderson|Daniel Day-Lewis, Paul Dano|An oil man drills California dry and lets everything human in him go with it.|dark,epic,thoughtful
Goodfellas|1990|Crime,Drama|gangster,betrayal,rise-and-fall|145|8.7|English|Martin Scorsese|Ray Liotta, Joe Pesci|Thirty years inside the mob, from the glamour to the paranoia.|dark,adrenaline,epic
The Departed|2006|Crime,Thriller|undercover,betrayal,identity|151|8.5|English|Martin Scorsese|Leonardo DiCaprio, Matt Damon|A cop inside the mob and a mobster inside the police, both hunting each other.|tense,dark
The Wolf of Wall Street|2013|Comedy,Crime|greed,rise-and-fall,addiction|180|8.2|English|Martin Scorsese|Leonardo DiCaprio, Jonah Hill|A stockbroker builds an empire out of fraud and very nearly enjoys the crash.|funny,dark,adrenaline
Shutter Island|2010|Thriller,Mystery|asylum,mind-bending,grief|138|8.2|English|Martin Scorsese|Leonardo DiCaprio, Mark Ruffalo|A marshal investigates a missing patient on an island that won't let him leave.|dark,tense,weird
Taxi Driver|1976|Drama,Crime|loneliness,vigilante,city|114|8.2|English|Martin Scorsese|Robert De Niro, Jodie Foster|An insomniac cabbie decides someone should clean up the city.|dark,thoughtful
The Godfather|1972|Crime,Drama|gangster,family,dynasty|175|9.2|English|Francis Ford Coppola|Marlon Brando, Al Pacino|The son who wanted out becomes the coldest man in the family.|epic,dark,thoughtful
Heat|1995|Crime,Thriller|heist,cop-vs-thief,obsession|170|8.3|English|Michael Mann|Al Pacino, Robert De Niro|A crew planning one last score and the detective who can't stop thinking about them.|tense,epic
Pulp Fiction|1994|Crime,Comedy|gangster,nonlinear,redemption|154|8.9|English|Quentin Tarantino|John Travolta, Samuel L. Jackson|Hitmen, a boxer and a briefcase, in whatever order suits the story.|funny,dark,weird
Kill Bill Vol 1|2003|Action,Thriller|revenge,assassin|111|8.2|English|Quentin Tarantino|Uma Thurman, Lucy Liu|A bride wakes from a coma with a list of names to cross off.|adrenaline,dark
Inglourious Basterds|2009|War,Thriller|war,revenge,undercover|153|8.4|English|Quentin Tarantino|Brad Pitt, Christoph Waltz|Two plots to burn down the Nazi high command meet in one cinema.|tense,funny,epic
Once Upon a Time in Hollywood|2019|Comedy,Drama|friendship,fading-star,period|161|7.6|English|Quentin Tarantino|Leonardo DiCaprio, Brad Pitt|A washed-up actor and his stuntman drift through the last summer of old Hollywood.|cozy,funny,thoughtful
Drive|2011|Thriller,Crime|getaway-driver,loner,romance|100|7.8|English|Nicolas Winding Refn|Ryan Gosling, Carey Mulligan|A stunt driver moonlights as a getaway man, then does one favour too many.|dark,romantic,tense
Baby Driver|2017|Action,Crime|heist,getaway-driver,musician|113|7.5|English|Edgar Wright|Ansel Elgort, Lily James|A getaway driver who scores every job to his own playlist wants one clean exit.|adrenaline,funny,feelgood
Hot Fuzz|2007|Comedy,Action|small-town,cult,buddy-cop|121|7.8|English|Edgar Wright|Simon Pegg, Nick Frost|London's best cop is exiled to a village where nobody ever dies suspiciously.|funny,cozy,weird
The Nice Guys|2016|Comedy,Crime|whodunit,buddy-cop,period|116|7.4|English|Shane Black|Russell Crowe, Ryan Gosling|A thug and a useless PI stumble through a missing-girl case in seventies LA.|funny,cozy,tense
John Wick|2014|Action,Thriller|revenge,assassin,grief|101|7.4|English|Chad Stahelski|Keanu Reeves, Michael Nyqvist|They took the dog his dead wife gave him. That was the mistake.|adrenaline,dark
Mission Impossible Fallout|2018|Action,Thriller|spy,chase|147|7.7|English|Christopher McQuarrie|Tom Cruise, Rebecca Ferguson|A recovered-plutonium job goes wrong and never stops going wrong.|adrenaline,tense
Casino Royale|2006|Action,Thriller|spy,poker,romance|144|8.0|English|Martin Campbell|Daniel Craig, Eva Green|Bond earns the number, then loses the only thing he wanted with it.|adrenaline,romantic,tense
The Bourne Ultimatum|2007|Action,Thriller|spy,identity,chase|115|8.0|English|Paul Greengrass|Matt Damon, Julia Stiles|An amnesiac asset closes in on the programme that made him.|adrenaline,tense
The Raid|2011|Action,Thriller|survival,siege|101|7.6|Indonesian|Gareth Evans|Iko Uwais, Joe Taslim|A SWAT team is trapped in a tower block where every floor wants them dead.|adrenaline,tense
Nightcrawler|2014|Thriller,Crime|media,ambition,sociopath|117|7.8|English|Dan Gilroy|Jake Gyllenhaal, Rene Russo|A freelance crime cameraman learns that the best footage can be arranged.|dark,tense,weird
Uncut Gems|2019|Thriller,Drama|addiction,debt,gambling|135|7.4|English|Safdie Brothers|Adam Sandler, Julia Fox|A jeweller keeps parlaying one impossible bet into a bigger one.|tense,adrenaline,dark
Hell or High Water|2016|Crime,Drama|heist,brothers,debt|102|7.6|English|David Mackenzie|Chris Pine, Jeff Bridges|Two brothers rob the bank that's foreclosing on their mother's land.|thoughtful,tense,sad
Wind River|2017|Thriller,Crime|whodunit,grief,cold|107|7.7|English|Taylor Sheridan|Jeremy Renner, Elizabeth Olsen|A tracker and a rookie agent work a death on a snowbound reservation.|dark,sad,tense
The Shawshank Redemption|1994|Drama|prison,friendship,hope|142|9.3|English|Frank Darabont|Tim Robbins, Morgan Freeman|A banker sentenced for a murder he didn't commit spends twenty years getting out.|feelgood,sad,thoughtful
The Green Mile|1999|Drama,Fantasy|prison,miracle,injustice|189|8.6|English|Frank Darabont|Tom Hanks, Michael Clarke Duncan|Death row guards meet a giant of a man who heals what he touches.|sad,thoughtful
Forrest Gump|1994|Drama,Romance|life-story,friendship,love|142|8.8|English|Robert Zemeckis|Tom Hanks, Robin Wright|An ordinary man walks through every landmark of American history.|feelgood,sad,cozy
12 Angry Men|1957|Drama|courtroom,persuasion,justice|96|9.0|English|Sidney Lumet|Henry Fonda, Lee J. Cobb|Eleven jurors want to go home. One wants to talk it through.|tense,thoughtful
Rear Window|1954|Mystery,Thriller|voyeurism,whodunit|112|8.5|English|Alfred Hitchcock|James Stewart, Grace Kelly|A photographer with a broken leg becomes sure his neighbour is a murderer.|tense,cozy
Psycho|1960|Horror,Thriller|serial-killer,motel|109|8.5|English|Alfred Hitchcock|Anthony Perkins, Janet Leigh|A woman on the run stops at the wrong motel.|dark,tense
The Silence of the Lambs|1991|Thriller,Horror|serial-killer,profiling|118|8.6|English|Jonathan Demme|Jodie Foster, Anthony Hopkins|A trainee agent bargains with one killer to catch another.|dark,tense
Alien|1979|Horror,Sci-Fi|space,monster,survival|117|8.5|English|Ridley Scott|Sigourney Weaver, Tom Skerritt|A mining crew answers a distress call and brings something aboard.|tense,dark
The Thing|1982|Horror,Sci-Fi|paranoia,monster,isolation|109|8.2|English|John Carpenter|Kurt Russell, Keith David|At an Antarctic base, something can perfectly imitate any of them.|tense,dark,weird
Hereditary|2018|Horror,Drama|grief,cult,family|127|7.3|English|Ari Aster|Toni Collette, Alex Wolff|A family unravels after a death, and the unravelling turns out to be planned.|dark,tense,sad
Midsommar|2019|Horror,Drama|cult,breakup,grief|148|7.1|English|Ari Aster|Florence Pugh, Jack Reynor|A grieving woman follows her indifferent boyfriend to a Swedish festival.|weird,dark,sad
Get Out|2017|Horror,Thriller|racism,cult,mind-bending|104|7.7|English|Jordan Peele|Daniel Kaluuya, Allison Williams|A Black man meets his white girlfriend's family, who are far too welcoming.|tense,weird,dark
The Witch|2015|Horror,Drama|cult,family,period|92|7.0|English|Robert Eggers|Anya Taylor-Joy, Ralph Ineson|A banished Puritan family starts losing children to the woods.|dark,weird,tense
It Follows|2014|Horror,Thriller|curse,chase,teen|100|6.8|English|David Robert Mitchell|Maika Monroe, Keir Gilchrist|Something is walking toward her and will never stop.|tense,weird,dark
A Quiet Place|2018|Horror,Sci-Fi|survival,parenthood,monster|90|7.5|English|John Krasinski|Emily Blunt, John Krasinski|A family lives in total silence because the things outside hunt by sound.|tense,sad,adrenaline
The Babadook|2014|Horror,Drama|grief,parenthood,haunting|94|6.8|English|Jennifer Kent|Essie Davis, Noah Wiseman|A widowed mother and her difficult son are visited by a storybook figure.|dark,sad,tense
Spirited Away|2001|Animation,Fantasy|coming-of-age,spirit-world,work|125|8.6|Japanese|Hayao Miyazaki|Rumi Hiiragi, Miyu Irino|A sulky girl must work in a bathhouse for gods to win her parents back.|weird,feelgood,cozy
Princess Mononoke|1997|Animation,Fantasy|nature,war,curse|134|8.4|Japanese|Hayao Miyazaki|Yoji Matsuda, Yuriko Ishida|A cursed prince walks into a war between a forge town and the forest gods.|epic,thoughtful,sad
My Neighbor Totoro|1988|Animation,Family|childhood,siblings,illness|86|8.1|Japanese|Hayao Miyazaki|Noriko Hidaka, Chika Sakamoto|Two sisters wait for their mother to come home and meet the spirit next door.|cozy,feelgood,sad
Your Name|2016|Animation,Romance|body-swap,disaster,first-love|106|8.4|Japanese|Makoto Shinkai|Ryunosuke Kamiki, Mone Kamishiraishi|Two teenagers keep waking up in each other's lives, and then it stops.|romantic,sad,feelgood
Perfect Blue|1997|Animation,Thriller|identity,fame,stalker|81|8.0|Japanese|Satoshi Kon|Junko Iwao, Rica Matsumoto|A pop idol turned actress loses the line between her roles and her life.|dark,weird,tense
Seven Samurai|1954|Action,Drama|underdog,honour,village|207|8.6|Japanese|Akira Kurosawa|Toshiro Mifune, Takashi Shimura|A starving village hires seven masterless swordsmen to fight off bandits.|epic,thoughtful
Rashomon|1950|Mystery,Drama|truth,testimony|88|8.2|Japanese|Akira Kurosawa|Toshiro Mifune, Machiko Kyo|Four people describe the same killing and none of the stories fit.|thoughtful,weird
Harakiri|1962|Drama,Action|revenge,honour,class-divide|133|8.6|Japanese|Masaki Kobayashi|Tatsuya Nakadai|A ronin asks a noble house for a place to die, then tells them a story first.|dark,thoughtful,epic
Shoplifters|2018|Drama|found-family,poverty,crime|121|7.9|Japanese|Hirokazu Kore-eda|Lily Franky, Sakura Ando|A family that survives on theft takes in a neglected girl.|sad,thoughtful,cozy
Pan's Labyrinth|2006|Fantasy,War|war,childhood,fairy-tale|118|8.2|Spanish|Guillermo del Toro|Ivana Baquero, Sergi Lopez|A girl under fascist Spain escapes into a labyrinth that asks a price.|dark,sad,weird
City of God|2002|Crime,Drama|gangster,poverty,coming-of-age|130|8.6|Portuguese|Fernando Meirelles|Alexandre Rodrigues, Leandro Firmino|Two boys in a Rio favela take opposite roads out of the same street.|dark,epic,adrenaline
The Lives of Others|2006|Drama,Thriller|surveillance,conscience|137|8.4|German|Florian Henckel von Donnersmarck|Ulrich Muhe, Martina Gedeck|A Stasi officer listens to a playwright's life until he starts protecting it.|thoughtful,sad,tense
Cinema Paradiso|1988|Drama,Romance|childhood,cinema,first-love|155|8.5|Italian|Giuseppe Tornatore|Philippe Noiret, Salvatore Cascio|A director remembers the projectionist who raised him on other people's films.|sad,cozy,feelgood
Amelie|2001|Comedy,Romance|whimsy,loneliness,kindness|122|8.3|French|Jean-Pierre Jeunet|Audrey Tautou, Mathieu Kassovitz|A shy Parisian waitress secretly rearranges strangers' lives.|feelgood,cozy,romantic
Portrait of a Lady on Fire|2019|Romance,Drama|forbidden-love,art,period|122|8.1|French|Celine Sciamma|Noemie Merlant, Adele Haenel|A painter is hired to study a bride-to-be without her knowing why.|romantic,sad,thoughtful
Anatomy of a Fall|2023|Drama,Mystery|courtroom,marriage,whodunit|151|7.7|French|Justine Triet|Sandra Huller, Swann Arlaud|A writer stands trial for her husband's fall, with their blind son as witness.|tense,thoughtful
The Zone of Interest|2023|Drama,History|war,complicity|105|7.4|German|Jonathan Glazer|Christian Friedel, Sandra Huller|A commandant's family gardens happily on the other side of the wall.|dark,thoughtful
Poor Things|2023|Comedy,Sci-Fi|coming-of-age,freedom,weird-science|141|7.8|English|Yorgos Lanthimos|Emma Stone, Mark Ruffalo|A resurrected woman with an infant's brain sets out to learn the world herself.|weird,funny,thoughtful
The Banshees of Inisherin|2022|Drama,Comedy|friendship,loneliness,island|114|7.7|English|Martin McDonagh|Colin Farrell, Brendan Gleeson|One man simply decides he no longer likes his best friend.|sad,funny,thoughtful
Past Lives|2023|Romance,Drama|first-love,immigrant,fate|105|7.8|English|Celine Song|Greta Lee, Teo Yoo|Two childhood friends meet again twenty-four years and one ocean later.|sad,romantic,thoughtful
Aftersun|2022|Drama|parenthood,memory,grief|102|7.6|English|Charlotte Wells|Paul Mescal, Frankie Corio|A woman replays a holiday with her father, looking for what she missed.|sad,thoughtful
Lady Bird|2017|Drama,Comedy|coming-of-age,mother-daughter,small-town|94|7.4|English|Greta Gerwig|Saoirse Ronan, Laurie Metcalf|A senior year of wanting out of Sacramento and out of her mother's house.|feelgood,sad,funny
Little Miss Sunshine|2006|Comedy,Drama|road-trip,family,underdog|101|7.8|English|Jonathan Dayton, Valerie Faris|Abigail Breslin, Steve Carell|A broken family drives a broken van to a children's beauty pageant.|funny,feelgood,sad
Call Me by Your Name|2017|Romance,Drama|first-love,summer,forbidden-love|132|7.8|English|Luca Guadagnino|Timothee Chalamet, Armie Hammer|One Italian summer and the boy who was only ever visiting.|romantic,sad,cozy
Before Sunrise|1995|Romance,Drama|first-love,one-night,travel|101|8.1|English|Richard Linklater|Ethan Hawke, Julie Delpy|Two strangers get off a train in Vienna and talk until morning.|romantic,cozy,thoughtful
Chef|2014|Comedy,Drama|food,road-trip,father-son|114|7.3|English|Jon Favreau|Jon Favreau, John Leguizamo|A fired chef buys a food truck and cooks his way back to his son.|feelgood,cozy,funny
Paddington 2|2017|Family,Comedy|prison,kindness,found-family|103|7.8|English|Paul King|Ben Whishaw, Hugh Grant|A polite bear is framed for theft and improves the prison from the inside.|feelgood,funny,cozy
Coco|2017|Animation,Family|music,family,death|105|8.4|English|Lee Unkrich|Anthony Gonzalez, Gael Garcia Bernal|A boy crosses into the land of the dead to learn who his family really lost.|sad,feelgood,epic
Inside Out|2015|Animation,Family|emotions,growing-up,sadness|95|8.2|English|Pete Docter|Amy Poehler, Phyllis Smith|The feelings inside an eleven-year-old fight over who gets to run her.|sad,feelgood,funny
WALL-E|2008|Animation,Sci-Fi|loneliness,robots,dystopia|98|8.4|English|Andrew Stanton|Ben Burtt, Elissa Knight|The last cleaning robot on Earth falls in love and accidentally saves humanity.|feelgood,sad,cozy
Toy Story 3|2010|Animation,Family|growing-up,friendship,escape|103|8.3|English|Lee Unkrich|Tom Hanks, Tim Allen|The toys face the attic, the daycare, and the boy growing up.|sad,feelgood,adrenaline
Spider-Man Into the Spider-Verse|2018|Animation,Action|coming-of-age,multiverse,mentor|117|8.4|English|Bob Persichetti|Shameik Moore, Jake Johnson|A Brooklyn kid inherits the mask and a dozen other Spider-people to teach him.|feelgood,adrenaline,funny
The Grand Budapest Hotel|2014|Comedy,Adventure|heist,friendship,period|99|8.1|English|Wes Anderson|Ralph Fiennes, Tony Revolori|A legendary concierge and his lobby boy flee a murder charge and a painting.|funny,cozy,weird
Logan|2017|Action,Drama|father-daughter,aging,road-trip|137|8.1|English|James Mangold|Hugh Jackman, Dafne Keen|A worn-out Wolverine drives a young mutant north on one last job.|sad,adrenaline,dark
Top Gun Maverick|2022|Action,Drama|mentor,redemption,flight|130|8.2|English|Joseph Kosinski|Tom Cruise, Miles Teller|A pilot who refused promotion must train the squad for a suicide run.|adrenaline,feelgood,epic
Joker|2019|Drama,Crime|mental-illness,city,rise-and-fall|122|8.3|English|Todd Phillips|Joaquin Phoenix, Robert De Niro|A failing clown in a rotting city stops absorbing the abuse.|dark,sad,tense
Nobody|2021|Action,Thriller|revenge,hidden-past|92|7.4|English|Ilya Naishuller|Bob Odenkirk, Christopher Lloyd|A dull suburban dad turns out to have been something else entirely.|adrenaline,funny,dark
RRR|2022|Action,Drama|friendship,revolution,colonialism|187|7.8|Telugu|S.S. Rajamouli|N.T. Rama Rao Jr., Ram Charan|Two revolutionaries become brothers before they learn they're on opposite sides.|epic,adrenaline,feelgood
Baahubali The Beginning|2015|Action,Fantasy|dynasty,revenge,epic-war|159|8.0|Telugu|S.S. Rajamouli|Prabhas, Rana Daggubati|A young man climbs a waterfall and inherits a kingdom's oldest grudge.|epic,adrenaline
Eega|2012|Fantasy,Action|revenge,reincarnation,underdog|134|7.7|Telugu|S.S. Rajamouli|Nani, Samantha|A murdered man returns as a housefly and dedicates his short life to revenge.|weird,funny,adrenaline
Jersey|2019|Drama,Sport|underdog,father-son,comeback|160|8.4|Telugu|Gowtam Tinnanuri|Nani, Shraddha Srinath|A failed cricketer makes a comeback at thirty-six for his son.|sad,feelgood,thoughtful
Sita Ramam|2022|Romance,War|letters,war,love-story|163|8.5|Telugu|Hanu Raghavapudi|Dulquer Salmaan, Mrunal Thakur|A soldier searches for the woman whose letters kept him alive.|romantic,sad,epic
Vikram|2022|Action,Thriller|undercover,revenge,drugs|173|8.2|Tamil|Lokesh Kanagaraj|Kamal Haasan, Fahadh Faasil|A black-ops squad, a masked vigilante gang, and a father with nothing left.|adrenaline,dark,tense
Kaithi|2019|Action,Thriller|one-night,father-daughter,convoy|145|8.4|Tamil|Lokesh Kanagaraj|Karthi, Narain|An ex-convict drives a truck of poisoned cops through a night of ambushes.|tense,adrenaline,dark
Vada Chennai|2018|Crime,Drama|gangster,betrayal,prison|164|8.3|Tamil|Vetrimaaran|Dhanush, Andrea Jeremiah|A carrom player is pulled into the politics of a north Chennai gang war.|dark,epic,tense
Asuran|2019|Drama,Action|caste,revenge,father-son|141|8.4|Tamil|Vetrimaaran|Dhanush, Manju Warrier|A farmer who buried his violent past has to dig it up to save his son.|dark,sad,adrenaline
Super Deluxe|2019|Drama,Thriller|interlinked,identity,faith|176|8.3|Tamil|Thiagarajan Kumararaja|Vijay Sethupathi, Fahadh Faasil|Four strange stories collide over one very long day in Chennai.|weird,dark,thoughtful
Soorarai Pottru|2020|Drama,Biography|underdog,aviation,ambition|153|8.7|Tamil|Sudha Kongara|Suriya, Aparna Balamurali|A farmer's son fights the airline industry to make flying affordable.|feelgood,sad,epic
Pariyerum Perumal|2018|Drama|caste,college,injustice|154|8.7|Tamil|Mari Selvaraj|Kathir, Anandhi|A law student from an oppressed caste learns what his degree will cost him.|sad,dark,thoughtful
96|2018|Romance,Drama|first-love,reunion,nostalgia|158|8.5|Tamil|C. Prem Kumar|Vijay Sethupathi, Trisha|School sweethearts meet at a reunion twenty-two years too late.|sad,romantic,cozy
Jai Bhim|2021|Drama,Crime|courtroom,injustice,caste|164|8.8|Tamil|T.J. Gnanavel|Suriya, Lijomol Jose|A lawyer fights for a tribal woman whose husband vanished in police custody.|sad,tense,thoughtful
Ratsasan|2018|Thriller,Crime|serial-killer,whodunit|170|8.4|Tamil|Ram Kumar|Vishnu Vishal, Amala Paul|A rookie cop with a screenplay about serial killers meets an actual one.|tense,dark
Jigarthanda|2014|Crime,Comedy|gangster,filmmaking,rivalry|170|8.3|Tamil|Karthik Subbaraj|Siddharth, Bobby Simha|A director researches a real gangster for his film and gets far too close.|funny,dark,weird
Aaranya Kaandam|2011|Crime,Thriller|gangster,one-day,betrayal|119|8.0|Tamil|Thiagarajan Kumararaja|Jackie Shroff, Ravi Krishna|One day in Chennai's underworld where every plan eats the last one.|dark,weird,tense
Nayakan|1987|Crime,Drama|gangster,slum,father-daughter|145|8.7|Tamil|Mani Ratnam|Kamal Haasan, Saranya|A boy from the slums becomes the don who protects them and loses his family.|epic,sad,dark
Anbe Sivam|2003|Drama,Comedy|road-trip,ideology,friendship|160|8.7|Tamil|Sundar C.|Kamal Haasan, Madhavan|A scarred communist and a smug ad man are stuck travelling together.|thoughtful,sad,funny
Drishyam|2013|Thriller,Crime|cover-up,family,police|160|8.3|Malayalam|Jeethu Joseph|Mohanlal, Meena|A cable operator uses everything films taught him to hide what his family did.|tense,thoughtful
Kumbalangi Nights|2019|Drama,Comedy|brothers,masculinity,village|135|8.5|Malayalam|Madhu C. Narayanan|Fahadh Faasil, Shane Nigam|Four useless brothers in a backwater house slowly become a family.|feelgood,cozy,thoughtful
Jallikattu|2019|Thriller,Drama|mob,chase,animal|91|7.3|Malayalam|Lijo Jose Pellissery|Antony Varghese, Chemban Vinod|A buffalo escapes a village slaughterhouse and the men chasing it turn feral.|weird,tense,dark
Premam|2015|Romance,Drama|coming-of-age,first-love,college|156|8.2|Malayalam|Alphonse Puthren|Nivin Pauly, Sai Pallavi|One man, three stages of life, three kinds of love.|feelgood,romantic,cozy
Manichitrathazhu|1993|Thriller,Horror|haunting,psychology,family|169|8.7|Malayalam|Fazil|Mohanlal, Shobana|A couple move into an ancestral house with one room nobody opens.|tense,weird,dark
Andhadhun|2018|Thriller,Comedy|blind-pianist,murder,dark-comedy|139|8.2|Hindi|Sriram Raghavan|Ayushmann Khurrana, Tabu|A pianist pretending to be blind witnesses a murder he can't report.|funny,tense,weird
Gangs of Wasseypur|2012|Crime,Drama|revenge,dynasty,coal|321|8.2|Hindi|Anurag Kashyap|Manoj Bajpayee, Nawazuddin Siddiqui|Three generations of a blood feud over the coal mafia of Dhanbad.|epic,dark,funny
Tumbbad|2018|Horror,Fantasy|greed,curse,mythology|104|8.2|Hindi|Rahi Anil Barve|Sohum Shah, Jyoti Malshe|A man milks a cursed god for gold and teaches his son to do the same.|dark,weird,epic
Queen|2013|Comedy,Drama|self-discovery,travel,breakup|146|8.1|Hindi|Vikas Bahl|Kangana Ranaut, Rajkummar Rao|Dumped days before the wedding, she takes the honeymoon alone.|feelgood,funny,thoughtful
3 Idiots|2009|Comedy,Drama|friendship,college,pressure|170|8.4|Hindi|Rajkumar Hirani|Aamir Khan, R. Madhavan|Three engineering students against an education system built to break them.|funny,feelgood,sad
Dangal|2016|Drama,Sport|father-daughter,underdog,wrestling|161|8.3|Hindi|Nitesh Tiwari|Aamir Khan, Fatima Sana Shaikh|A wrestler trains his daughters to win the medal he never could.|feelgood,epic,sad
Article 15|2019|Crime,Drama|caste,injustice,police|130|8.1|Hindi|Anubhav Sinha|Ayushmann Khurrana, Sayani Gupta|A city-bred officer posted to rural India refuses to file the easy report.|dark,tense,thoughtful
Swades|2004|Drama|homecoming,village,immigrant|210|8.2|Hindi|Ashutosh Gowariker|Shah Rukh Khan, Gayatri Joshi|A NASA engineer goes back to the village he left and can't leave again.|feelgood,sad,thoughtful
Masaan|2015|Drama,Romance|grief,caste,small-town|109|8.1|Hindi|Neeraj Ghaywan|Richa Chadha, Vicky Kaushal|Two lives beside the burning ghats of Varanasi, both trying to get out.|sad,thoughtful,romantic
`.trim();

const MOVIES = RAW.split("\n").map((l,i)=>{
  const p = l.split("|");
  return {id:i, t:p[0], y:+p[1], g:p[2].split(","), th:p[3].split(","), rt:+p[4],
          sc:+p[5], lang:p[6], dir:p[7], cast:p[8], syn:p[9], mood:p[10].split(",")};
});
