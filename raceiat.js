define(['pipAPI','./iat10_ru.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1 : {
                name : 'Хорошее',
                title : {
                    media : { word : 'Хорошее' },
                    css   : { color:'#31940F','font-size':'1.8em' },
                    height: 4
                },
                stimulusMedia : [
                    { word: 'Добро' },
                    { word: 'Забота' },
                    { word: 'Радость' },
                    { word: 'Счастье' },
                    { word: 'Умиротворение' },
                    { word: 'Благо' },
                    { word: 'Любовь' }
                ],
                stimulusCss : { color:'#31940F','font-size':'2.3em' }
            },

            // Таргет 2: Русский
            category2 : {
                name : 'Плохое',
                title : {
                    media : { word : 'Плохое' },
                    css   : { color:'#31940F','font-size':'1.8em' },
                    height: 4
                },
                stimulusMedia : [
                    { word: 'Зло' },
                    { word: 'Безразличие' },
                    { word: 'Грусть' },
                    { word: 'Тоска' },
                    { word: 'Беспокойство' },
                    { word: 'Грех' },
                    { word: 'Ненависть' }
                ],
                stimulusCss : { color:'#31940F','font-size':'2.3em' }
            },

            // ───────── АТРИБУТЫ: ГОРЫ / БОЛОТА (КАРТИНКИ) ─────────

            attribute1 : { // ГОРЫ
                name : 'Полина',
                title : {
                    media : { word : 'Полина' },
                    css   : { color:'#0000FF','font-size':'1.8em' },
                    height: 4
                },
                stimulusMedia : [
                    { image: 'pf1_nc.jpg' },
                    { image: 'pf2_nc.jpg' },
                    { image: 'pf3_nc.jpg' },
                    { image: 'pf4_nc.jpg' },
                    { image: 'pf5_nc.jpg' },
                    { image: 'pf6_nc.jpg' }
                ],
                // CSS тут влияет в основном на размер рамки / подписи,
                // сами картинки по размеру задаются их файлами.
                stimulusCss : { color:'#0000FF','font-size':'2.3em' }
            },

            attribute2 : { // БОЛОТА
                name : 'Не-Полина',
                title : {
                    media : { word : 'Не-Полина' },
                    css   : { color:'#0000FF','font-size':'1.8em' },
                    height: 4
                },
                stimulusMedia : [
                    { image: 'wf1_nc.jpg' },
                    { image: 'wf2_nc.jpg' },
                    { image: 'wf3_nc.jpg' },
                    { image: 'wf4_nc.jpg' },
                    { image: 'wf5_nc.jpg' },
                    { image: 'wf6_nc.jpg' }
                ],
                stimulusCss : { color:'#0000FF','font-size':'2.3em' }
            },
        
        base_url : {//Where are your images at?
            image : global.baseURL
        },
        isTouch : global.$isTouch
    });
});

