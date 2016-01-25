if (typeof T === 'undefined') require('../setup');

(function () {
    T('log');

    function t(n, base, expected, sd, rm) {
        Decimal.precision = sd;
        Decimal.rounding = rm;
        T.assertEqual(expected, new Decimal(n).log(base).valueOf());
        //T.assertEqual(expected, Decimal.log(n, base).valueOf());
    }

    Decimal.config({
        precision: 40,
        rounding: 4,
        toExpNeg: -9e15,
        toExpPos: 9e15,
        minE: -9e15,
        maxE: 9e15
    });

    /*
     Example of a log that will fail.
     It results in 2.6 due to having 15 or more zeros from the first rounding digit.
     t('4503599627370502', '1048576', '2.7', 2, 2);    // 2.60000000000000009610279511444746656225...
     */

    t('0', '10', '-Infinity', 40, 4);
    t('-0', '10', '-Infinity', 40, 4);
    t('1', '10', '0', 40, 4);
    t('-1', '10', 'NaN', 40, 4);
    t('Infinity', '10', 'Infinity', 40, 4);
    t('Infinity', '0', 'NaN', 40, 4);
    t('-Infinity', 'Infinity', 'NaN', 40, 4);
    t('NaN', '10', 'NaN', 40, 4);

    t('1', '0', 'NaN', 40, 4);                     // Math.log(1)  / Math.log(0)  == -0
    t('10', '0', 'NaN', 40, 4);                    // Math.log(10) / Math.log(0)  == -0
    t('10', '-0', 'NaN', 40, 4);                   // Math.log(10) / Math.log(-0) == -0
    t('10', '1', 'NaN', 40, 4);                    // Math.log(10) / Math.log(1)  == Infinity
    t('10', '-1', 'NaN', 40, 4);
    t('10', 'Infinity', 'NaN', 40, 4);             // Math.log(10) / Math.log(Infinity) == 0
    t('10', '-Infinity', 'NaN', 40, 4);
    t('10', 'NaN', 'NaN', 40, 4);
    t('-1', '-1', 'NaN', 40, 4);
    t('0', '0', 'NaN', 40, 4);

    t('7625597484987', '59049', '2.7', 2, 5);
    t('839756321.64088511', '28', '6.16667503', 9, 0);
    t('94143178827', '3486784401', '1.15', 3, 0);
    t('243', '9', '3', 1, 4);
    t('512', '16', '2.25', 7, 0);
    t('512', '16', '2.25', 7, 2);
    t('512', '16', '2.2', 2, 5);
    t('512', '16', '2.2', 2, 6);

    t('16', '2', '4', 7, 0);
    t('16', '2', '4', 7, 2);
    t('243', '3', '5', 7, 1);
    t('243', '9', '2.5', 7, 1);
    t('243', '3', '5', 7, 3);
    t('243', '9', '2.5', 7, 3);
    t('32', '4', '2.5', 7, 0);
    t('32', '4', '2.5', 7, 2);
    t('4', '2', '2', 1, 2);
    t('8', '2', '3', 2, 0);
    t('16', '2', '4', 2, 0);
    t('32', '2', '5', 3, 0);
    t('64', '2', '6', 3, 0);
    t('64', '2', '6', 2, 0);
    t('64', '2', '6', 1, 2);
    t('128', '2', '7', 1, 0);
    t('256', '2', '8', 1, 2);
    t('1024', '2', '10', 2, 0);
    t('1024', '2', '10', 10, 0);
    t('16384', '2', '14', 2, 0);
    t('16384', '2', '14', 10, 0);
    t('243', '3', '5', 7, 4);
    t('243', '9', '2.5', 7, 4);
    t('243', '3', '5', 7, 4);
    t('243', '9', '2.5', 7, 4);
    t('16', '2', '4', 7, 4);
    t('32', '4', '2.5', 7, 4);
    t('16', '2', '4', 7, 4);
    t('32', '4', '2.5', 7, 4);

    t('1.2589254117', 10, '0.1', 1, 2);
    t('1.023292992', 10, '0.01', 1, 2);
    t('1.258925411794167210423954106395800606', 10, '0.1', 1, 4);
    t('1.25892541179416721', 10, '0.1', 1, 0);
    t('1.258925411', 10, '0.1', 1, 5);
    t('1.258925411794167210423954', 10, '0.1', 1, 4);

    /*
     6.166675020000903537297764507632802193308677149
     28^6.16667502 = 839756321.6383567959704282429971526703012698
     28^6.16667503 = 839756349.6207552863005150010387178739013142
     */
    t('839756321.64088511', '28', '6.16667503', 9, 0);
    t('576306512.96177', '985212731.27158', '0.9742', 4, 2);
    t('97.65625', '6.25', '2.5', 3, 0);
    t('223677472.0384754303304727631735', '26', '5.900904252190486450814', 22, 5);
    t('2063000845.3020737243910803079', '35', '6.0324410183892767982149330415', 29, 0);
    t('302381977.956021650184952836276441035025875682714942', '2623', '2.4805663226398755020289647999', 29, 6);
    t('456870693.58', '238920772.66', '1.0336035877093034523', 21, 4);
    t('16', '2', '4', 10, 4);
    t('32', '4', '2.5', 10, 1);
    t('316.2277660168379331998893544432645719585553021316022642247511089459022980600999502961482777894980004', '10', '2.49999999999999999999', 21, 1);

    // Base 10 therefore the following tests pass despite 15 or more zeros or nines as the rounding digits.

    // 4.0000000000000000000173...
    t('10000.0000000000000004', 10, '4.01', 3, 2);

    // 4.00000000000000000173...
    t('10000.00000000000004', 10, '4.01', 3, 2);

    // 2.000000000000000000000004342944...
    t('100.000000000000000000001', 10, '2.1', 2, 0);

    // 2.00000000000000004342944...
    t('100.00000000000001', 10, '2.1', 2, 0);

    // 4.9999999999999999999960913...
    t('99999.9999999999999991', 10, '4.999', 4, 1);

    // 0.09360000000000000000000000020197...
    t('124050.923004222533485495840', 10, '5.093601', 7, 2);

    // 0.09999999999999999999999999999972381...
    // 10^0.1 = 1.258925411794167210423954106395800606093617409466...
    t('1.258925411794167210423954106395', 10, '0.09999', 4, 1);

    // 8.959609629999999999999999999999431251938064
    t('911191437.48166728043529900000', 10, '8.959609629999999999999999', 25, 3);

    // 2.4038746000000000000000000000000268051243...
    t('253.4396732554691740503010363220', 10, '2.403874600001', 13, 2);

    // 3.391702100000000000000000000000000025534271040...
    t('2464.348361986885121671329250344224', 10, '3.3917021', 18, 1);
    t('2464.348361986885121671329250344224', 10, '3.39170210000000001', 18, 0);

    // 4.0000000000000000173...
    t('10000.0000000000004', 10, '4.01', 3, 2);

    // 4.00000000000000173...
    t('10000.00000000004', 10, '4.01', 3, 2);

    // 2.0000000000000004342944...
    t('100.0000000000001', 10, '2.1', 2, 0);

    // 4.99999999999999999960913...
    t('99999.99999999999991', 10, '4.999', 4, 1);

    // 4.9999999999999999960913...
    t('99999.9999999999991', 10, '4.999', 4, 1);

    // 4.99999999999960913...
    t('99999.99999991', 10, '4.999', 4, 1);

    t('6.626757835589191227753975149737456562020794782', 10, '0.8213011002743699999999999999999999999999999', 43, 1);
    t('4.20732041199815040736678139715312481859825562145776045079', 10, '0.6240055873352599999999999999999999999999999999999999', 52, 3);
    t('64513410281785809574142282220919135969.8537876292904158501590880', 10, '37.80964999999999999999', 22, 1);
    t('33.51145738694771448172942314968136067036971739113975569076629', 10, '1.5251933153717162999999999999999999999999999999999999999', 56, 3);
    t('10232.9299228075413096627', 10, '4.009999999999999', 16, 1);
    t('1.258925411794167210423954106395', 10, '0.099999999999999999999999999999723814', 35, 0);
    t('1.29891281037500', 10, '0.11357', 5, 1);
    t('16.399137225681149762104868844', 10, '1.21482099999999999999999', 24, 3);
    t('0.01', 10, '-2', 17, 3);
    t('0.0000000001', 10, '-10', 4, 2);
    t('0.00001', 10, '-5', 35, 3);
    t('0.00000001', 10, '-8', 24, 2);
    t('0.0000100000000000010000005060000000000800030000000400908', 10, '-4.99', 3, 1);

    t('94143178827', '3486784401', '1.15', 3, 0);
    t('15625', '3125', '1.2', 2, 3);
    t('3', '3486784401', '0.05', 1, 8);
    t('268435456', '1048576', '1.4', 2, 3);
    t('25', '9765625', '0.2', 1, 7);
    t('524288', '256', '2.375', 4, 8);
    t('177147', '81', '2.75', 3, 5);
    t('531441', '59049', '1.2', 2, 8);
    t('387420489', '59049', '1.8', 2, 6);
    t('16384', '65536', '0.875', 3, 6);
    t('31381059609', '59049', '2.2', 2, 5);
    t('8589934592', '65536', '2.0625', 5, 3);
    t('33554432', '256', '3.125', 4, 3);
    t('4503599627370496', '65536', '3.25', 3, 3);
    t('68630377364883', '59049', '2.9', 2, 3);
    t('68630377364883', '847288609443', '1.16', 3, 5);
    t('16', '1125899906842624', '0.08', 1, 2);
    t('3814697265625', '390625', '2.25', 3, 8);
    t('8', '4294967296', '0.09375', 4, 1);
    t('22876792454961', '59049', '2.8', 2, 2);
    t('32', '33554432', '0.2', 1, 2);
    t('16', '1125899906842624', '0.08', 1, 2);
    t('16777216', '1024', '2.4', 2, 2);
    t('31381059609', '3486784401', '1.1', 2, 4);
    t('131072', '16', '4.25', 3, 7);
    t('17179869184', '65536', '2.125', 4, 2);
    t('131072', '32', '3.4', 2, 5);
    t('31381059609', '6561', '2.75', 3, 4);
    t('1162261467', '81', '4.75', 3, 2);
    t('5', '152587890625', '0.0625', 3, 8);
    t('4', '1024', '0.2', 1, 2);
    t('268435456', '1048576', '1.4', 2, 8);

    t('456870693.58', '238920772.66', '1.0336035877093034523', 21, 4);
    t('575547956.8582', '824684975.3545', '0.98248076', 8, 4);
    t('82275648.874341603', '959190115.624130088', '0.88124641544168894893181429200832363', 35, 4);
    t('74257343.4', '743703514.4', '0.88720377341908842250463392057841865999040289364224', 50, 4);
    t('617556576.22', '1390349767.37', '0.96145220002205342499', 20, 4);
    t('385659206.402956', '306197094.245356', '1.0118079926535367225661814147003237994862', 41, 4);
    t('1739848017', '139741504', '1.134455757605027173760473871049514546484', 40, 4);
    t('684413372.332', '749444030.62', '0.99556', 5, 4);
    t('1276559129.76358811', '1814329747.19301894', '0.983510102095361604388', 21, 4);
    t('470873324.56', '770017206.95', '0.975963952980122531477453931545461086248352', 42, 4);
    t('142843622.855', '188030025.676', '0.985573716314165', 15, 4);
    t('208762187.506204', '15673510.715596', '1.1563', 5, 4);
    t('1066260899.1963', '954219284.761', '1.005369396783858165862954752482856604', 37, 4);
    t('98615189.15', '75483684.05', '1.0147363402964731399253', 23, 4);
    t('134306349.93018997', '262971762.95484809', '0.965342550919082621945239', 24, 4);
    t('964681161.089224', '1910911588.814815', '0.9680153968863558918522522557796148', 34, 4);
    t('9303669', '272208139', '0.8262', 4, 4);
    t('388804210', '196979048', '1.035603565223696855965', 22, 4);
    t('699589959.2322617', '574032511.7854473', '1.0098079347111332288609', 23, 4);
    t('100575245.36', '172874206.82', '0.971443699412905370317336892965778', 33, 4);
    t('188632711.8541175', '1056627336.0975408', '0.9170754305183363941127042', 25, 4);
    t('267522787.94', '528716571.79', '0.966083390988836341228896', 24, 4);
    t('145509306.43395', '472783713.04935', '0.941003844701466585568051857', 28, 4);
    t('991525965.6381098', '609527830.0476525', '1.024053580832128', 16, 4);
    t('1023653880.6218838', '953120602.1428507', '1.00345303146', 13, 4);
    t('55755796.19', '1330531177.01', '0.84899920538009273', 17, 4);
    t('334096229.1342503', '563056758.6770503', '0.97409528', 8, 4);
    t('9635164', '231514430', '0.834932623823994616103829175346875687708', 39, 4);
    t('131654133.157309973', '115412751.259558256', '1.007092396906741330059871530698890891053443', 43, 4);

    // base 2
    t('26880.2432276408875624', 2, '14.7142585720457255', 19, 3);
    t('18216.8140929585641372', 2, '14.152983050314836771855701', 26, 1);
    t('28062.73494235358182', 2, '14.776367997755111083362495', 26, 0);
    t('7408.82842447993', 2, '12.8550297084583087071', 21, 1);
    t('395.067', 2, '8.62595353', 9, 3);
    t('27442.6587462411378', 2, '14.74414', 7, 0);
    t('29259.23925137426', 2, '14.83660463902', 13, 1);
    t('31809.09321', 2, '14.95715162', 10, 3);
    t('21088.306138691278', 2, '14.3641556', 9, 4);
    t('21417.99322', 2, '14.386535691235055367', 20, 4);
    t('30749.008158228314845157', 2, '14.9', 3, 3);
    t('11701.5', 2, '13.51440585840535244680127', 25, 0);
    t('31737.6741', 2, '14.954', 5, 2);
    t('1688.88816886', 2, '10.7218580867075137099751634', 27, 3);
    t('31553.4', 2, '14.945507849063278420302384', 26, 1);
    t('28215.19', 2, '14.7841844442', 12, 3);
    t('6080.97', 2, '12.57008575', 10, 1);
    t('575.881932366571406', 2, '9.16962924962079798', 18, 1);
    t('4573.55560689675', 2, '12.1591004766309775332', 21, 1);
    t('24202.85989198517539', 2, '15', 2, 4);
    t('18334.9', 2, '14.16230477704721387108079127958', 31, 4);
    t('20179.623017', 2, '14.4', 3, 0);
    t('8607.97004888426002071', 2, '13.07145734276093159769689946319', 31, 1);
    t('27231.463745', 2, '14.732986911725376996874804951679', 32, 3);
    t('24325.08', 2, '14.57015693', 10, 0);
    t('826.3541073', 2, '9.69', 3, 3);
    t('6877.51851488', 2, '12.7476724030697', 15, 3);
    t('13510.031', 2, '13.7217433646123774736072103937', 30, 4);
    t('559.1647711259', 2, '9.12712965971023632', 18, 1);
    t('1262.018796786493279', 2, '10.30151768', 10, 3);
    t('31897.9889', 2, '14.9611778475691091525075', 24, 1);
    t('24187.818942357666924548', 2, '14.561', 5, 3);
    t('7233.846688339241', 2, '12.820547306996872048936910678432', 32, 3);
    t('10162.3041', 2, '13.31093992111', 13, 4);
    t('9091.859714971663525', 2, '13.1503597085807068872335', 24, 1);
    t('16205.492', 2, '13.984195201', 11, 3);
    t('17578.3501161869916711', 2, '14.101512046680555', 18, 3);
    t('5661.58', 2, '12.466989012642603919950322048', 29, 1);

    T.stop();
})();
