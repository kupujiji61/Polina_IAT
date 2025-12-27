define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, // показываем кнопку "Далее"
        header: 'Вопросник',
        decline: false,
        declineText: isTouch ? 'Decline' : 'Отказ от ответа', 
        autoFocus:true, 
        progressBar:  'Страница <%= pagesMeta.number %> из 6',
		submitText: 'Далее'
    });
	
    /**
	* Question prototypes
	*/
	API.addQuestionsSet('basicQ',{
		decline: 'false',
		required : true,
		errorMsg: {
			required: isTouch
				? "Выберите подходящий вариант ответа"
				: "Выберите подходящий вариант ответа"
		},
		autoSubmit: 'true',
		numericValues: 'true',
		help: false,
		helpText: ''
	});
	
	API.addQuestionsSet('basicSelect',{
		inherit: 'basicQ',
		type: 'selectOne'
	});
	
    // Базовый прототип для открытых вопросов
    API.addQuestionsSet('basicOpen',{
        inherit: 'basicQ',
        type: 'text',
        autoSubmit:false,
        numericValues:false
    });

    /************* КОНКРЕТНЫЕ ВОПРОСЫ *************/

    // 1. Пол
    API.addQuestionsSet('gender',{
        inherit : 'basicSelect',
        name: 'gender',
        stem: 'Ваш пол:',
        answers: [
            {text:'Мужской', value:1},
            {text:'Женский', value:2}
        ]
    });

    // 2. Возраст
    API.addQuestionsSet('age',{
        inherit : 'basicOpen',
        name: 'age',
        stem: 'Укажите, пожалуйста, Ваш возраст (полных лет):'
    });

    // 3. Год знакомства с Полиной
    API.addQuestionsSet('yearMetPolina',{
        inherit : 'basicOpen',
        name: 'year_met_polina',
        stem: 'В каком году Вы познакомились с Полиной? Пожалуйста, укажите только год (например, 2019).'
    });

    // 4. Тип отношений с Полиной
    API.addQuestionsSet('relationPolina',{
        inherit : 'basicSelect',
        name: 'relation_polina',
        stem: 'Выберите одно слово, которое лучше всего описывает Ваши отношения с Полиной:',
        answers: [
            {text:'Родственники', value:1},
            {text:'Друзья', value:2},
            {text:'Приятели', value:3},
            {text:'Знакомые', value:4},
            {text:'Коллеги / одногруппники', value:5},
            {text:'Братья и сёстры по вере', value:6},
			{text:'Кнопка для Полины', value:7}
        ]
    });

    // Прототип «термометра» (оценка тепла/холода чувств)
    API.addQuestionsSet('therm',{
        inherit : 'basicSelect',
        answers: [
            {text:'10 - Чрезвычайно тёплое', value:10},
            {text:'9 - Очень тёплое', value:9},
            {text:'8 - Умеренно тёплое', value:8},
            {text:'7 - Скорее тёплое', value:7},
            {text:'6 - Слегка тёплое', value:6},
            {text:'5 - Ни тёплое, ни холодное', value:5},
            {text:'4 - Слегка холодное', value:4},
            {text:'3 - Скорее холодное', value:3},
            {text:'2 - Умеренно холодное', value:2},
            {text:'1 - Очень холодное', value:1},
            {text:'0 - Чрезвычайно холодное', value:0}
        ]
    });

    // 5. Теплота чувств к Полине
    API.addQuestionsSet('thermPolina',{
        inherit : 'therm',
        name: 'therm_polina',
        stem: 'Насколько холодные или тёплые чувства Вы испытываете по отношению к Полине?'
    });

    // 6. Теплота чувств к людям в целом
    API.addQuestionsSet('thermPeople',{
        inherit : 'therm',
        name: 'therm_people',
        stem: 'Насколько тёплые или холодные чувства Вы испытываете по отношению к людям в целом?'
    });

    /************* ПОСЛЕДОВАТЕЛЬНОСТЬ СТРАНИЦ *************/

    API.addSequence([
        { // 1. Пол
            inherit:'basicPage',
            questions: {inherit:'gender'}
        },
        { // 2. Возраст
            inherit:'basicPage',
            questions: {inherit:'age'}
        },
        { // 3. Год знакомства
            inherit:'basicPage',
            questions: {inherit:'yearMetPolina'}
        },
        { // 4. Тип отношений
            inherit:'basicPage',
            questions: {inherit:'relationPolina'}
        },
        { // 5. Теплота чувств к Полине
            inherit:'basicPage',
            questions: {inherit:'thermPolina'}
        },
        { // 6. Теплота чувств к людям в целом
            inherit:'basicPage',
            questions: {inherit:'thermPeople'}
        }
    ]);

    return API.script;
});
