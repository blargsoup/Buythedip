export function loadHistory(){

    return generateHistoricalData();

}

function generateHistoricalData(){

    const data=[];

    let qqqVal=51.0;
    let spyVal=125.0;

    let tqqqSynVal=10.0;
    let tqqqActualVal=0.40;

    const startDate=new Date(1999,0,1);

    const totalWeeks=1435;

    for(let i=0;i<totalWeeks;i++){

        const currentDate=new Date(
            startDate.getTime()+i*7*24*60*60*1000
        );

        const year=currentDate.getFullYear();

        let beta=0.0018;

        let noise=
            Math.sin(i*.10)*0.016+
            Math.cos(i*.23)*0.009;

        if(year>=2000&&year<=2002){

            beta=-0.011;
            noise*=1.6;

        }

        else if(year>=2003&&year<=2006){

            beta=.0022;

        }

        else if(year>=2007&&year<=2008){

            beta=-.009;
            noise*=1.4;

        }

        else if(year>=2009&&year<=2019){

            beta=.0032;

        }

        else if(year===2020){

            beta=currentDate.getMonth()<4
                ?-.015
                :.007;

        }

        else if(year===2022){

            beta=-.0045;

        }

        else if(year>=2023){

            beta=.0042;

        }

        const spyReturn=beta+noise*.7;
        const qqqReturn=beta*1.2+noise;

        qqqVal*=1+qqqReturn;
        spyVal*=1+spyReturn;

        tqqqSynVal*=1+(qqqReturn*3)-0.0016;

        tqqqActualVal*=1+(qqqReturn*3)-0.0013;

        const launched=
            year>2010||
            (year===2010&&currentDate.getMonth()>=1);

        data.push({

            date:currentDate,

            SPY:spyVal,

            QQQ:qqqVal,

            TQQQ:tqqqSynVal,

            TQQQ_Actual:
                launched
                    ?tqqqActualVal
                    :NaN

        });

    }

    return data;

}