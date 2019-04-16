import { generatePartitions } from './markdown-to-partitions';

let testCases = [
  {
    name: 'test for well formated markdown to partitions',
    paramMarkdown: '# This is an h1 header\n\n## This is an h2 header\n\nThis is regular text.\nIt can be split on multiple lines.\nIt *can* _also_ *_contain_* [inline links](https://www.google.com) {relations}(PG_123456789012345) or {colors}(#FF2200).\n\n* unordered list\n\n. *_ordered list 1_*\n. ordered list 2\n\n![alt text for an image](https://www.google.com/someimage)\n\n![](https://www.google.com/someimage)\n\n> quoted text\n\n---\n\n>>>\nor quoted paragraphs\nif it\'s more than one line\n>>>',
    returnPartitions: [{type: 'h1',value: 'This is an h1 header'},{type: 'h2',value: 'This is an h2 header'},{type: 'p',partitions: [{type: 'text',value: 'This is regular text.\nIt can be split on multiple lines.\nIt '},{type: 'bold',value: 'can'},{type: 'text',value: ' '},{type: 'italics',value: 'also'},{type: 'text',value: ' '},{type: 'bold',partitions: [{type: 'italics',value: 'contain'}]},{type: 'text',value: ' '},{type: 'link',value: 'inline links',link: 'https://www.google.com'},{type: 'text',value: ' '},{type: 'relation',value: 'relations',relation: 'PG_123456789012345',},{type: 'text',value: ' or '},{type: 'color',value: 'colors',color: '#FF2200'},{type: 'text',value: '.'}]},{type: 'ul',items: [{type: 'text',value: 'unordered list'}]},{type: 'ol',items: [{type: 'bold',partitions: [{type: 'italics',value: 'ordered list 1'}]},{type: 'text',value: 'ordered list 2'}]},{type: 'image',altText: 'alt text for an image',link: 'https://www.google.com/someimage'},{type: 'image',altText: null,link: 'https://www.google.com/someimage'},{type: 'quotes',value: 'quoted text'},{type: 'hr'},{type: 'quotes',value: 'or quoted paragraphs\nif it\'s more than one line'}]
  },
  {
    name: 'test for worst case markdown to partitions',
    paramMarkdown: '#      Lan prepares Rand to meet the Amyrlin Seats\n\n\n\nLan strode in, *pushing the _door to behind* him_ with his boot heel.\n\n\n          As usual, he \\*wore his* sword over* a plain coat of green that was nearly invisible in the woods. \nThis time, though, he had a wide, golden cord tied high around his left arm, the fringed ends hanging almost to his elbow.\nOn the knot was pinned a golden crane in flight, the symbol of Malkier.\n* “The Amyrlin Seat wants you, sheepherder. You can’t go like that. Out of that shirt and brush your hair. You look like a haystack.”        \n*  He jerked open the wardrobe and began pawing through the clothes Rand meant to leave behind.\n*Rand stood stiff where he was; he felt as though he had been hit in the head with a hammer.\n* He had expected it, of course, in a way, but he had been sure he would be gone before the summons came. \n She knows. Light, I’m sure of it. “What do you mean, she wants me? I’m leaving, Lan. You were right.\nI am going to the stable right now, get my horse, and leave.”\n. “You should have done that last night.” The Warder tossed a white silk shirt onto the bed.\n\n. “No one refuses an audience with the Amyrlin Seat, sheepherder. Not the Lord Captain Commander of the Whitecloaks himself. \n. Padron Niall might spend the trip planning how to kill her, if he could do it and get away, but he would come."        \n.He turned around with one of the high-collared coats in his hands and help it up. "This one will do."\n. Tangled, long-thorned briars climbed each red sleeve in a thick, gold-embroidered line, and ran around each cuff.\n. Golden herons stood on the collars, which were edged with gold. “The color is right, too.”\n>>>He seemed to be amused at something, or satisfied. “Come on, sheepherder. Change your shirt. Move.”\nReluctantly Rand pulled the coarse wool workman’s shirt over his head. “I’ll feel a fool,” he muttered.\n“A silk shirt! I never wore a silk shirt in my life. And I never wore so fancy a coat, either, even on a feastday.”>>>\n##Light, if Perrin sees me in that. . . . Burn me, after all that fool talk about being a lord,\n### if he sees me in that, *he’ll never* listen to reason. \n“You can’t go before the Amyrlin Seat dressed like a groom fresh out of the stables, sheepherder.\nLet me see your boots. They’ll do. Well, get on with it, get on with it. You don’t keep the Amyrlin waiting. Wear your sword.”\n>“My sword!” The silk shirt over his head muffled Rand’s yelp. He yanked it the rest of the way on.\n“In the women’s apartments? Lan, if I go for an audience with the Amyrlin Seat—the Amyrlin Seat!—wearing a sword, she’ll—”\n> “Do nothing,” Lan cut him off dryly. “If the Amyrlin is afraid of you—and it’s smarter for you to think she isn’t,\n## because I don’t know anything that could frighten that woman—it won’t be for a sword. Now remember, you kneel when you go before her.\n###One knee only, mind,” he added sharply. “You’re not some merchant caught giving short weight. Maybe you had better practice it.”\n“I know how, I think. I saw how the Queen’s Guards knelt to Queen Morgase.”\n#### The ghost of a smile touched the Warder’s lips. “Yes, you do it just as they did. That will give them something to think about.”\nRand frowned. “Why are you telling me this, Lan? You’re a Warder. You’re acting as if you are on my side.”\n##### “I am on your side, sheepherder. A little. Enough to help you a bit.”\n###### The Warder’s face was stone, and sympathetic words sounded strange in that rough voice.\n“What training you’ve had, I gave you, and I’ll not have you groveling and sniveling.\n![The Wheel weaves us all into the Pattern as it wills.](www.image.com)\nYou have less freedom _about it than most, but by the Light, *you can still face it on your feet.\n![](www.image.com)\nYou remember who the Amyrlin Seat is, sheepherder, and you show her proper respect, but you do what I tell you, and you look her in the eye.\nWell, don\’t stand there gaping. Tuck in your shirt.”\nRand    shut   his     mouth and     tucked   in   his    shirt. Remember   who she    is? Burn    me, what   I wouldn’t    give to forget who she is!\nLan kept up a running flow of instructions while Rand shrugged into the red coat and buckled on his sword.\n\n\n    \nWhat to say and to whom, and what not to say. What to do, and what not. How to move, even.\n[He was not sure he could remember it all—most of it sounded odd,](www.link.com\n{and easy to forget—and he was sure whatever he forgot would be just the thing to make the Aes Sedai angry with him.}(PG_123456789012345\n{If they aren’t already. If Moiraine told the Amyrlin Seat, who else did she tell?(#F12345)\n“Lan, why can’t I* just leave *the way I planned? *By the time she* knew I was not _coming, *I’d_ be* a league outside the walls and galloping.”\n“\\# And she’d \\*have trackers \\_after you \\{before \\[you had gone two. What the Amyrlin wants, sheepherder, she gets.”\n\\. He adjusted Rand’s sword belt so the heavy buckle was centered. “What I do is the best I can for you. Believe it.”\n\\> “But why all this? What does it mean? Why do I put my hand over my heart if the Amyrlin Seat stands up?\nWhy refuse anything but water—not that I want to eat a meal with her—then dribble some on the floor and say \'The land thirsts\'?\nAnd if she asks how old I am, why tell her how long it is since I was given the sword? I don’t understand half of what you’ve told me.”\n“Three drops, sheepherder, don’t pour it. You sprinkle three drops only. You can understand later so long as you remember now.\nThink of it as upholding custom. The Amyrlin will do with you as she must.\nIf you believe you can avoid it, then you believe you can fly to the moon like Lenn.\n*You can’t escape, but maybe you can hold your own for a while, and perhaps you can keep your pride, at least.*\nThe Light burn me, I am probably wasting my time, but I’ve nothing better to do. Hold still.”\n_From his pocket the Warder produced a long length of wide, fringed golden cord and tied it around Rand’s left arm in a complicated knot._\nOn the knot he fastened a red-enameled pin, an eagle with its wings spread. “I had that made to give you, and now is as good a time as any.\n>>>\nThat will make them think.” There was no doubt about it, now. The Warder was smiling.\nRand looked down at the pin worriedly. Caldazar. The Red Eagle of Manetheren.\n“A thorn to the Dark One’s foot,” he murmured, “and a bramble to his hand.” He looked at the Warder.\n“Manetheren’s long dead and forgotten, Lan. It’s just a name in a book, now. There is only the Two Rivers.\nWhatever else I am, I’m a shepherd and a farmer. That’s all.”\n>>>\n“Well, the sword that could not be broken was shattered in the end, sheepherder, but it fought the Shadow to the last.\nThere is one rule, above all others, for being a man. Whatever comes, face it on your feet. Now, are you ready? The Amyrlin Seat waits.”\nWith a cold knot in the pit of his belly, Rand followed the Warder into the hall.\n\n> Jordan, Robert. The Great Hunt: Book Two of \'The Wheel of Time\' (pp. 127-130).',
    returnPartitions: [{type:"h1",value:"Lan prepares Rand to meet the Amyrlin Seats"},{type:"p",partitions:[{type:"text",value:"Lan strode in, "},{type:"bold",value:"pushing the _door to behind"},{type:"text",value:" him_ with his boot heel.\n          As usual, he *wore his"},{type:"bold",value:" sword over"},{type:"text",value:" a plain coat of green that was nearly invisible in the woods. \nThis time, though, he had a wide, golden cord tied high around his left arm, the fringed ends hanging almost to his elbow.\nOn the knot was pinned a golden crane in flight, the symbol of Malkier."}]},{type:"ul",items:[{type:"text",value: "\"The Amyrlin Seat wants you, sheepherder. You can't go like that. Out of that shirt and brush your hair. You look like a haystack.\""},{type:"text",value:"He jerked open the wardrobe and began pawing through the clothes Rand meant to leave behind."}]},{type: 'p', partitions: [{type:"text",value:"*Rand stood stiff where he was; he felt as though he had been hit in the head with a hammer."}]},{type:"ul",items:[{type:"text",value:"He had expected it, of course, in a way, but he had been sure he would be gone before the summons came."}]},{type: 'p', partitions: [{type:"text",value:"She knows. Light, I'm sure of it. \"What do you mean, she wants me? I'm leaving, Lan. You were right.\nI am going to the stable right now, get my horse, and leave.\""}]},{type:"ol",items:[{type:"text",value:'"You should have done that last night." The Warder tossed a white silk shirt onto the bed.'},{type:"text",value:'"No one refuses an audience with the Amyrlin Seat, sheepherder. Not the Lord Captain Commander of the Whitecloaks himself.'},{type:"text",value:'Padron Niall might spend the trip planning how to kill her, if he could do it and get away, but he would come."'}]},{type: 'p', partitions: [{type:"text",value:'.He turned around with one of the high-collared coats in his hands and help it up. "This one will do."'}]},{type:"ol",items:[{type:"text",value:"Tangled, long-thorned briars climbed each red sleeve in a thick, gold-embroidered line, and ran around each cuff."},{type:"text",value:'Golden herons stood on the collars, which were edged with gold. "The color is right, too."'}]},{type:"p",partitions:[{type:"text",value:'>>>He seemed to be amused at something, or satisfied. "Come on, sheepherder. Change your shirt. Move."\nReluctantly Rand pulled the coarse wool workman\'s shirt over his head. "I\'ll feel a fool," he muttered.\n"A silk shirt! I never wore a silk shirt in my life. And I never wore so fancy a coat, either, even on a feastday.">>>\n##Light, if Perrin sees me in that. . . . Burn me, after all that fool talk about being a lord,'}]},{type:"h3",value:"if he sees me in that, *he'll never* listen to reason."},{type:"p",partitions:[{type:"text",value:"\"You can't go before the Amyrlin Seat dressed like a groom fresh out of the stables, sheepherder.\nLet me see your boots. They'll do. Well, get on with it, get on with it. You don't keep the Amyrlin waiting. Wear your sword.\"\n>\"My sword!\" The silk shirt over his head muffled Rand's yelp. He yanked it the rest of the way on.\n\"In the women's apartments? Lan, if I go for an audience with the Amyrlin Seat—the Amyrlin Seat!—wearing a sword, she'll—\"\n"}]},{type:"quotes",value:'"Do nothing," Lan cut him off dryly. "If the Amyrlin is afraid of you—and it\'s smarter for you to think she isn\'t,'},{type:"h2",value:"because I don't know anything that could frighten that woman—it won't be for a sword. Now remember, you kneel when you go before her."},{type:"p",partitions:[{type:"text",value:'###One knee only, mind," he added sharply. "You\'re not some merchant caught giving short weight. Maybe you had better practice it."\n"I know how, I think. I saw how the Queen\'s Guards knelt to Queen Morgase."'}]},{type:"h4",value:'The ghost of a smile touched the Warder\'s lips. "Yes, you do it just as they did. That will give them something to think about."'},{type:"p",partitions:[{type:"text",value:"Rand frowned. \"Why are you telling me this, Lan? You're a Warder. You're acting as if you are on my side.\""}]},{type:"h5",value:'"I am on your side, sheepherder. A little. Enough to help you a bit."'},{type:"h6",value:"The Warder's face was stone, and sympathetic words sounded strange in that rough voice."},{type:"p", partitions: [{type: 'text',value:'"What training you\'ve had, I gave you, and I\'ll not have you groveling and sniveling.'}]},{type:"image",altText:"The Wheel weaves us all into the Pattern as it wills.",link:"www.image.com"},{type:"p",partitions:[{type:"text",value:"You have less freedom _about it than most, but by the Light, *you can still face it on your feet."}]},{type:"image",altText:null,link:"www.image.com"},{type:"p",partitions:[{type:"text",value:"You remember who the Amyrlin Seat is, sheepherder, and you show her proper respect, but you do what I tell you, and you look her in the eye.\nWell, don't stand there gaping. Tuck in your shirt.\"\nRand    shut   his     mouth and     tucked   in   his    shirt. Remember   who she    is? Burn    me, what   I wouldn't    give to forget who she is!\nLan kept up a running flow of instructions while Rand shrugged into the red coat and buckled on his sword.\n\n\n    \nWhat to say and to whom, and what not to say. What to do, and what not. How to move, even.\n[He was not sure he could remember it all—most of it sounded odd,](www.link.com\n{and easy to forget—and he was sure whatever he forgot would be just the thing to make the Aes Sedai angry with him.}(PG_123456789012345\n{If they aren't already. If Moiraine told the Amyrlin Seat, who else did she tell?(#F12345)\n\"Lan, why can't I"},{type:"bold",value:" just leave "},{type:"text",value:"the way I planned? "},{type:"bold",value:"By the time she"},{type:"text",value:" knew I was not "},{type:"italics",value:"coming, *I'd"},{type:"text",value:' be* a league outside the walls and galloping."\n"# And she\'d *have trackers _after you {before [you had gone two. What the Amyrlin wants, sheepherder, she gets."\n. He adjusted Rand\'s sword belt so the heavy buckle was centered. "What I do is the best I can for you. Believe it."\n> "But why all this? What does it mean? Why do I put my hand over my heart if the Amyrlin Seat stands up?\nWhy refuse anything but water—not that I want to eat a meal with her—then dribble some on the floor and say \'The land thirsts\'?\nAnd if she asks how old I am, why tell her how long it is since I was given the sword? I don\'t understand half of what you\'ve told me."\n"Three drops, sheepherder, don\'t pour it. You sprinkle three drops only. You can understand later so long as you remember now.\nThink of it as upholding custom. The Amyrlin will do with you as she must.'},{type:"bold",value:"You can't escape, but maybe you can hold your own for a while, and perhaps you can keep your pride, at least."},{type:"text",value:"The Light burn me, I am probably wasting my time, but I've nothing better to do. Hold still.\""},{type:"italics",value:"From his pocket the Warder produced a long length of wide, fringed golden cord and tied it around Rand's left arm in a complicated knot."},{type:"text",value:'On the knot he fastened a red-enameled pin, an eagle with its wings spread. "I had that made to give you, and now is as good a time as any.'}]},{type:"quotes",value:'That will make them think." There was no doubt about it, now. The Warder was smiling.\nRand looked down at the pin worriedly. Caldazar. The Red Eagle of Manetheren. "A thorn to the Dark One\'s foot," he murmured, "and a bramble to his hand." He looked at the Warder.\n"Manetheren\'s long dead and forgotten, Lan. It\'s just a name in a book, now. There is only the Two Rivers.\nWhatever else I am, I\'m a shepherd and a farmer. That\'s all."'},{type:"p",partitions:[{type:"text",value:'"Well, the sword that could not be broken was shattered in the end, sheepherder, but it fought the Shadow to the last.\nThere is one rule, above all others, for being a man. Whatever comes, face it on your feet. Now, are you ready? The Amyrlin Seat waits."\nWith a cold knot in the pit of his belly, Rand followed the Warder into the hall.'}]},{type:"quotes",value:"Jordan, Robert. The Great Hunt: Book Two of 'The Wheel of Time' (pp. 127-130)."}]
  }
]

