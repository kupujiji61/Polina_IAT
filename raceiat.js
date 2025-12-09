define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : "Башкирский", //Will appear in the data.
            title : {
                media : {word : "Башкирский"}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ // башкирские слова
            { word: 'Башкортостан' },
            { word: 'Сабантуй' },
            { word: 'Бешбармак' },
            { word: 'Урал-Батыр' },
            { word: 'Уфа' },
            { word: 'Агидель' },
            { word: 'Бешмет' },
            { word: 'Курай' }
        ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 : {
            name : "Русский", //Will appear in the data.
            title : {
                media : {word : "Русский"}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ // русские слова
            { word: 'Россия' },
            { word: 'Масленица' },
            { word: 'Пельмени' },
            { word: 'Илья Муромец' },
            { word: 'Москва' },
            { word: 'Енисей' },
            { word: 'Кокошник' },
            { word: 'Балалайка' }
        ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
        
            attribute1 : {
                name : 'Горы',
                title : {
                    media : { word : 'Горы' },
                    css   : { color:'#0000FF','font-size':'1.8em' },
                    height: 4
                },
                stimulusMedia : [
                    { word: 'гора 1' },
                    { word: 'гора 2' },
                    { word: 'гора 3' },
                    { word: 'гора 4' },
                    { word: 'гора 5' },
                    { word: 'гора 6' },
                    { word: 'гора 7' },
                    { word: 'гора 8' }
                ],
                stimulusCss : { color:'#0000FF','font-size':'2.3em' }
            },

            // Атрибут 2: Болота (пока как слова)
            attribute2 : {
                name : 'Болота',
                title : {
                    media : { word : 'Болота' },
                    css   : { color:'#0000FF','font-size':'1.8em' },
                    height: 4
                },
                stimulusMedia : [
                    { word: 'болото 1' },
                    { word: 'болото 2' },
                    { word: 'болото 3' },
                    { word: 'болото 4' },
                    { word: 'болото 5' },
                    { word: 'болото 6' },
                    { word: 'болото 7' },
                    { word: 'болото 8' }
                ],
                stimulusCss : { color:'#0000FF','font-size':'2.3em' }
            },

        
        base_url : {//Where are your images at?
            image : ""
        },
        isTouch : global.$isTouch
    });
});

