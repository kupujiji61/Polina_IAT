define(['questAPI'], function (Quest) {
    let API = new Quest();

    /********* Страница *********/
    API.addPagesSet('resultsPage', {
        noSubmit: false,
        header: 'Результаты теста скрытых ассоциаций',
        decline: false,
        autoFocus: true,
        progressBar: 'Страница <%= pagesMeta.number %> из 1',
        submitText: 'Далее'
    });

    /********* Вопрос с результатами *********/
    API.addQuestionsSet('resultsInfo', {
        type: 'info',
        name: 'iat_results_info',
        autoSubmit: false,
        decline: false,

        stem: [
            '<% ',
            '  var r = {};',
            '  if (typeof global !== "undefined" && global && global.raceiat) {',
            '      r = global.raceiat;',
            '  }',

            '  var dRaw = null;',
            '  if (r.d !== undefined && r.d !== null && r.d !== "") {',
            '      dRaw = r.d;',
            '  }',

            '  var dNum = Number(dRaw);',
            '  var hasD = dRaw !== null && !isNaN(dNum);',
            '  var absD = hasD ? Math.abs(dNum) : null;',
            '  var fb = r.feedback || "";',

            '  var strengthText = "";',
            '  var directionText = "";',

            '  if (!hasD) {',
            '      strengthText = "не рассчитана";',
            '      directionText = "не рассчитано";',
            '      fb = fb || "Недостаточно попыток для выявления результатов.";',
            '  } else {',
            '      if (absD < 0.15) {',
            '          strengthText = "нет выраженного эффекта / минимальная ассоциация";',
            '      } else if (absD < 0.35) {',
            '          strengthText = "слабая ассоциация";',
            '      } else if (absD < 0.65) {',
            '          strengthText = "умеренная ассоциация";',
            '      } else {',
            '          strengthText = "сильная ассоциация";',
            '      }',

            '      if (dNum > 0) {',
            '          directionText = "более быстрая реакция при сочетании Полины с положительными словами";',
            '      } else if (dNum < 0) {',
            '          directionText = "более быстрая реакция при альтернативных сочетаниях";',
            '      } else {',
            '          directionText = "заметного направления эффекта не выявлено";',
            '      }',

            '      if (!fb) {',
            '          fb = strengthText + ". " + directionText + ".";',
            '      }',
            '  }',
            '%>',

            '<div class="well" style="margin-bottom: 24px;">',
            '  <h2>Ваш результат</h2>',

            '  <p><b>D-score:</b> <code><%= hasD ? dNum.toFixed(2) : "не рассчитан" %></code></p>',

            '  <p><b>Сила ассоциации:</b><br>',
            '  <%= strengthText %></p>',

            '  <p><b>Направление результата:</b><br>',
            '  <%= directionText %></p>',

            '  <p><b>Интерпретация:</b><br>',
            '  <%= fb %></p>',

            '  <p style="font-size: 13px; color: #666;">',
            '      Важно: результат отражает скорость реакций в рамках данного прохождения теста и не является психологической диагностикой.',
            '  </p>',
            '</div>',

            '<hr>',

            '<p class="lead"><b>Как интерпретировать силу D-score?</b></p>',

            '<table class="table table-bordered" style="max-width: 760px;">',
            '  <tr>',
            '      <th>Абсолютное значение D-score</th>',
            '      <th>Интерпретация</th>',
            '  </tr>',
            '  <tr>',
            '      <td><code>|D| &lt; 0.15</code></td>',
            '      <td>нет выраженного эффекта / минимальная ассоциация</td>',
            '  </tr>',
            '  <tr>',
            '      <td><code>0.15 ≤ |D| &lt; 0.35</code></td>',
            '      <td>слабая ассоциация</td>',
            '  </tr>',
            '  <tr>',
            '      <td><code>0.35 ≤ |D| &lt; 0.65</code></td>',
            '      <td>умеренная ассоциация</td>',
            '  </tr>',
            '  <tr>',
            '      <td><code>|D| ≥ 0.65</code></td>',
            '      <td>сильная ассоциация</td>',
            '  </tr>',
            '</table>',

            '<p style="font-size: 14px; color: #666;">',
            'Знак D-score показывает направление эффекта, а модуль значения показывает его силу. ',
            'То есть положительное и отрицательное значение могут быть одинаковыми по силе, но разными по направлению.',
            '</p>',

            '<hr>',

            '<p class="lead"><b>Что измеряет этот тест?</b></p>',

            '<p>Тест имплицитных ассоциаций (Implicit Association Test, IAT) измеряет скорость, с которой человек ',
            'соотносит разные категории, например Полину и «хорошее», со словами и картинками.</p>',

            '<p>Предполагается, что чем быстрее вы реагируете, когда вместе появляются «согласующиеся» для вас ',
            'сочетания, например Полина + приятные слова, тем сильнее автоматическая связь между ними.</p>',

            '<p>Положительное значение D-score означает более быструю реакцию при сочетании Полины с «хорошим» ',
            'по сравнению с альтернативными сочетаниями. Отрицательное значение — наоборот.</p>',

            '<p>Чем больше по модулю значение D-score, тем сильнее выражена ассоциация. Значения, близкие к 0, ',
            'показывают, что заметного перекоса в скорости реакций между сравниваемыми парами нет.</p>'
        ].join('')
    });

    /********* Последовательность *********/
    API.addSequence([
        {
            inherit: 'resultsPage',
            questions: { inherit: 'resultsInfo' }
        }
    ]);

    return API.script;
});