for (let testCase of testCases) {
  test(testCase.name, () => {
    debugger;
    expect(generatePartitions(testCase.paramMarkdown)).toEqual(testCase.returnPartitions);
  });
}

/*
Worst case:
inner characters in links, colors, relations, images
unclosed bolds and italics
random spacing amounts between words
multiple \n between outers
weird spacing between outer partitions
unclosed links, colors, relations, images
overlapping inner partitions
escaped characters
*/

`
#      Lan prepares Rand to meet the Amyrlin Seats\n\n\n\n
Lan strode in, *pushing the _door to behind* him_ with his boot heel.\n\n\n
          As usual, he \\*wore his* sword over* a plain coat of green that was nearly invisible in the woods. \n
This time, though, he had a wide, golden cord tied high around his left arm, the fringed ends hanging almost to his elbow.\n
On the knot was pinned a golden crane in flight, the symbol of Malkier.\n
* “The Amyrlin Seat wants you, sheepherder. You can’t go like that. Out of that shirt and brush your hair. You look like a haystack.”        \n
*  He jerked open the wardrobe and began pawing through the clothes Rand meant to leave behind.\n
*Rand stood stiff where he was; he felt as though he had been hit in the head with a hammer.\n
* He had expected it, of course, in a way, but he had been sure he would be gone before the summons came. \n 
She knows. Light, I’m sure of it. “What do you mean, she wants me? I’m leaving, Lan. You were right.\n
I am going to the stable right now, get my horse, and leave.”\n
. “You should have done that last night.” The Warder tossed a white silk shirt onto the bed.\n\n
. “No one refuses an audience with the Amyrlin Seat, sheepherder. Not the Lord Captain Commander of the Whitecloaks himself. \n
. Pedron Niall might spend the trip planning how to kill her, if he could do it and get away, but he would come.”        \n
.He turned around with one of the high-collared coats in his hands and held it up. “This one will do.”\n
. Tangled, long-thorned briars climbed each red sleeve in a thick, gold-embroidered line, and ran around each cuff.\n
. Golden herons stood on the collars, which were edged with gold. “The color is right, too.”\n
>>>He seemed to be amused at something, or satisfied. “Come on, sheepherder. Change your shirt. Move.”\n
Reluctantly Rand pulled the coarse wool workman’s shirt over his head. “I’ll feel a fool,” he muttered.\n 
“A silk shirt! I never wore a silk shirt in my life. And I never wore so fancy a coat, either, even on a feastday.”>>>\n
##Light, if Perrin sees me in that. . . . Burn me, after all that fool talk about being a lord,\n 
### if he sees me in that, *he’ll never* listen to reason. \n
“You can’t go before the Amyrlin Seat dressed like a groom fresh out of the stables, sheepherder.\n
Let me see your boots. They’ll do. Well, get on with it, get on with it. You don’t keep the Amyrlin waiting. Wear your sword.”\n
>“My sword!” The silk shirt over his head muffled Rand’s yelp. He yanked it the rest of the way on.\n
“In the women’s apartments? Lan, if I go for an audience with the Amyrlin Seat—the Amyrlin Seat!—wearing a sword, she’ll—”\n
> “Do nothing,” Lan cut him off dryly. “If the Amyrlin is afraid of you—and it’s smarter for you to think she isn’t,\n
## because I don’t know anything that could frighten that woman—it won’t be for a sword. Now remember, you kneel when you go before her.\n
###One knee only, mind,” he added sharply. “You’re not some merchant caught giving short weight. Maybe you had better practice it.”\n
“I know how, I think. I saw how the Queen’s Guards knelt to Queen Morgase.”\n
#### The ghost of a smile touched the Warder’s lips. “Yes, you do it just as they did. That will give them something to think about.”\n
Rand frowned. “Why are you telling me this, Lan? You’re a Warder. You’re acting as if you are on my side.”\n
##### “I am on your side, sheepherder. A little. Enough to help you a bit.”\n
###### The Warder’s face was stone, and sympathetic words sounded strange in that rough voice.\n
“What training you’ve had, I gave you, and I’ll not have you groveling and sniveling.\n
![The Wheel weaves us all into the Pattern as it wills.](www.image.com)\n
You have less freedom _about it than most, but by the Light, *you can still face it on your feet.\n
![](www.image.com)\n
You remember who the Amyrlin Seat is, sheepherder, and you show her proper respect, but you do what I tell you, and you look her in the eye.\n
Well, don\’t stand there gaping. Tuck in your shirt.”\n
Rand    shut   his     mouth and     tucked   in   his    shirt. Remember   who she    is? Burn    me, what   I wouldn’t    give to forget who she is!\n
Lan kept up a running flow of instructions while Rand shrugged into the red coat and buckled on his sword.\n\n\n
    \n
What to say and to whom, and what not to say. What to do, and what not. How to move, even.\n
[He was not sure he could remember it all—most of it sounded odd,](www.link.com\n
{and easy to forget—and he was sure whatever he forgot would be just the thing to make the Aes Sedai angry with him.}(PG_123456789012345\n
{If they aren’t already. If Moiraine told the Amyrlin Seat, who else did she tell?(#F12345)\n
“Lan, why can’t I* just leave *the way I planned? *By the time she* knew I was not _coming, *I’d_ be* a league outside the walls and galloping.”\n
“\\# And she’d \\*have trackers \\_after you \\{before \\[you had gone two. What the Amyrlin wants, sheepherder, she gets.”\n
\\. He adjusted Rand’s sword belt so the heavy buckle was centered. “What I do is the best I can for you. Believe it.”\n
\\> “But why all this? What does it mean? Why do I put my hand over my heart if the Amyrlin Seat stands up?\n
Why refuse anything but water—not that I want to eat a meal with her—then dribble some on the floor and say ‘The land thirsts’?\n
And if she asks how old I am, why tell her how long it is since I was given the sword? I don’t understand half of what you’ve told me.”\n
“Three drops, sheepherder, don’t pour it. You sprinkle three drops only. You can understand later so long as you remember now.\n
Think of it as upholding custom. The Amyrlin will do with you as she must.\n
If you believe you can avoid it, then you believe you can fly to the moon like Lenn.\n
*You can’t escape, but maybe you can hold your own for a while, and perhaps you can keep your pride, at least.*\n
The Light burn me, I am probably wasting my time, but I’ve nothing better to do. Hold still.”\n
_From his pocket the Warder produced a long length of wide, fringed golden cord and tied it around Rand’s left arm in a complicated knot._\n
On the knot he fastened a red-enameled pin, an eagle with its wings spread. “I had that made to give you, and now is as good a time as any.\n
>>>\n
That will make them think.” There was no doubt about it, now. The Warder was smiling.\n
Rand looked down at the pin worriedly. Caldazar. The Red Eagle of Manetheren.\n
“A thorn to the Dark One’s foot,” he murmured, “and a bramble to his hand.” He looked at the Warder.\n
“Manetheren’s long dead and forgotten, Lan. It’s just a name in a book, now. There is only the Two Rivers.\n
Whatever else I am, I’m a shepherd and a farmer. That’s all.”\n
>>>\n
“Well, the sword that could not be broken was shattered in the end, sheepherder, but it fought the Shadow to the last.\n
There is one rule, above all others, for being a man. Whatever comes, face it on your feet. Now, are you ready? The Amyrlin Seat waits.”\n
With a cold knot in the pit of his belly, Rand followed the Warder into the hall.\n

\n> Jordan, Robert. The Great Hunt: Book Two of 'The Wheel of Time' (pp. 127-130).
`

