define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, //Change to true if you don't want to show the submit button.
        header: 'Вопросник',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Отказ от ответа', 
        autoFocus:true, 
        progressBar:  'Страница <%= pagesMeta.number %> из 3'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Выберите подходящий вариант ответа, или нажмите \'Decline\'' 
                : 'Выберите подходящий вариант ответа, или нажмите \'Decline to Answer\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'Для быстрого ответа нажмите на подходящий вариант дважды.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });
	
    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown',
        autoSubmit:false
    });
	
    API.addQuestionsSet('therm',{
        inherit: 'basicSelect',
        answers: [
            {text:'10 - Чрезвычайно тёплое', value:10},
            {text:'9 - Очень теплое', value:9},
            {text:'8 - Умеренно теплое', value:8},
            {text:'7 - Скорее теплое', value:7},
            {text:'6 - Слегка теплое', value:6},
            {text:'5 - Ни теплое, ни холодное', value:5},
            {text:'4 - Слегка холодное', value:4},
            {text:'3 - Скорее холодное', value:3},
            {text:'2 - Умеренно холодное', value:2},
            {text:'1 - Очень холодное', value:1},
            {text:'0 - Чрезвычайно холодное', value:0}
        ]
    });

	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('attributes7',{
        inherit : 'basicSelect',
        name: 'attributes7',
        stem: 'Какое утверждение лучше всего описывает Вас?',
        answers: [
            {text:'Я значительно предпочитаю <%= global.whiteLabels %> по сравнению <%= global.blackLabels %>.',value:7},
            {text:'Я в умеренной степени предпочитаю <%= global.whiteLabels %> по сравнению <%= global.blackLabels %>.',value:6},
            {text:'Я слегка предпочитаю <%= global.whiteLabels %> по сравнению <%= global.blackLabels %>.',value:5},
            {text:'Я в равной степени отношусь к <%= global.whiteLabels %> и <%= global.blackLabels %>.',value:4},
            {text:'Я слегка предпочитаю <%= global.blackLabels %> по сравнению <%= global.whiteLabels %>.',value:3},
            {text:'Я в умеренной степени предпочитаю <%= global.blackLabels %> по сравнению <%= global.whiteLabels %>.',value:2},
            {text:'Я значительно предпочитаю <%= global.blackLabels %> по сравнению <%= global.whiteLabels %>.',value:1}
        ]
    });
	
    API.addQuestionsSet('thermBash',{
        inherit : 'therm',
        name: 'Tblack_0to10',
        stem: 'Насколько теплые или холодные чувства Вы испытываете по отношению к <b><%= global.blackLabels %></b>?'
    });

    API.addQuestionsSet('thermRuss',{
        inherit : 'therm',
        name: 'Twhite_0to10',
        stem: 'Насколько теплые или холодные чувства Вы испытываете по отношению к <b><%= global.whiteLabels %></b>?'
    });

    API.addSequence([
        {
            mixer : 'random', 
            data : [
                {
                    mixer : 'random', 
                    wrapper:true, 
                    data : [
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermBash'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermRuss'}							
                        }
                    ]
                },
                {
                    inherit:'basicPage', 
                    questions: {inherit:'attributes7'}
                }
            ]
        }
    ]);

    return API.script;
});