[
  {
    type: 'h1',
    value: 'Lan prepares Rand to meet the Amyrlin Seats'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: 'Lan strode in, '
      },
      {
        type: 'bold',
        value: 'pushing the _door to behind'
      },
      {
        type: 'text',
        value: ' him_ with his boot heel.\n          As usual, he\* wore his'
      },
      {
        type: 'bold',
        value: ' sword over'
      },
      {
        type: 'text',
        value: ' a plain coat of green that was nearly invisible in the woods.  \nThis time, though, he had a wide, golden cord tied high around his left arm, the fringed ends hanging almost to his elbow.\nOn the knot was pinned a golden crane in flight, the symbol of Malkier.'
      }
    ]
  },
  {
    type: 'ul',
    items: [
      {
        type: 'text',
        value: '"The Amyrlin Seat wants you, sheepherder. You can\'t go like that. Out of that shirt and brush your hair. You look like a haystack.'
      },
      {
        type: 'text',
        value: 'He jerked open the wardrobe and began pawing through the clothes Rand meant to leave behind.'
      }
    ]
  },
  {
    type: 'text',
    value: '*Rand stood stiff where he was; he felt as though he had been hit in the head with a hammer.'
  },
  {
    type: 'ul',
    items: [
      {
        type: 'text',
        value: 'He had expected it, of course, in a way, but he had been sure he would be gone before the summons came.'
      }
    ]
  },
  {
    type: 'text',
    value: 'She knows. Light, I\'m sure of it. "What do you mean, she wants me? I\'m leaving, Lan. You were right.\nI am going to the stable right now, get my horse, and leave."'
  },
  {
    type: 'ol',
    items: [
      {
        type: 'text',
        value: '"You should have done that last night." The Warder tossed a white silk shirt onto the bed.'
      },
      {
        type: 'text',
        value: '"No one refuses an audience with the Amyrlin Seat, sheepherder. Not the Lord Captain Commander of the Whitecloaks himself. '
      },
      {
        type: 'text',
        value: 'Padron Niall might spend the trop planning how to kill her, if he could do it and get away, but he would come."'
      }
    ]
  },
  {
    type: 'text',
    value: '.He turned around with one of the high-collard coats in his hands and help it up. "This one will do."'
  },
  {
    type: 'ol',
    items: [
      {
        type: 'text',
        value: 'Tangled, long-thorned briars climbed each red sleeve in a thick, gold-embroidered line, and ran around each cuff.'
      },
      {
        type: 'text',
        value: 'Golden herons stood on the collards, which were edged with gold. "The color is right, too".'
      }
    ]
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: '>>>He seemed to be amused at something, or satisfied. "Come on, sheepherder. Change your shirt. Move."\nReluctantly Rand pulled the coarse wool workman\'s shirt over his head. "I\'ll feel a fool," he muttered.\n"A silk shirt! I never wore a silk shirt in my life. And I never wore so fancy a coat, either, even on a feastday.">>>\n##Light, if Perrin sees me in that. . . . Burn me, after all that fool talk about being a lord,'
      }
    ]
  },
  {
    type: 'h3',
    value: 'if he sees me in that, *he\'ll never* listen to reason.'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: '“You can’t go before the Amyrlin Seat dressed like a groom fresh out of the stables, sheepherder.\nLet me see your boots. They’ll do. Well, get on with it, get on with it. You don’t keep the Amyrlin waiting. Wear your sword.”\n>“My sword!” The silk shirt over his head muffled Rand\’s yelp. He yanked it the rest of the way on.\n“In the women\’s apartments? Lan, if I go for an audience with the Amyrlin Seat—the Amyrlin Seat!—wearing a sword, she\’ll—”\n'
      }
    ]
  },
  {
    type: 'quotes',
    value: '"Do northing," Lan cut him off dryly. "If the Amyrlin is afraid of you-and it\'s smarter for you to think she isn\'t,'
  },
  {
    type: 'h2',
    value: 'because I don\'t know anything that could frighten that woman-it won\'t be for a sword. Now remember, you kneel when you go before her.'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: '###One knee only, mind," he added sharply. "You\'re not some merchant caught giving short weight. Maybe you had better practice it."\n"I know how, I think. I saw how the Queen\'s Guards knelt to Qeen Morgase."'
      }
    ]
  },
  {
    type: 'h4',
    value: 'The ghost of a smile thouched the Warder\'s lips. "Yes, you do it just as they did. That will give them something to think about."'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: 'Rand frowned. "Why are you telling me this, Lan? You\'re a Warder. You\'re acting as if you are on my side."'
      }
    ]
  },
  {
    type: 'h5',
    value: '“I am on your side, sheepherder. A little. Enough to help you a bit.”'
  },
  {
    type: 'h6',
    value: 'The Warder’s face was stone, and sympathetic words sounded strange in that rough voice.'
  },
  {
    type: 'p',
    value: '“What training you’ve had, I gave you, and I’ll not have you groveling and sniveling.'
  },
  {
    type: 'image',
    altText: 'The Wheel weaves us all into the Pattern as it wills.',
    link: 'www.image.com'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: 'You have less freedom _about it than most, but by the Light, *you can still face it on your feet.'
      }
    ]
  },
  {
    type: 'image',
    altText: null,
    link: 'www.image.com'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: 'You remember who the Amyrlin Seat is, sheepherder, and you show her proper respect, but you do what I tell you, and you look her in the eye.\nWell, don\’t stand there gaping. Tuck in your shirt.”\nRand    shut   his     mouth and     tucked   in   his    shirt. Remember   who she    is? Burn    me, what   I wouldn’t    give to forget who she is!\nLan kept up a running flow of instructions while Rand shrugged into the red coat and buckled on his sword.\n\n\n    \nWhat to say and to whom, and what not to say. What to do, and what not. How to move, even.\n[He was not sure he could remember it all—most of it sounded odd,](www.link.com\n{and easy to forget—and he was sure whatever he forgot would be just the thing to make the Aes Sedai angry with him.}(PG_123456789012345\n{If they aren’t already. If Moiraine told the Amyrlin Seat, who else did she tell?(#F12345)\n“Lan, why can’t I'
      },
      {
        type: 'bold',
        value: ' just leave ',
      },
      {
        type: 'text',
        value: 'the way I planned? '
      },
      {
        type: 'bold',
        value: 'By the time she'
      },
      {
        type: 'text',
        value: ' knew I was not '
      },
      {
        type: 'italics',
        value: 'coming, * I\'d'
      },
      {
        type: 'text',
        value: ' be* a league outside the walls and galloping."\n“\# And she’d \*have trackers \_after you \{before \[you had gone two. What the Amyrlin wants, sheepherder, she gets.”\n\. He adjusted Rand’s sword belt so the heavy buckle was centered. “What I do is the best I can for you. Believe it.”\n\> “But why all this? What does it mean? Why do I put my hand over my heart if the Amyrlin Seat stands up?\nWhy refuse anything but water—not that I want to eat a meal with her—then dribble some on the floor and say ‘The land thirsts’?\nAnd if she asks how old I am, why tell her how long it is since I was given the sword? I don’t understand half of what you’ve told me.”\n“Three drops, sheepherder, don’t pour it. You sprinkle three drops only. You can understand later so long as you remember now.\nThink of it as upholding custom. The Amyrlin will do with you as she must.'
      },
      {
        type: 'bold',
        value: 'You can’t escape, but maybe you can hold your own for a while, and perhaps you can keep your pride, at least.'
      },
      {
        type: 'text',
        value: 'The Light burn me, I am probably wasting my time, but I’ve nothing better to do. Hold still.”'
      },
      {
        type: 'italics',
        value: 'From his pocket the Warder produced a long length of wide, fringed golden cord and tied it around Rand’s left arm in a complicated knot.'
      },
      {
        type: 'text',
        value: 'On the knot he fastened a red-enameled pin, an eagle with its wings spread. “I had that made to give you, and now is as good a time as any.'
      }
    ]
  },
  {
    type: 'quotes',
    value: 'That will make them think.” There was no doubt about it, now. The Warder was smiling.\nRand looked down at the pin worriedly. Caldazar. The Red Eagle of Manetheren. “A thorn to the Dark One’s foot,” he murmured, “and a bramble to his hand.” He looked at the Warder.\n“Manetheren’s long dead and forgotten, Lan. It’s just a name in a book, now. There is only the Two Rivers.\nWhatever else I am, I’m a shepherd and a farmer. That’s all.”'
  },
  {
    type: 'p',
    partitions: [
      {
        type: 'text',
        value: '“Well, the sword that could not be broken was shattered in the end, sheepherder, but it fought the Shadow to the last.\nThere is one rule, above all others, for being a man. Whatever comes, face it on your feet. Now, are you ready? The Amyrlin Seat waits.”\nWith a cold knot in the pit of his belly, Rand followed the Warder into the hall.'
      }
    ]
  },
  {
    type: 'quotes',
    value: 'Jordan, Robert. The Great Hunt: Book Two of \'The Wheel of Time\' (pp. 127-130).'
  }
]