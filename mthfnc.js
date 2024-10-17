let bign = 10;


class contour {
    constructor(points) {
        this.points = points;
    }

    getlength() {
        let length = 0;
        for (let i = 1; i < this.points.length; i++) {
            let diff = math.subtract(this.points[i], this.points[i - 1]);
            length += math.sqrt(math.pow(diff.re, 2) + math.pow(diff.im, 2));
        }
        return length;
    }

    getdist(x) {
        let length = 0;
        for (let i = 1; i < this.points.length; i++) {
            let prevPoint = this.points[i - 1];
            let currPoint = this.points[i];
            let diff = math.subtract(currPoint, prevPoint);
            let segmentLength = math.sqrt(math.pow(diff.re, 2) + math.pow(diff.im, 2));
            
            if (length + segmentLength >= x) {
                let ratio = (x - length) / segmentLength;
                let interpPoint = math.add(
                    prevPoint, 
                    math.multiply(ratio, diff)
                );
                return interpPoint;
            }
            length += segmentLength;
        }
        return this.points[this.points.length - 1];
    }

    cdist(x) {
        const totalLength = this.getlength();
        const normalizedDistance = x * totalLength;
        return this.getdist(normalizedDistance);
    }
}
function Cpochammer() {
    const points = poschhammerp.map(point => math.complex(point.re, point.im));
    return new contour(points);
}
function Ccircle(r, x=math.complex(0,0)) {
    const totalCircumference = 2 * Math.PI * r;  // Total circumference of the circle
    const points = [];
    const numPoints = 100;  // Number of points to approximate the circle

    for (let i = 0; i <= numPoints; i++) {
        const theta = (i / numPoints) * 2 * Math.PI;
        const point = math.complex(r * Math.cos(theta) + x.re,x.im+ r * Math.sin(theta));
        points.push(point);
    }

    // Create a contour from the circle points
    return new contour(points);
}
function Chankel(r) {
    const points = [];
    for (let i = 0; i < bign; ++i) {
        const t = i / (bign - 1); // Parameter t goes from 0 to 1
        let point;

        if (i < bign / 3) {
            point = math.complex(-bign,r*( 1.0 - t));
        } else if (i < 2 * bign / 3) {
            point = math.complex(-r, r*(1.0 - 2 * t));
        } else {
            point = math.complex(bign, r*(-1.0 + t));
        }

        points.push(point);
    }
    return new contour(points);
}
function Ccauchy(r) {
    const points = [];
    for (let i = 0; i < bign; ++i) {
        const angle = (Math.PI * i) / bign; // Angle in radians
        const point = math.complex(-Math.cos(angle)*r, r*Math.sin(angle)); // Start at the endpoint of the half-circle
        points.push(point);
    }
    points.push(math.complex(-r, 0)); // Add an extra point at (-1, 0)
    return new contour(points);
}
function Chalfcirc(r) {
    const points = [];
    for (let i = 0; i < bign; ++i) {
        const angle = (Math.PI * i) / bign; // Angle in radians
        const point = math.complex(r*Math.cos(angle),r* Math.sin(angle));
        points.push(point);
    }
    return new contour(points);
}
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

const poschhammerp = [
    math.complex(-1.5, 0.5), math.complex(-1.5, -0.5),
    math.complex(-0.5, -0.5), math.complex(-0.5, 0.25),
    math.complex(1.0, 0.25), math.complex(1.0, 1.0),
    math.complex(2.0, 1.0), math.complex(2.0, -1.0),
    math.complex(-2.0, -1.0), math.complex(-2.0, 1.0),
    math.complex(-1.0, 1.0), math.complex(-1.0, -0.5),
    math.complex(1.5, -0.5), math.complex(1.5, 0.5),
    math.complex(-1.5, 0.5) // Loop back to the starting point
];
let globalc = math.complex(1,0);
      const knthetaa = [
	   math.complex(-0.4884150884437966033074145688009828070846452019933144110659203258, -0.9223068629260569360028235559934401714062536024757296551070286184),
    math.complex(0.003851578735411204420399364109394585843185019100299557939634370175, -0.09056477795411682044547667460610562297963243478659090786228987894),
    math.complex(0.002100916786902814872986655281733514148876424144705316994169658256, -0.03795624815247508554188893672201581077914536270451353672164745447),
    math.complex(0.001447547758421785120322056360837028884870406466145500301406390468, -0.02281729713002375502899972915432846601334842283056874647777022957),
    math.complex(0.001104386099212763734898482787823058366235237703064933600632173951, -0.01591997616942238837419345412868698280031768159954380825245251099),
    math.complex(0.0008925930993370412716687367311439146963311622539771580704880427279, -0.01205322305695692864975008563287107152522094862729950820040836599),
    math.complex(0.0007487739201806153049758044951052940118091071090206985765702546929, -0.009609109527693034937264641056222933237980714330290006089609899773),
    math.complex(0.0006447070675903776978488026882850743197145272531230651691592722707, -0.007937942295658218859174134769344880450697924795216699914435502927),
    math.complex(0.0005659061641790590181344669276728723138509004662004086543603548146, -0.006730015292187770054262275187965891901244389685431177911075154922),
    math.complex(0.0005041654941405862274307539927433877665937227700581003768123204892, -0.005820035931204927306224523286334754287263921141287385230243220755),
    math.complex(0.0004544872825132033722559396488552986529475881447380032450147114988, -0.005112199447745594893171793161203690360335197392328055217986417005),
    math.complex(0.0004136529004774918671618626459954724559749319620789536867370273260, -0.004547362107568092600925048536415649559078469627107748501527043503),
    math.complex(0.0003794955571786000088697356404197888286796467312410992883137925607, -0.004087146236240283999694668038068334966781507680882805358569200643),
    math.complex(0.0003505029366052633988576783626803309254052170161838436418100442001, -0.003705621564669216991707725572651167414285527654904302070911460098),
    math.complex(0.0003255873758339126954484586852188685668345673062105611875200235400, -0.003384671692770100003071703722399997866001801122288069938940601106),
    math.complex(0.0003039465587699662952802460548063685816196386198597183883266975190, -0.003111277707411010485372421696440090595171691803402175898505985212),
    math.complex(0.0002849756856682896456991292457736657318943935536589590646036775813, -0.002875856086155444352982526500791233294464529670378412454760636725),
    math.complex(0.0002682102094762768524805960805757221753676588577228413774263957149, -0.002671204038303480638933156368937704231533347407163452091644625313),
    math.complex(0.0002532874059782158978731245483184201725381761077080558628593401737, -0.002491809016411183393083725275197258343434499414580878869781449599),
    math.complex(0.0002399199252033383381531648506198264545555778190328086825557233190, -0.002333384176731953257491678245854568569465650215226605876827570224),
    math.complex(0.0002278771806878995978116431742754728195509773817572503488622253656, -0.002192548290134272888908485993937443480978253225566868373312073872),
    math.complex(0.0002169719939369601159275249206237052143958229041896684818458523502, -0.002066600468099710439973629868452944527075000424954282497730263613),
    math.complex(0.0002070508404320027768701131909127951364611663208110243110116426246, -0.001953358597288465093450281342794127932917952818195569992658696534),
    math.complex(0.0001979866127165430317589263437778081315770391674791140687674143941, -0.001851041486065535573407440218709946038702829744926764617624524757),
    math.complex(0.0001896731739394399866788397399722925496477110933666346439184319091, -0.001758181572182321112069035868202704103950291218436861667237033803),
    math.complex(0.0001820212054891074112044000129667354213978538196316436387851418153, -0.001673559363676357346123914971694493232221993735550917268738858015),
    math.complex(0.0001749550036403234273399494570255873164165031785568179628977463350, -0.001596153575767860240554422661364695866209785232138170351272344324),
    math.complex(0.0001684099814472925376319239927522230783547847964370519880770944165, -0.001525102764611534750326461986800943694890299622654514619465599691),
    math.complex(0.0001623307011478848943909394080050075970092093527506422409448875742, -0.001459675491716838194338653559325080973844923375620283682405507015),
    math.complex(0.0001566693101331199909220087635208187462749090936893864569163060912, -0.001399246893842371680401845259694777305087674295472373168470742488),
    math.complex(0.0001513842871063078569145807647799539359116309132963533158941501613, -0.001343280115689140884621279080849079857285062807417072217432552249),
    math.complex(0.0001464394289583394447247721734079990890418841145303703492639726523, -0.001291311471960750653908059196955788990876691029817777927299295301),
    math.complex(0.0001418030261175519151211374693074145618328214714132123674328852046, -0.001242938496662146649073428500230412148743921407926676370817938625),
    math.complex(0.0001374471867005090255770591229055772697473198870561426235043644986, -0.001197810247398746352496354555014575959958941477123993056349877833),
    math.complex(0.0001333472790556910966327361100265556812492078690586265155692217148, -0.001155619385389272268060593618510539536991738480079500511828080918),
    math.complex(0.0001294814691922701317867561720255548440064688994206315412051196830, -0.001116095664547526248761287482063258310060801470527987525823350702),
    math.complex(0.0001258303347733657589577696402821961482772193213496719530033342190, -0.001079000546767080135716869093687333252602486146227271121757786628),
    math.complex(0.0001223765412872603325844486349523649156478358427628515269312269217, -0.001044122723433417190447027562677345959300221153348646809655905036),
    math.complex(0.0001191045690185864086090848447251650999256128429514119094164733358, -0.001011274370810359250781122540766279539538009204729341031155331676),
    math.complex(0.0001160004817602718618354116842527507791605150799581783350152968306, -0.0009802880033044178563593392930984679209828927175383392734733906396),
    math.complex(0.0001130517300073879111072767284551504870621327179773008393992382167, -0.0009510138165816972450739097696802100090600073882148206829811154926),
    math.complex(0.0001102469827816539431837410946157009444326178175090307918324902937, -0.0009233174341885346365203266236251432785676054628360253910615663766),
    math.complex(0.0001075759833431574905260456706989882600017816184441893789020826951, -0.0008970779882416688038811024000686339628261525062030174427210974300),
    math.complex(0.0001050294249231578405642745349518431116052669169413568861682665806, -0.0008721864780388293730799063194368000970158752795298437540522459254),
    math.complex(0.0001025988433107396714750408090263878426401045584210167310049468416, -0.0008485443609397825491565516344777714454522808512310834878335860130),
    math.complex(0.0001002765236859915805823982965486242105602111831573035932129209353, -0.0008260623382141759381895854390136442828610870208222580896984706258),
    math.complex(9.805541954335107556324438591529765967978181036847202876136258659e-5, -0.0008046593052246129637638310317170863565167375978846896286659291607),
    math.complex(9.592908191383587247204947195050685442544549439245568950225529990e-5, -0.0007842614406755552606690419022963891465180397687979920940843385186),
    math.complex(9.389159739186952256957537926879213215977706219995989054216302302e-5, -0.0007648014139899961858380046660772991544361372347914815520642298214),
    math.complex(9.193753371513106628768806391406014126734138226459751564223391282e-5, -0.0007462176933915225570310056169433131276648201124332129077993072937),
    math.complex(9.006189184511152140135588682959610869089924558110295376009770450e-5, -0.0007284539401362281596641263543272122555174319700177155323135572269),
    math.complex(8.826006366032518850846828920720607759342574182666599716365528031e-5, -0.0007114584766870765590820275163454576039804465378854442997108964844),
    math.complex(8.652779451009647244146107135028422719721639560788412348040297121e-5, -0.0006951838185547548458429913496862294190872705135690895971283074639),
    math.complex(8.486114998983572209736604208301551440602875634950903180956943719e-5, -0.0006795862611242247247425102779266978505071797128401770548166079157),
    math.complex(8.325648639296596995426728981234729804875179263959087830500981804e-5, -0.0006646255141087549026170734385955154722958533657139322473022881236),
    math.complex(8.171042437355873275702681738258431113430986989946275120293151168e-5, -0.0006502643773738992321254237374188328257557423025199083328327748489),
    math.complex(8.021982542001023415497760346840762752972488288470446407612314855e-5, -0.0006364684527931956964094497175999908017813283732862787317225164460),
    math.complex(7.878177079594425393460935845311850634874468352218878086163471706e-5, -0.0006232058875678463155090833893033917095631649053988665236741414772),
    math.complex(7.739354265175272528970095315565445449395583976404287782752869924e-5, -0.0006104471450905416745750599567035079243225218491958892623830844473),
    math.complex(7.605260705023662591683674215491958711194575443441659148758242520e-5, -0.0005981647999801659300901133780805430707771024544719758191290647784)
];

function add(...args) {
    return args.reduce((acc, val) => math.add(acc, val));
}

function sub(...args) {
    return args.reduce((acc, val) => math.subtract(acc, val));
}

function mul(...args) {
    return args.reduce((acc, val) => math.multiply(acc, val));
}

function div(...args) {
    return args.reduce((acc, val) => math.divide(acc, val));
}
function exp(x){return math.exp(x);}
function log(x){return math.log(x);}

const airyaizero=[-2.3381074104597670385, -4.0879494441309706166, 
-5.5205598280955510591, -6.7867080900717589988, 
-7.9441335871208531231, -9.0226508533409803802, 
-10.040174341558085931, -11.008524303733262893, 
-11.936015563236262517, -12.828776752865757200, 
-13.691489035210717928, -14.527829951775334982, 
-15.340755135977996857, -16.132685156945771439, 
-16.905633997429942627, -17.661300105697057509, 
-18.401132599207115416, -19.126380474246952144, 
-19.838129891721499701, -20.537332907677566360, 
-21.224829943642096955, -21.901367595585130707, 
-22.567612917496502831, -23.224165001121681061, 
-23.871564455535918567, -24.510301236589677490, 
-25.140821166148963748, -25.763531400982756459, 
-26.378805052137232374, -26.986985111606367686, 
-27.588387809882444812, -28.183305502632644923, 
-28.772009165237435382, -29.354750558766287963, 
-29.931764119086555913, -30.503268611418505287, 
-31.069468585183755604, -31.630555658012659341, 
-32.186709652952050689, -32.738099609000269133, 
-33.284884681901401880, -33.827214949508651940, 
-34.365232133863659058, -34.899070250345312102, 
-35.428856192747888462, -35.954710261898629265, 
-36.476746644374808962, -36.995073846994501610, 
-37.509795092005016131, -38.021008677255254433];
const airybizero=[
-1.1737132227091279249, -3.2710933028363527157, 
-4.8307378416620159326, -6.1698521283102512598, 
-7.3767620793677637136, -8.4919488465093880134, 
-9.5381943793462388866, -10.529913506705357924,
-11.476953551278779438, -12.386417138582738746, 
-13.263639522941805554, -14.112756809068657792, 
-14.937057412154164040, -15.739210351190482771, 
-16.521419550634379054, -17.285531624581242533, 
-18.033113287225001572, -18.765508284480081041, 
-19.483880132989234014, -20.189244785396202420, 
-20.882495994193175768, -21.564425284712977653, 
-22.235737881803385167, -22.897065554219793474, 
-23.548977079642448269, -24.191986850649000086, 
-24.826562012152892172, -25.453128427085131994, 
-26.072075698466804494, -26.683761425120990449, 
-27.288514830076298204, -27.886639871735962459, 
-28.478417925678661737, -29.064110107777650305, 
-29.643959295918396591, -30.218191897047274645, 
-30.787019397921766297, -31.350639731255585371, 
-31.909238483584569653, -32.462989966836853179, 
-33.012058172056838136, -33.556597620840061133, 
-34.096754127656028505, -34.632665484267754681, 
-35.164462075821017199, -35.692267436810804794, 
-36.216198753987482221, -36.736367322301206572, 
-37.252878959168286974, -37.765834381651801163];
const sinczeros=[-3.1415926535897932385, -3.1415926535897932385, 
-6.2831853071795864769, -9.4247779607693797154, 
-12.566370614359172954, -15.707963267948966192, 
-18.849555921538759431, -21.991148575128552669, 
-25.132741228718345908, -28.274333882308139146, 
-31.415926535897932385, -34.557519189487725623, 
-37.699111843077518861, -40.840704496667312100, 
-43.982297150257105338, -47.123889803846898577, 
-50.265482457436691815, -53.407075111026485054, 
-56.548667764616278292, -59.690260418206071531, 
-62.831853071795864769, -65.973445725385658008, 
-69.115038378975451246, -72.256631032565244485, 
-75.398223686155037723, -78.539816339744830962, 
-81.681408993334624200, -84.823001646924417438, 
-87.964594300514210677, -91.106186954104003915, 
-94.247779607693797154, -97.389372261283590392];
function tan(x){return math.tan(x);}
function cot(x){return math.cot(x);}
function cos(x){return math.cos(x);}
function sin(x){return math.sin(x);}
function atan(x){return math.atan(x);}
function acot(x){return math.acot(x);}
function acos(x){return math.acos(x);}
function asin(x){return math.asin(x);}



function integral(func, initial, end, input, N = bign) {
    function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);
        let sum = math.complex(0,0); 
        for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0), func(add(a, mul(math.complex(i,0), h)), input)));
        }
        for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0), func(add(a, mul(math.complex(i,0), h)), input)));
        }
        return mul(div(h, math.complex(3,0)), sum);
    }
          return simpsonsRule(initial,end, N);
       }
	   
function cintegral(func, C , t=0 , N = bign) {
let sum = math.complex(0,0); 
let n = N;
const h = div(1, n);
for (let i = 1; i < n-1; i += 1){
	sum = add(sum,mul(math.evaluate(func,{t:t,x:C.cdist(mul(h,i))}),sub(C.cdist(mul(h,i)),C.cdist(mul(h,i-1)))));
}
return sum;

}

let randc = math.complex(2.1723687,1.8278742);
function eulerc () { return math.complex(2.71828,0);        
}
function log(x){return math.log(x);}
function sinc(z) {
            if (math.abs(z) === 0) {
                return math.complex(1, 0);
            }
            return div(math.sin(z), z);
        }
// Function for the 'taxicab' operation
function taxicab(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * ((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1),
        ss * ((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)
    );
}

// Function for the 'arctaxicab' operation
function arctaxicab(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * (Math.cos(ata) * Math.cos(ata) / ((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)),
        ss * (Math.sin(ata) * Math.sin(ata) / ((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1))
    );
}

// Function for the 'chebyshev' operation
function chebyshev(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * Math.max(-1, Math.min(1, Math.tan((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1))),
        ss * Math.max(-1, Math.min(1, Math.tan((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)))
    );
}

// Function for the 'arcchebyshev' operation
function arcchebyshev(b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * (Math.cos(ata) * Math.cos(ata) / Math.max(-1, Math.min(1, Math.tan((Math.abs((ata + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1)))),
        ss * (Math.sin(ata) * Math.sin(ata) / Math.max(-1, Math.min(1, Math.tan((Math.abs((ata - Math.PI / 2 + 10 * Math.PI) % (2 * Math.PI) - Math.PI) / (Math.PI / 2)) - 1))))
    );
}


// Function for 'powcos'
function powcos(a, b) {
    return mul(pow(a, b), math.cos(a));
}

// Function for 'powsin'
function powsin(a, b) {
    return mul(pow(a, b), math.sin(a));
}



// Function for 'exp+'
function expPlus(a, b) {
    return add(a, math.exp(b));
}

// Function for 'exp2'
function exp2( b) {
    return  pow(2, b);
}

// Function for 'exp10'
function exp10( b) {
    return  pow(10, b);
}


// Function for 'expc'
function expc(a, b) {
    return div(math.exp(b), pow(b, a));
}

// Function for 'expi'
function expi( b) {
    return div(1, math.exp(b));
}

// Function for 'expic'
function expic( b) {
    return  mul(math.exp(b), add(b, 0.0001));
}

// Function for 'expein'
function expein(b) {
    return div(sub(1.0, math.exp(math.unaryMinus(b))), add(b, 0.0001));
}

// Function for 'expsqr'
function expsqr( b) {
    return  math.exp(mul(b, b));
}

// Function for 'expmsqr'
function expmsqr( b) {
    return add(math.exp(math.unaryMinus(mul(b, b))), 0.0001);
}

// Function for 'log-1'
function logMinus1(b) {
    return div(1.0, math.log(b));
}



// Function for 'log10'
function log10( b) {
    return  math.log(b, 10.0);
}

// Function for '_log'
function _log(b, a) {
    return math.log(b, a);
}

// Function for 'antilog'
function antilog(b) {
    return math.log(b, math.e);
}

// Function for 'antilog2'
function antilog2(b) {
    return math.log(b, 2.0);
}

// Function for 'antilog10'
function antilog10(b) {
    return math.log(b, 10.0);
}

// Function for 'logc'
function logc(b) {
    return div(math.log(b), b);
}

// Function for 'naplog'
function naplog(b) {
    return mul(-10000000.0, math.log(div(b, 10000000.0)));
}

// Function for 'dist'
function dist(a, b) {
    return add(mul(a, a), mul(b, b));
}

// Function for 'hypot'
function hypot(a, b) {
    return math.sqrt(add(mul(a, a), mul(b, b)));
}

// Function for 'sdist'
function sdist(a, b) {
    return sub(mul(a, a), mul(b, b));
}

// Function for 'zdist'
function zdist(b) {
    return div(math.distz(b));
}

// Utility function for degrees to radians
function degreesToRadians(deg) {
    return mul(deg, math.pi / 180);
}

// Utility function for radians to degrees
function radiansToDegrees(rad) {
    return mul(rad, 180 / math.pi);
}

// Function for 'ramp'
function ramp(a, b) {
    return mul(a, math.mod(b, 2 * math.pi) / math.pi - 1.0);
}

// Function for 'squarewave'
function squarewave(a, b) {
    return mul(a, math.lessThan(math.mod(b, 2 * math.pi), math.pi) ? 1.0 : -1.0);
}

// Function for 'trianglewave'
function trianglewave(a, b) {
    return mul(a, mul(2.0 / math.pi, math.asin(math.sin(b))));
}

// Function for 'sawtoothwave'
function sawtoothwave(a, b) {
    return mul(a, mul(2.0 / math.pi, sub(math.pi, math.mod(b, 2 * math.pi))));
}

// Function for 'pulse'
function pulse(a, b) {
    return mul(a, math.sin(b) > 0 ? 1.0 : -1.0);
}

// Function for 'todeg'
function todeg(b) {
    return radiansToDegrees(b);
}

// Function for 'sind'
function sind(a, b) {
    return mul(a, math.sin(degreesToRadians(b)));
}

// Function for 'sinhdeg'
function sinhdeg(a, b) {
    return mul(a, math.sinh(degreesToRadians(b)));
}

// Function for 'asind'
function asind(a, b) {
    return radiansToDegrees(mul(a, math.asin(b)));
}

// Function for 'cosd'
function cosd(a, b) {
    return mul(a, math.cos(degreesToRadians(b)));
}

// Function for 'coshdeg'
function coshdeg(a, b) {
    return mul(a, math.cosh(degreesToRadians(b)));
}

// Function for 'acosd'
function acosd(a, b) {
    return radiansToDegrees(mul(a, math.acos(b)));
}

// Function for 'tand'
function tand(a, b) {
    return mul(a, math.tan(degreesToRadians(b)));
}

// Function for 'tanhdeg'
function tanhdeg(a, b) {
    return mul(a, math.tanh(degreesToRadians(b)));
}

// Function for 'atand'
function atand(a, b) {
    return radiansToDegrees(mul(a, math.atan(b)));
}

// Function for 'atan2d'
function atan2d(a, b) {
    return radiansToDegrees(math.atan(div(a, b)));
}
function cot(b) {
    return div(math.complex(1), math.tan(b));
}

// Function for 'coth'
function coth(b) {
    return div(math.complex(1), math.tanh(b));
}

// Function for 'sec'
function sec(b) {
    return div(math.complex(1), math.cos(b));
}

// Function for 'sech'
function sech(b) {
    return div(math.complex(1), math.cosh(b));
}

// Function for 'csc'
function csc(b) {
    return div(math.complex(1), math.sin(b));
}

// Function for 'csch'
function csch(b) {
    return div(math.complex(1), math.sinh(b));
}

// Function for 'crd'
function crd(b) {
    return mul(math.sin(div(b, math.complex(2))), math.complex(2));
}

// Function for 'arccrd'
function arccrd(b) {
    return mul(math.asin(div(b, math.complex(2))), math.complex(2));
}

// Function for 'arccrdd'
function arccrdd(b) {
    return radiansToDegrees(mul(math.asin(div(b, math.complex(2))), math.complex(2)));
}

// Function for 'asinh'
function asinh(b) {
    return math.asinh(b);
}

// Function for 'acosh'
function acosh(b) {
    return math.acosh(b);
}

// Function for 'atanh'
function atanh(b) {
    return math.atanh(b);
}

// Function for 'asec'
function asec(b) {
    return math.acos(div(math.complex(1), b));
}

// Function for 'asech'
function asech(b) {
    return math.acosh(div(math.complex(1), b));
}

// Function for 'acsc'
function acsc(b) {
    return math.asin(div(math.complex(1), b));
}

// Function for 'acsch'
function acsch(b) {
    return math.asinh(div(math.complex(1), b));
}

// Function for 'exsec'
function exsec(b) {
    return sub(math.sec(b), math.complex(1));
}

// Function for 'excosec'
function excosec(b) {
    return sub(math.csc(b), math.complex(1));
}

// Function for 'versin'
function versin(b) {
    return sub(math.complex(1), math.cos(b));
}

// Function for 'vercosin'
function vercosin(b) {
    return add(math.complex(1), math.cos(b));
}

// Function for 'coversin'
function coversin(b) {
    return sub(math.complex(1), math.sin(b));
}

// Function for 'covercosine'
function covercosine(b) {
    return add(math.complex(1), math.sin(b));
}

// Function for 'haversin'
function haversin(b) {
    return mul(sub(math.complex(1), math.cos(b)), math.complex(0.5));
}

// Function for 'hacovercosin'
function hacovercosin(b) {
    return mul(add(math.complex(1), math.sin(b)), math.complex(0.5));
}

// Function for 'arcversin'
function arcversin(b) {
    return math.acos(sub(math.complex(1), b));
}

// Function for 'arcvercos'
function arcvercos(b) {
    return math.acos(sub(b, math.complex(1)));
}

// Function for 'arccoversin'
function arccoversin(b) {
    return math.asin(sub(math.complex(1), b));
}

// Function for 'arccovercos'
function arccovercos(b) {
    return math.asin(sub(b, math.complex(1)));
}

// Function for 'archaversin'
function archaversin(b) {
    return mul(math.complex(2), math.asin(math.sqrt(b)));
}

// Function for 'archavercos'
function archavercos(b) {
    return mul(math.complex(2), math.acos(math.sqrt(b)));
}

// Function for 'archacoversin'
function archacoversin(b) {
    return math.asin(sub(math.complex(1), mul(math.complex(2), b)));
}

// Function for 'archacovercos'
function archacovercos(b) {
    return math.asin(sub(mul(math.complex(2), b), math.complex(1)));
}

// Function for 'sinsqr'
function sinsqr(b) {
    return mul(math.sin(mul(b, b)), math.complex(1));
}

// Function for 'cossqr'
function cossqr(b) {
    return mul(math.cos(mul(b, b)), math.complex(1));
}

// Function for 'shid'
function shid(b) {
    return div(math.sinh(b), add(b, math.complex(0.0001)));
}

// Function for 'cosh-1'
function coshminus1(b) {
    return div(math.complex(1), math.cosh(b));
}

// Function for 'sinc'
function sinc(b) {
    return div(math.sin(b), add(b, math.complex(0.0001)));
}

// Function for 'cosc'
function cosc(b) {
    return div(math.cos(b), add(b, math.complex(0.0001)));
}

// Function for 'coshc'
function coshc(b) {
    return div(math.cosh(b), add(b, math.complex(0.0001)));
}

// Function for 'sinhc'
function sinhc(b) {
    return div(math.sinh(b), add(b, math.complex(0.0001)));
}

// Function for 'tanc'
function tanc(b) {
    return div(math.tan(b), add(b, math.complex(0.0001)));
}

// Function for 'tanhc'
function tanhc(b) {
    return div(math.tanh(b), add(b, math.complex(0.0001)));
}

// Function for 'asinc'


// Function for 'acoshc'
function acoshc(b) {
    return div(math.cosh(b), add(b, math.complex(0.0001)));
}

// Function for 'asinhc'
function asinhc(b) {
    return div(math.sinh(b), add(b, math.complex(0.0001)));
}

// Function for 'atanhc'
function atanhc(b) {
    return div(math.tanh(b), add(b, math.complex(0.0001)));
}
function complex(value) {
    return math.complex(value, 0);
}

// Function for 'cis'
function cis(b) {
    return add(mul(math.sin(b),math.complex(0,1)),math.cos(b));
}
function sic(b) {
    return add(mul(math.cos(b),math.complex(0,1)),math.sin(b));
}
// Function for 'cas'
function cas(b) {
    return add(mul(math.sin(b), complex(1)), mul(math.cos(b), complex(1)));
}

// Function for 'cish'
function cish(b) {
    return add(mul(math.sinh(b),math.complex(0,1)),math.cosh(b));
}

// Function for 'sich'
function sich(b) {
    return add(mul(math.cosh(b),math.complex(0,1)),math.sinh(b));
}

// Function for 'cisc'
function cisc(b) {
    return div(cis(b),b);
}
function sicc(b) {
    return div(sic(b),b);
}
// Function for 'casc'
function casc(b) {
    return div(cas(b),b);
}

// Function for 'cishc'
function cishc(b) {
   return div(cish(b),b);
}
function cashc(b) {
   return div(cash(b),b);
}

// Function for 'sichc'
function sichc(b) {
return div(sich(b),b);
}

// Function for 'sinp'
function sinp(b) {
    return mul(2.0, math.sinh(div(math.asinh(div(sub(mul(3.0, b), 4.0), 2.0)), 3.0)));
}

function cosp(b) {
    const term = math.cosh(mul(div(2.0, 3.0), math.asinh(div(sub(mul(3.0, b), 4.0), 2.0))));
    return mul(sub(3.0, mul(2.0, term)), complex(1));
}

// Function for 'tanp'
function tanp(b) {
    const asinhTerm = math.asinh(div(sub(mul(3.0, b), 4.0), 2.0));
    const sinhTerm = math.sinh(mul(div(1.0, 3.0), asinhTerm));
    const coshTerm = math.cosh(mul(div(2.0, 3.0), asinhTerm));
    return div(sinhTerm, sub(3.0, mul(2.0, coshTerm)));
}

// Function for 'cscp'
function cscp(b) {
    const asinhTerm = math.asinh(div(sub(mul(3.0, b), 4.0), 2.0));
    const sinhTerm = math.sinh(mul(div(1.0, 3.0), asinhTerm));
    return div(complex(1), mul(2.0, sinhTerm));
}

// Function for 'secp'
function secp(b) {
    const asinhTerm = math.asinh(div(sub(mul(3.0, b), 4.0), 2.0));
    const coshTerm = math.cosh(mul(div(2.0, 3.0), asinhTerm));
    return div(complex(1), sub(3.0, mul(2.0, coshTerm)));
}

// Function for 'cotp'
function cotp(b) {
    const asinhTerm = math.asinh(div(sub(mul(3.0, b), 4.0), 2.0));
    const sinhTerm = math.sinh(mul(div(1.0, 3.0), asinhTerm));
    const coshTerm = math.cosh(mul(div(2.0, 3.0), asinhTerm));
    return div(sinhTerm, coshTerm);
}

// Function for 'asinp'
function asinp(b) {
    const asinhTerm = math.asinh(div(b, 2.0));
    return mul(div(add(mul(2.0, math.sinh(mul(asinhTerm, 3.0))), 4.0), 3.0), complex(1));
}

// Function for 'acosp'
function acosp(b) {
    const acoshTerm = math.acosh(div(sub(3.0, b), 2.0));
    return mul(div(add(mul(2.0, math.sinh(mul(acoshTerm, div(3.0, 2.0)))), 4.0), 3.0), complex(1));
}

// Function for 'acscp'
function acscp(b) {
    const asinhTerm = math.asinh(div(complex(1.0), b));
    return mul(div(add(mul(2.0, math.sinh(mul(asinhTerm, 3.0))), 4.0), 3.0), complex(1));
}

// Function for 'asecp'
function asecp(b) {
    const acoshTerm = math.acosh(div(sub(3.0, div(complex(1.0), b)), 2.0));
    return mul(div(add(mul(2.0, math.sinh(mul(acoshTerm, div(3.0, 2.0)))), 4.0), 3.0), complex(1));
}
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }
function nthPrime(x) {
 
    let n = parseInt(math.complex(x).re);

    if (isNaN(n) || n < 1) {
        throw new Error("Input must be a positive integer.");
    }

    let count = 0;
    let candidate = 1;

    while (count < n) {
        candidate++;
        if (isPrime(candidate)) {
            count++;
        }
    }

    return candidate; // Return the nth prime
}
function arithmeticmean(a, b) {
    return div(add(a, b), complex(2.0));
}

function geometricmean(a, b) {
    return math.sqrt(mul(a, b));
}

function arithmeticgeometricmean(a, b) {//be more elobrate then jsut give the code
return arithmeticmean(arithmeticmean(arithmeticmean(arithmeticmean(a,b),geometricmean(a,b)),geometricmean(arithmeticmean(a,b),geometricmean(a,b))),geometricmean(arithmeticmean(arithmeticmean(a,b),geometricmean(a,b)),geometricmean(arithmeticmean(a,b),geometricmean(a,b))));
}

function arithmeticharmonicmean(a, b) {
    const harmonicMean1 = div(complex(1.0), add(div(complex(1.0), a), div(complex(1.0), arithmeticmean(a, b))));
    const harmonicMean2 = div(complex(1.0), add(div(complex(1.0), a), div(complex(1.0), arithmeticmean(a, b))));
    return arithmeticmean(harmonicMean1, harmonicMean2);
}

function geometricharmonicmean(a, b) {
    const harmonicMean1 = div(complex(1.0), add(div(complex(1.0), a), div(complex(1.0), geometricmean(a, b))));
    const harmonicMean2 = div(complex(1.0), add(div(complex(1.0), a), div(complex(1.0), geometricmean(a, b))));
    return geometricmean(harmonicMean1, harmonicMean2);
}

function harmonicmean(a, b) {
    return div(complex(1.0), add(div(complex(1.0), a), div(complex(1.0), b)));
}

function quadraticmean(a, b) {
    return pow(add(pow(a, complex(2.0)), pow(b, complex(2.0))), complex(1.0 / 2.0));
}

function cubicmean(a, b) {
    return pow(add(pow(a, complex(3.0)), pow(b, complex(3.0))), complex(1.0 / 3.0));
}

function heronianmean(a, b) {
    return div(add(add(a, b), math.sqrt(mul(a, b))), complex(3.0));
}

function contraharmonicmean(a, b) {
    const numerator = arithmeticmean(pow(a, complex(2.0)), pow(b, complex(2.0)));
    const denominator = arithmeticmean(a, b);
    return div(numerator, denominator);
}

function neumansandormean(a, b) {
    const numerator = sub(a, b);
    const denominator = mul(complex(2.0), asinh(div(sub(a, b), add(a, b))));
    return div(numerator, denominator);
}

function neumansandortmean(a, b) {
    const numerator = sub(a, b);
    const denominator = mul(complex(2.0), atan(div(sub(a, b), add(a, b))));
    return div(numerator, denominator);
}

function rootmean(a, b) {
    return sqrt(arithmeticmean(pow(a, complex(2.0)), pow(b, complex(2.0))));
}

function logarithmicmean(a, b) {
    return div(sub(a, b), sub(log(a), log(b)));
}

function identricmean(a, b) {
    return div(pow(div(pow(a, a), pow(b, b)), div(complex(1.0), sub(a, b))) , eulerc());
}

function tocomp(value) {
    return math.complex(value);
}

function conj(value) {
    return math.complex(value).conjugate();
}

function arg(value) {
    return math.arg(math.complex(value));
}

function proj(value) {
    return mul(math.complex(value), div(math.complex(value), math.abs(math.complex(value))));
}

function signum(value) {
    const absValue = math.abs(value);
    return div(value, absValue);
}

// Complex operations
function dot(a, b) {
    const aComp = math.complex(a);
    const bComp = math.complex(b);
    return add(mul(aComp.re, bComp.re), mul(aComp.im, bComp.im));
}

function cross(a, b) {
    const aComp = math.complex(a);
    const bComp = math.complex(b);
    return sub(mul(aComp.re, bComp.im), mul(aComp.im, bComp.re));
}

function mandel(a, b) {
    const c = math.complex(b);
    const z = math.complex(a);
    return add(mul(z, z), c);
}

function conjOp(b) {
    return conj(b);
}

function argOp(b) {
    return arg(b);
}

function im(b) {
    return math.complex(b).im;
}

function re(b) {
    return math.complex(b).re;
}

function dex(b) {
    return pow(complex(10.0), b);
}

function doubleexp(b) {
    return math.exp(math.exp(b));
}

function logOp(a, b) {
    return mul(a, log(b));
}

function logPlus(a, b) {
    return add(a, log(b));
}

function logp(b) {
    return add(log(b), complex(1.0));
}

function logpc(b) {
    return div(add(log(b), complex(1.0)), b);
}
function colog(b) {
    return log(div(complex(1.0), b));
}

function cbrt(b) {
    return pow(b, complex(1.0 / 3.0));
}

function rabs(b) {
    return math.complex(math.abs(math.complex(b).re), math.complex(b).im);
}

function iabs(b) {
    return math.complex(math.complex(b).re, math.abs(math.complex(b).im));
}

function cabs(b) {
    return math.complex(math.abs(math.complex(b).re), math.abs(math.complex(b).im));
}

function sabs(b) {
    return math.sqrt(add(mul(b, b), complex(0.0)));
}

function norm(b) {
    return mul(mag(b), mag(b));
}

function real(b) {
    return math.complex(b).re;
}

function imag(b) {
    return math.complex(b).im;
}

function vdot(a, b) {
    return mul(conj(math.complex(a)), b);
}

function vcross(a, b) {
    return mul(a, conj(b));
}

function mag(b) {
    return math.abs(b);
}

function angle(b) {
    return arg(b);
}

function unit(b) {
    return div(b, math.abs(b));
}

function signumOp(a, b) {
    return mul(a, signum(math.complex(b).im));
}

// Helper functions
function maxc(a, b) {
    return math.max(a, b);
}

function minc(a, b) {
    return math.min(a, b);
}

function toDouble(value) {
    return Number(value);
}

function tocomplex(value) {
    return math.complex(value);
}

function rand() {
    return Math.random(); // Generates a random float between 0 and 1
}

// Main operations
function sqr(b) {
    return mul(b, b);
}

function sqrm(b) {
    return sub(mul(b, b), 1.0);
}

function cum(b) {
    return mul(b, mul(b, b));
}

function cumm(b) {
    return sub(mul(b, mul(b, b)), 1.0);
}

function fz(b) {
    return pow(b, b);
}

function qnum(a, b) {
    return div(sub(1.0, pow(b, a)), sub(1.0, b));
}

function regularInteriorAngle(b) {
    return mul(sub(b, 2.0), 180.0 / b);
}

function regularExteriorAngle(b) {
    return 360.0 / b;
}

function regularApothem(a, b) {
    return div(a, mul(2.0, math.tan(math.pi / b)));
}

function regularArea(a, b) {
    return mul(0.5, mul(a, mul(b, math.tan(math.pi / b))));
}

function average(a, b) {
    return div(add(a, b), 2.0);
}

function clamp(a, b) {
    const lower = 0.0;
    const upper = maxc(a, b);
    return maxc(lower, minc(b, upper));
}

function step(a, b) {
    return toDouble(b) < 0 ? 0 : a;
}

function hstep(a, b) {
    return toDouble(b) < toDouble(a) ? 0 : 1;
}

function ustep(a, b) {
    if (toDouble(b) < 0) return 0;
    if (math.equal(math.complex(b), math.complex(0))) return div(a, 2.0);
    return a;
}

function hustep(a, b) {
    if (toDouble(b) < toDouble(a)) return 0;
    if (math.equal(b, a)) return 0.5;
    return 1;
}

function sqrt(a, b) {
    return mul(a, math.sqrt(b));
}

function ceiling(b) {
    return math.ceil(b);
}

function round(b) {
    return math.round(b);
}

function absolute(b) {
    return math.abs(b);
}

function floor(b) {
    return math.floor(b);
}

function randomInteger(a, b) {
    return add(math.mod(mul(rand(), math.round(b - a + 1)), math.round(b - a + 1)), math.round(a));
}

function randomFloat(a, b) {
    return add(a, mul(rand(), sub(b, a)));
}

// Helper functions
function toComplex(value) {
    return math.complex(value);
}

function smht(a,b,c,d,x)//The Soboleva modified hyperbolic tangent
{return div(sub(exp(mul(a,x)),exp(mul(b,x,-1))),add(exp(mul(c,x)),exp(mul(-1,d,x))));}
function ssht(a,b,x)
{return div(sub(exp(mul(1,x)),exp(mul(1,x,-1))),add(exp(mul(a,x)),exp(mul(-1,b,x))));}
function sechpdf(x){
	return div(sech(mul(x,pi(),0.5)),2);}
function asymetricsechpdf(a,b,x){
	return div(1,add(exp(mul(a,x,-1)),exp(mul(b,x))));}
function sechcdf(x){
	return div(atan(exp(mul(pi(),x,0.5))),pi(),0.5);}
	
	
	
	function radialgaussian(s,x)//https://en.wikipedia.org/wiki/Activation_function
	{return exp(div(mul(x,x),-1,s,s));}
	function radialmultiquadratic(s,x)
	{return sqrt(add(mul(x,x),mul(s,s)));}
	function radialinvmultiquadratic(s,x)
	{return pow(add(mul(x,x),mul(s,s)),-0.5);}
	
	function relu(x){if(math.complex(x).re<0)return 0;return x;}
	function gelu(x){return mul(add(1,erf(div(x,sqrt(2)))),x,0.5);}
	function elu(a,x){if(math.complex(x).re<0)return mul(a,sub(exp(x),1));return x;}
	function selu(x,a=1.67326,l=1.0507){if(math.complex(x).re<0)return mul(l,a,sub(exp(x),1));return mul(x,l);}
	function leakyrelu(x){if(math.complex(x).re<0)return mul(0.01,x);return x;}
	function prelu(a,x){if(math.complex(x).re<0)return mul(a,x);return x;}
	function elish(a,x){if(math.complex(x).re<0)return div(sub(exp(x),1),add(exp(sub(0,x)),1)) ;return div(x,add(1,exp(sub(0,x))));}
	
	function softmax(A,j=0){
		let fi=math.complex(0,0);
	for (let i=0;i<leng(A);i++)	fi=add(fi,exp(g(A,i)));
	return div(g(A,j),fi);
	}
	function lse(A){//LogSumExp
		let fi=math.complex(0,0);
	for (let i=0;i<leng(A);i++)	fi=add(fi,exp(g(A,i)));
	return log(fi);
	}
	function lsezero(A){//LogSumExp
		let fi=math.complex(1,0);
	for (let i=0;i<leng(A);i++)	fi=add(fi,exp(g(A,i)));
	return log(fi);
	}
	function mish(x){return mul(tanh(softplus(x)),x);}
	function squareplus(a,x){return div(add(x,sqrt(add(mul(x,x),b))),2);}
	
	function hyperbolastic(x,t=1,m=1,d=1,a=1,z=0){
		return add(div(m,add(1,mul(a,exp(sub(0,mul(d,x),mul(t,asinh(x))))))),z);
	}
	function hyperbolastic2(x,t=1,m=1,d=1,a=1,z=0){
		return add(div(m,add(1,mul(a,mul(a,asinh(exp(mul(-1,d,pow(x,t)))))))),z);
	}
	function hyperbolastic3(x,a=1,t=1,g=1,d=1){
		return sub(m,mul(a,exp(sub(0,mul(d,pow(x,g)),asinh(mul(t,x))))));
	}
	function hazard(x,d,g,t){return add(mul(d,g,pow(x,sub(g,1))),div(t,sqrt(add(1,mul(x,x,t,t)))));}
	function survival(x,d,g,t){return exp(sub(0,mul(d,pow(x,g)),asinh(mul(t,x))))}
	
	function hyperbolasticcdf(x){return sub(1,exp(sub(0,x,asinh(x))));}
	function hyperbolasticpdf(x){return mul(add(1,div(1,sqrt(add(1,mul(x,x))))),exp(sub(0,x,asinh(x))));}
	
	
	function bernoullid(t,x){
		return div(pow(t,sub(x,1)),sub(exp(mul(pi(),2,t)),1));
	}
	function bernoulli(x){return mul(4,x,pow(-1,add(x,1)),integral(bernoullid,0,bign,x))};
	function bernoulliz(x){
		if(x==math.complex(1,0))return 0.5;
		return mul(-1,x,ZZZ(sub(1,x)));
	}
	function bernoulliz2(x){
		if(x==math.complex(1,0))return 0.5;
		return mul(2,pow(-1,add(div(x,2),1)),factorial(x),ZZZ(x),pow(add(pi(),pi()),sub(0,x)));
	}
	
	function riesz(x){
		let fi=math.complex(0,0);
		for(let k=0;k<bign;k++)
			fi=add(fi,div(mul(pow(-1,sub(k,1)),pow(x,k)),mul(factorial(sub(k,1)),ZZZ(mul(k,2)))));
		return fi;
	}
	function mriesz(x){//M(Riesz(z)) mellin translform
		return div(gamma(add(x,1)),ZZZ(mul(-2,x)))
	}
	
// Main operations
function cullen(b) {
    return add(mul(b, pow(math.complex(2.0), b)), math.complex(1.0));
}

function mersenne(b) {
    return sub(pow(math.complex(2.0), b), math.complex(1.0));
}

function doubleMersenne(b) {
    return sub(pow(math.complex(2.0), sub(pow(math.complex(2.0), b), math.complex(1.0))), math.complex(1.0));
}

function doublePrimeMersenne(b) {
    return sub(pow(math.complex(2.0), sub(pow(math.complex(2.0), nthPrime(b)), math.complex(1.0)))), math.complex(1.0);
}

function fermat(b) {
    return add(pow(math.complex(2.0), pow(math.complex(2.0), b)), math.complex(1.0));
}

function fermatPrime(b) {
    return fermatPrimeList[Math.max(parseInt(toDouble(b)), 4)]; // Example, update with actual list
}

function proth(a, b) {
    return add(mul(a, pow(math.complex(2.0), b)), math.complex(1.0));
}

function isProthPrime(a, b) {
    return isPrime(add(mul(a, pow(math.complex(2.0), b)), math.complex(1.0)));
}

function thabit(b) {
    return sub(mul(math.complex(3.0), pow(math.complex(2.0), b)), math.complex(1.0));
}

function thabit2(b) {
    return add(mul(math.complex(3.0), pow(math.complex(2.0), b)), math.complex(1.0));
}

function woodall(b) {
    return sub(mul(b, pow(math.complex(2.0), b)), math.complex(1.0));
}

function genWoodall(a, b) {
    return sub(mul(b, pow(a, b)), math.complex(1.0));
}

function isGenWoodallPrime(a, b) {
    return isPrime(sub(mul(b, pow(a, b)), math.complex(1.0)));
}

function hilbert(b) {
    return add(mul(math.complex(4.0), b), math.complex(1.0));
}

function idoneal(b) {
    return idonealList[Math.max(parseInt(toDouble(b)), 65)]; // Example, update with actual list
}

function leyland(a, b) {
    return add(pow(a, b), pow(b, a));
}

function loschian(a, b) {
    return add(add(pow(a, math.complex(2.0)), mul(a, b)), pow(b, math.complex(2.0)));
}

function jacobsthal(b) {
    return div(sub(pow(math.complex(2.0), b), math.cos(mul(math.pi, b))), math.complex(3.0));
}

function jacobsthallucas(b) {
    return sub(pow(math.complex(2.0), b), math.cos(mul(math.pi, b)));
}

function jacobsthaloblong(b) {
    return jacobsthalOblong(b); // Example, update with actual function
}



function pell(b) {
    return div(sub(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), b), mul(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), sub(0,b)), math.cos(mul(math.pi, b)))), mul(math.sqrt(math.complex(2.0)), math.complex(2.0)));
}

function pellLucas(b) {
    return div(sub(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), b), mul(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), sub(0,b)), math.cos(mul(math.pi, b)))), mul(math.sqrt(math.complex(2.0)), math.complex(2.0)));
}



function fibonacci(b) {
    return div(sub(pow(math.complex(1.61803399), b), mul(pow(math.complex(1.61803399), sub(0,b)), math.cos(mul(math.pi, b)))), math.sqrt(math.complex(5.0)));
}

function lucas(b) {
    return sub(pow(math.complex(1.61803399), b), mul(pow(math.complex(1.61803399), sub(0,b)), math.cos(mul(math.pi, b))));
}


function orientedTree(b) {
    return math.round(mul(math.complex(0.22571615379282714232305), div(pow(math.complex(5.64654261623294971289271351621), b), pow(b, div(math.complex(5.0), math.complex(2.0))))));
}

function magic(b) {
    return mul(math.complex(2.0), add(ncr(b, math.complex(1.0)), add(ncr(b, math.complex(2.0)), ncr(b, math.complex(3.0)))));
}

function magicConst(b) {
    return div(mul(b, add(pow(b, math.complex(2.0)), math.complex(1.0))), math.complex(2.0));
}

function alucin(b) {
    return div(div(pow(b, math.complex(3.0))), mul(sub(math.complex(1.0), pow(b, math.complex(2.0))), mul(sub(math.complex(1.0), pow(b, math.complex(3.0))), sub(math.complex(1.0), pow(b, math.complex(4.0))))));
}

function metallicRatio(b) {
    return div(add(b, math.sqrt(add(pow(b, math.complex(2.0)), math.complex(4.0)))), math.complex(2.0));
}

function joukowsky(b) {
    return add(b, div(math.complex(1.0), b));
}

function karmantrefftz(a, b) {
    const expPart = pow(add(b, a), sub(math.complex(2.0), div(globalc, math.pi)));
    const denom = sub(expPart, pow(sub(b, a), sub(math.complex(2.0), div(globalc, math.pi))));
    return div(mul(sub(math.complex(2.0), div(globalc, math.pi)), expPart), denom);
}

function symmetricalJoukowsky(b, a) {
    return mul(math.exp(mul(math.complex(0,1), globalc)), add(sub(b, a), add(div(math.complex(1.0), sub(b, a)), div(mul(math.complex(2.0), pow(a, math.complex(2.0))), add(a, globalc)))));
}

function cayley(b) {
    return div(sub(b, math.complex(0.0, 1.0)), add(b, math.complex(1.0, 0.0)));
}

function bilinear(b) {
    return div(sub(b, math.complex(1.0)), add(b, math.complex(1.0)));
}

function poincareDiscMetric(a, b) {
    return mul(math.complex(2.0), math.atanh(div(sub(a, b), sub(math.complex(1.0), mul(a, math.conj(b))))));
}

function poincareMetric(a, b) {
    return mul(math.complex(2.0), math.atanh(div(sub(a, b), sub(a, math.conj(b)))));
}



function pow(base, exponent) {
    return math.pow(base, exponent);
}

function sigm(x) {
    return div(1.0, add(1.0, math.exp(mul(-1.0, x))));
}

// Main operations
function collatz(b) {
    return add(
        mul(div(b, math.complex(2.0)), pow(math.cos(mul(math.pi, div(b, math.complex(2.0)))), math.complex(2.0))),
        mul(
            add(mul(math.complex(3.0), b), math.complex(1.0)),
            pow(math.sin(mul(math.pi, div(b, math.complex(2.0)))), math.complex(2.0))
        )
    );
}

function zeromosaic(b, a) {
    const quotient = math.round(div(b, a));
    return mul(
        pow(sub(b, mul(a, quotient)), a),
        pow(div(a, math.complex(2.0)), mul(sub(0,a), quotient))
    );
}

function initialmass(b) {
    return mul(
        div(math.complex(79.0), mul(mul(math.complex(500.0), b), math.log(math.complex(10.0)))),
        pow(math.exp(mul(-1.0, div(
            mul(math.complex(5000.0), pow(sub(math.log(b), math.log(math.complex(2.0, 25.0))), math.complex(2.0))),
            mul(mul(math.complex(4761.0), math.log(math.complex(10.0))), math.log(math.complex(10.0)))
        ))), math.complex(1.0))
    );
}

function initialmass2(b) {
    return mul(
        div(math.complex(43.0), mul(mul(math.complex(500.0), b), math.log(math.complex(10.0)))),
        pow(math.exp(mul(-1.0, div(
            mul(math.complex(5000.0), pow(sub(math.log(b), math.log(math.complex(11.0, 50.0))), math.complex(2.0))),
            mul(mul(math.complex(3249.0), math.log(math.complex(10.0))), math.log(math.complex(10.0)))
        ))), math.complex(1.0))
    );
}

function kroupa(a, b) {
    return add(
        mul(pow(a, mul(math.complex(-23.0), div(math.complex(1.0), math.complex(10.0)))), sigm(mul(sub(a, math.complex(0.5)), math.exp(b)))),
        mul(
            math.complex(2.0),
            mul(
                pow(a, mul(math.complex(-13.0), div(math.complex(1.0), math.complex(10.0)))),
                sigm(mul(sub(a, math.complex(0.5)), math.exp(b)))
            )
        )
    );
}

function kroupatoutgilmore(a, b) {
    return add(
        mul(
            pow(a, mul(math.complex(-27.0), div(math.complex(1.0), math.complex(10.0)))),
            sigm(mul(sub(a, math.complex(1.0)), math.exp(b)))
        ),
        mul(
            mul(math.complex(19.0), div(math.complex(1.0), math.complex(1000.0))),
            mul(
                pow(a, mul(math.complex(-11.0), div(math.complex(1.0), math.complex(5.0)))),
                sigm(mul(sub(a, math.complex(1.0)), math.exp(b)))
            )
        )
    );
}

function larsona(b) {
    return mul(pow(b, mul(math.complex(-47.0), div(math.complex(1.0), math.complex(20.0)))), math.exp(div(math.complex(1.0), b)));
}

function larsonb(b) {
    return mul(
        mul(
            pow(math.complex(2.0), mul(math.complex(27.0), div(math.complex(1.0), math.complex(20.0)))),
            pow(add(b, math.complex(1.0)), mul(math.complex(-27.0), div(math.complex(1.0), math.complex(20.0))))
        ),
        div(math.complex(1.0), b)
    );
}

function salpeter(b) {
    return pow(b, mul(math.complex(-47.0), div(math.complex(1.0), math.complex(20.0))));
}

function sigmoid(b) {
    return sigm(b);
}

function generalizedlogistic(b, a) {
    return pow(add(math.complex(1.0), math.exp(mul(math.complex(-1.0), b))), mul(sub(0,a), math.complex(1.0)));
}

function logisticphi(b, a) {
    return math.equal(b, math.complex(0.0))
        ? math.exp(mul(sub(0,a), math.complex(1.0)))
        : pow(sub(math.complex(1.0), mul(b, a)), div(math.complex(1.0), b));
}

function logisticregression(b) {
    return div(math.complex(1.0), add(math.complex(1.0), math.exp(mul(math.complex(-1.0), b))));
}

function softplus(b) {
    return math.log(add(math.complex(1.0), math.exp(b)));
}

function sobolevatanh(b) {
    return add(math.tanh(b), mul(b, mul(
        div(math.complex(1.0), math.cosh(b)),
        div(math.complex(1.0), math.cosh(b))
    )));
}

function swish(b) {
    return div(b, add(math.complex(1.0), math.exp(mul(math.complex(-1.0), b))));
}

function fermidirac(b) {
    return div(math.complex(1.0), add(math.exp(b), math.complex(1.0)));
}

function boseeinstein(b, a) {
    return div(pow(b, a), sub(math.exp(sub(b, globalc)), math.complex(1.0)));
}

function einstein1(b) {
    return div(mul(b, b, math.exp(b)), pow(sub(math.exp(b), math.complex(1.0)), math.complex(2.0)));
}

function einstein2(b) {
    return div(b, sub(math.exp(b), math.complex(1.0)));
}

function einstein3(b) {
    return math.log(sub(math.complex(1.0), math.exp(mul(math.complex(-1.0), b))));
}

function einstein4(b) {
    return sub(
        div(b, sub(math.exp(b), math.complex(1.0))),
        math.log(sub(math.complex(1.0), math.exp(mul(math.complex(-1.0), b))))
    );
}

function probit(a, b) {
    return mul(
        math.sqrt(math.complex(2.0)),
        mul(
            a,
            add(
                mul(math.sqrt(math.pi), div(b, math.complex(2.0))),
                mul(
                    div(mul(b, b, b, math.pi), math.complex(12.0)),
                    add(
                        div(
                            mul(pow(sub(math.complex(2.0), b), math.complex(5.0)), math.complex(7.0)), 
                            mul(math.pi, math.complex(480.0))
                        ),
                        div(
                            mul(pow(sub(math.complex(2.0), b), math.complex(7.0)), math.complex(127.0)),
                            mul(math.pi, mul(math.complex(40320.0), math.pi))
                        )
                    )
                )
            )
        )
    );
}

function logitlogistic(a, b) {
    return div(a, add(math.complex(1.0), math.exp(mul(math.complex(-1.0), b))));
}

function cloglog(b) {
    return mul(-1.0, math.log(mul(-1.0, math.log(sub(math.complex(1.0), math.exp(mul(math.complex(-1.0), b)))))));
}

function gompertz(a, b) {
    return math.exp(mul(-1.0, math.exp(mul(sub(0,a), sub(b, math.complex(1.0))))));
}

function log_logistic(a, b) {
    return div(math.complex(1.0), add(math.complex(1.0), pow(div(b, a), math.complex(-1.0))));
}

function logistic_exponential(a, b) {
    return div(mul(a, math.exp(b)), add(math.complex(1.0), math.exp(b)));
}

function log_odds(b) {
    return math.log(div(b, sub(math.complex(1.0), b)));
}

function pi() {
    return math.complex(math.pi);
}

// Main functions
function rastrigin(a, b) {
    const ten = math.complex(10.0);
    const twoPi = mul(math.complex(2.0), pi());
    return add(
        mul(ten, math.complex(2.0)),
        add(
            sub(mul(a, a), mul(ten, math.cos(mul(twoPi, a)))),
            sub(mul(b, b), mul(ten, math.cos(mul(twoPi, b))))
        )
    );
}

function ackley(a, b) {
    const negTwenty = math.complex(-20.0);
    const e = math.e;
    const half = math.complex(0.5);
    const expTerm = math.exp(mul(negTwenty, math.sqrt(mul(half, add(mul(a, a), mul(b, b))))));
    const cosTerm = math.exp(mul(0.5, add(math.cos(mul(math.complex(2.0), pi(), a)), math.cos(mul(math.complex(2.0), pi(), b)))));
    return add(
        sub(expTerm, cosTerm),
        add(e, math.complex(20.0))
    );
}

function sphere(a, b) {
    return add(mul(a, a), mul(b, b));
}

function rosenbrock(a, b) {
    const hundred = math.complex(100.0);
    return add(
        mul(hundred, pow(sub(b, mul(a, a)), 2)),
        pow(sub(math.complex(1.0), a), 2)
    );
}

function beale(a, b) {
    return add(
        pow(sub(add(math.complex(1.5), mul(sub(a, mul(a, b)), b)), mul(a, b)), 2),
        add(
            pow(sub(add(math.complex(2.25), mul(sub(a, mul(a, b)), mul(b, b))), mul(a, mul(b, b))), 2),
            pow(sub(add(math.complex(2.625), mul(sub(a, mul(a, b)), mul(b, b, b))), mul(a, mul(b, b, b))), 2)
        )
    );
}

function goldsteinprice(a, b) {
    const one = math.complex(1.0);
    const thirty = math.complex(30.0);
    const nineteen = math.complex(19.0);
    const fourteen = math.complex(14.0);
    const three = math.complex(3.0);
    const eighteen = math.complex(18.0);
    const thirtyTwo = math.complex(32.0);
    const twelve = math.complex(12.0);
    const fortyEight = math.complex(48.0);
    const thirtySix = math.complex(36.0);
    const twentySeven = math.complex(27.0);

    const term1 = add(
        1,
        mul(pow(add(a, b, 1), 2), add(
            19,
            sub(mul(14, a), mul(3, pow(a, 2))),
            sub(mul(14, b), mul(mul(6, a), b)),
            mul(3, pow(b, 2))
        ))
    );
    const term2 = add(
        30,
        mul(pow(sub(mul(2, a), mul(3, b)), 2), add(
            18,
            sub(mul(32, a), mul(12, pow(a, 2))),
            add(
                fortyEight,
                sub(mul(36, a), mul(mul(3, a), b)),
                mul(27, pow(b, 2))
            )
        ))
    );

    return mul(term1, term2);
}

function booth(a, b) {
    return add(
        pow(sub(add(a, mul(2, b)), math.complex(7.0)), 2),
        pow(sub(add(mul(2, a), b), math.complex(5.0)), 2)
    );
}

function bukin(a, b) {
    const hundred = math.complex(100.0);
    const point01 = math.complex(0.01);
    return add(
        mul(hundred, math.sqrt(math.abs(sub(b, mul(point01, pow(a, 2)))))),
        mul(point01, math.abs(add(a, math.complex(10.0))))
    );
}

function matyas(a, b) {
    return sub(
        mul(math.complex(0.26), add(mul(a, a), mul(b, b))),
        mul(math.complex(0.48), mul(a, b))
    );
}

function levi(a, b) {
    const threePi = mul(math.complex(3.0), pi());
    const twoPi = mul(math.complex(2.0), pi());
    return add(
        pow(math.sin(mul(threePi, a)), 3),
        mul(pow(sub(a, math.complex(1.0)), 2), add(math.complex(1.0), pow(math.sin(mul(threePi, b)), 3))),
        mul(pow(sub(b, math.complex(1.0)), 2), add(math.complex(1.0), pow(math.sin(mul(twoPi, b)), 2)))
    );
}

function himmelblau(a, b) {
    return add(
        pow(sub(mul(a, a), math.complex(11.0)), 2),
        pow(sub(mul(a, mul(b, b)), math.complex(7.0)), 2)
    );
}

function threehump(a, b) {
    return add(
        mul(math.complex(2.0), pow(a, 2)),
        sub(
            mul(math.complex(1.05), pow(a, 4)),
            div(mul(a, pow(a, 4)), math.complex(6.0))
        ),
        add(
            mul(a, b),
            mul(b, b)
        )
    );
}

function easom(a, b) {
    return mul(
        mul(math.cos(a), math.cos(b)),
        math.exp(sub(
            mul(
                math.complex(-1.0),
                add(
                    pow(sub(a, pi()), 2),
                    pow(sub(b, pi()), 2)
                )
            )
        ))
    );
}

function crossintray(a, b) {
    return pow(
        sub(
            math.complex(-0.0001),
            mul(
                math.sin(a),
                math.sin(b),
                math.exp(
                    math.abs(
                        sub(
                            math.complex(100.0),
                            div(math.sqrt(add(pow(a, 2), pow(b, 2))), pi())
                        )
                    )
                )
            )
        ),
        math.complex(0.1)
    );
}
function eggholder(a, b) {
    const fortySeven = math.complex(47.0);
    return mul(
        math.complex(-1.0),
        add(
            mul(add(b, fortySeven), math.sin(math.sqrt(math.abs(add(div(a, math.complex(2.0)), fortySeven))))),
            mul(math.sin(math.sqrt(math.abs(sub(a, add(b, fortySeven))))), math.complex(-1.0))
        )
    );
}

function holdertable(a, b) {
    return mul(
        math.complex(-1.0),
        math.abs(
            mul(math.sin(a), math.cos(b),
            math.exp(math.abs(sub(math.complex(1.0), div(math.sqrt(add(pow(a, 2), pow(b, 2))), pi()))))
        ))
    );
}

function mccormick(a, b) {
    return add(
        math.sin(add(a, b)),
        add(
            pow(sub(a, b), 2),
            add(
                mul(math.complex(-1.5), a),
                add(
                    mul(math.complex(2.5), b),
                    math.complex(1.0)
                )
            )
        )
    );
}

function schaffern2(a, b) {
    const denom = pow(add(math.complex(1.0), mul(math.complex(0.001), add(pow(a, 2), pow(b, 2)))), 2);
    return div(
        sub(pow(math.sin(sub(pow(a, 2), pow(b, 2))), 2), math.complex(0.5)),
        denom
    );
}

function schaffern4(a, b) {
    const denom = pow(add(math.complex(1.0), mul(math.complex(0.001), add(pow(a, 2), pow(b, 2)))), 2);
    return div(
        sub(pow(math.cos(math.sin(math.abs(sub(pow(a, 2), pow(b, 2))))), 2), math.complex(0.5)),
        denom
    );
}

function styblinskitang(a, b) {
    const sixteen = math.complex(16.0);
    const five = math.complex(5.0);
    return div(
        add(
            add(
                sub(pow(a, 4), mul(sixteen, a)),
                add(five, a)
            ),
            add(
                sub(pow(b, 4), mul(sixteen, b)),
                add(five, b)
            )
        ),
        math.complex(2.0)
    );
}

function mihrasbird(a, b) {
    return add(
        mul(math.sin(b), math.exp(pow(sub(math.complex(1.0), math.cos(a)), 2))),
        add(
            mul(math.sin(a), math.exp(pow(sub(math.complex(1.0), math.cos(b)), 2))),
            pow(sub(a, b), 2)
        )
    );
}

function townsend(a, b) {
    return sub(
        math.complex(-1.0),
        add(
            pow(math.cos(mul(sub(a, math.complex(0.1)), b)), 2),
            mul(a, math.sin(add(mul(math.complex(3.0), a), b)))
        )
    );
}

function gomezlevi(a, b) {
    const four = math.complex(4.0);
    const twoPointOne = math.complex(2.1);
    const six = math.complex(6.0);
    return add(
        add(
            mul(four, pow(a, 2)),
            sub(
                mul(twoPointOne, pow(a, 4)),
                div(pow(a, 5), six)
            )
        ),
        add(
            mul(a, b),
            sub(
                mul(four, pow(b, 2)),
                mul(four, pow(b, 4))
            )
        )
    );
}

function simionescu(a, b) {
    return mul(math.complex(0.1), mul(a, b));
}

function griewank(a, b) {
    const sum = add(pow(a, 2), pow(b, 2));
    return add(
        math.complex(1.0),
        sub(
            div(sum, math.complex(4000.0)),
            mul(math.cos(a), math.cos(div(b, math.sqrt(math.complex(2.0)))))
        )
    );
}

function schwefel221(a, b) {
    return mul(math.complex(0.01), add(math.abs(a), math.abs(b)));
}

function schwefel222(a, b) {
    return math.max(math.abs(a), math.abs(b));
}

function bird(a, b) {
    return add(
        mul(math.sin(a), math.exp(pow(sub(math.complex(1.0), math.cos(b)), 2))),
        add(
            mul(math.cos(b), math.exp(pow(sub(math.complex(1.0), math.sin(a)), 2))),
            pow(sub(a, b), 2)
        )
    );
}

function alpine(a, b) {
    return add(
        math.abs(add(mul(a, math.sin(a)), mul(math.complex(0.1), a))),
        math.abs(add(mul(b, math.sin(b)), mul(math.complex(0.1), b)))
    );
}

function sdp(a, b) {
    return add(
        pow(math.abs(a), 2),
        pow(math.abs(b), 3)
    );
}

function sumsquaresonsphere(a, b) {
    return add(
        add(
            pow(a, 2),
            pow(b, 2)
        ),
        sub(
            sub(
                math.cos(mul(math.complex(18.0), a, pi())),
                math.cos(mul(math.complex(18.0), b, pi()))
            )
        )
    );
}

function michalewicz(a, b) {
    const m = math.round(a); // rounding a to nearest integer for use in the loop
    let sum = math.complex(0.0);
    for (let i = 1; i <= m; i++) {
        sum = add(sum, mul(
            math.sin(b),
            pow(math.sin(mul(i, b, b, div(math.pi, m))), mul(2, m))
        ));
    }
    return mul(math.complex(-1.0), sum);
}

function booths(a, b) {
    return add(
        pow(add(a, mul(math.complex(2.0), b), math.complex(-7.0)), 2),
        pow(add(mul(math.complex(2.0), a), b, math.complex(-5.0)), 2)
    );
}

function sumsquares(a, b) {
    return add(
        pow(a, 2),
        pow(b, 2)
    );
}

function bohachevsky(a, b) {
    return add(
        add(
            pow(a, 2),
            mul(math.complex(2.0), pow(b, 2))
        ),
        add(
            mul(math.complex(-0.3), math.cos(mul(math.complex(3.0), pi(), a))),
            add(
                mul(math.complex(-0.4), math.cos(mul(math.complex(4.0), pi(), b))),
                math.complex(0.7)
            )
        )
    );
}

function sixhumpcamel(a, b) {
    return add(
        mul(
            add(
                math.complex(4.0),
                sub(mul(math.complex(-2.1), pow(a, 2)), div(pow(a, 4), math.complex(3.0)))
            ),
            pow(a, 2)
        ),
        add(
            mul(a, b),
            mul(
                sub(
                    math.complex(-4.0),
                    mul(math.complex(4.0), pow(b, 2))
                ),
                pow(b, 2)
            )
        )
    );
}

function shubert(a, b) {
    let sum1 = math.complex(0.0);
    let sum2 = math.complex(0.0);
    for (let i = 1; i <= 5; i++) {
        sum1 = add(
            sum1,
            mul(i, math.cos(add(mul(add(i, math.complex(1.0)), a), i)))
        );
        sum2 = add(
            sum2,
            mul(i, math.cos(add(mul(add(i, math.complex(1.0)), b), i)))
        );
    }
    return mul(sum1, sum2);
}

function acosc(b) {
    const const1 = math.complex(2.798386045783887);
    const const2 = math.complex(0.33650841691839534);
    const const3 = math.complex(-0.33650841691839534);
    const const4 = math.complex(3.0 * 2.798386045783887 * -0.33650841691839534);

    let fi = sub(
        const1,
        pow(div(mul(math.complex(2.0), add(b, const2)), const2), math.complex(0.5))
    );

    fi = sub(
        fi,
        div(mul(math.complex(2.0), add(b, const2)), const4)
    );

    for (let i = 0; i < 5; i++) {
        const fiDenom = div(
            sub(math.cos(fi), fi),
            mul(div(sub(math.sin(fi), math.cos(fi)), fi), fi)
        );

        fi = add(fi, div(
            sub(b, div(math.cos(fi), fi)),
            fiDenom
        ));
    }

    return fi;
}

function acosq(b) {
    return acosc(mul(
        math.complex(0, 1),
        div(pi(), math.complex(4.0))
    ,b));
}

function asinc(b) {
    const bs = sub(math.complex(1.0), b);
    let fi = div(
        mul(math.sqrt(mul(math.complex(6.0), bs)), math.sin(bs)),
        bs
    );

    for (let i = 0; i < 5; i++) {
        const fiDenom = div(
            sub(math.cos(fi), math.sin(fi)),
            mul(div(sub(math.sin(fi), math.cos(fi)), fi), fi)
        );

        fi = add(fi, div(
            sub(b, div(math.sin(fi), fi)),
            fiDenom
        ));
    }

    return fi;
}

function dedekindeta(z) {
 
    const eulerConstant = eulerc();
    const exponent = mul(math.complex(2.0), z, pi(), math.complex(0,1));
    const q = pow(eulerConstant, exponent);
    let p = pow(q, div(math.complex(1.0), math.complex(24.0)));
    


    for (let id = 1; id < 20; id++) {
        const qi = pow(q, math.complex(id));
        p = mul(p, sub(math.complex(1.0), qi));
    }

    return p;
}

function einsteinseries(a, b) {
    let fi = math.complex(0);
    const limit = math.complex(bign/2);
    
    for (let i = -limit; i < limit; i++) {
        for (let j = -limit; j < limit; j++) {
            if (i !== 0 || j !== 0) {
                const denominator = pow(add(i,mul(j ,b)), a);
                if (denominator !== 0) {
                    fi = add(fi, div(math.complex(1), denominator));
                }
            }
        }
    }
    
    return fi;
}

// Fourier Einstein function
function fouriereinstein(a, b) {
    return mul(einsteinseries(a, b), math.complex(2.0), ZZZ(a));
}


function casin(x){return div(asin(x),x);}
function cacos(x){return div(acos(x),x);}
function catan(x){return div(atan(x),x);}
function casec(x){return div(asec(x),x);}
function cacsc(x){return div(acsc(x),x);}
function cacot(x){return div(acot(x),x);}


// Define ZZZ function based on your actual implementation
function ZZZ(x) {
        return mul(div(math.complex(1.0), sub(math.complex(1.0), pow(math.complex(2.0), sub(math.complex(1.0), x)))),dirichleteta(x));
}

function laurentexpansion(a,c,z) {
    let fi = math.complex(0);
    for (let i = 1; i < 30; i++) {
        fi =  add(pow(mul(sub(z,c),a),math.complex(i)), fi);
    }
return fi;
}
function lcm(a, b) {
    return math.abs(a * b) / gcd(a, b);
}
function gcd(a, b) {
    a = abs(a);
    b = abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}
function totient(n) {
    let result = n;
    for (let p = 2; p * p <= n; p++) {
        if (n % p === 0) {
            while (n % p === 0) {
                n /= p;
            }
            result -= result / p;
        }
    }
    if (n > 1) {
        result -= result / n;
    }
    return result;
}

function multifactorial(a,x){
return mul(pow(a,div(sub(x,1),a)),div(factorial(div(x,a)),factorial(div(1,a))))	
}

function abs(x){return Math.abs(x);}

function lfunc(x,q=1){
	let fi=math.complex(0,1);
	for(let n=1;n<bign;n++)fi=add(fi,div(dirichletchar(x,m),pow(n,x)));
	return fi;
}

// Dirichlet Character function
function dirichletchar(a, b) {
    return (abs(gcd(a, b)) === 1) ? math.complex(1.0) : math.complex(0.0);
}
function ncr(n, r) 
{ 
	if(Number.isInteger(n)){return facti(n) / (facti(r) * facti(n - r))}; 

    return div(factorial(n) , mul(factorial(r) , factorial(sub(n , r)))); 
} 
function npr(n, r) 
{ 
    if(Number.isInteger(n)){ 
        return facti(n) / facti(n - r);
    }

    return div(factorial(n), factorial(sub(n, r)));
}

function fallingfactorial(n, r) 
{
    if(Number.isInteger(n)) {
        let result = 1;
        for(let i = 0; i < r; i++) {
            result *= (n - i);
        }
        return result;
    }

    // For nonsub(0,i)ntegers, using math.js functions:
    return div(factorial(n), factorial(sub(n, r)));
}

function pochhammer(x,n){
	 return div(gamma(add(n, x)),gamma(x));
}
function hankelsymbol(v,n){
	 return div(mul(pow(-1,n),math.cos(mul(pi(),v)),gamma(sub(add(0.5,n), v)),gamma(add(m, v,0.5))),mul(gamma(n),pi()));
}
function krampsymbol(a,b,c){
	 return div(mul(pow(b,a),gamma(add(a,div(c,b)))),gamma(div(c,b)));
}

// Returns factorial of n 
function facti(n) 
{ 
      if(n==0 || n==1)
      return 1;
    var res = 1; 
    for (var i = 2; i <= n; i++) 
        res = res * i; 
    return res; 
} 
// Dirichlet Eta function
function dirichleteta(b) {
    let t = math.complex(0);
    let fi = math.complex(0);
    
    for (let i = 0; i < bign; i++) {
        t = math.complex(0);
        for (let j = 0; j <= i; j++) {
            t = add(t, mul(ncr(i, j), div(pow(-1.0, j), pow(j + 1.0, b))));
        }
        fi = add(fi, div(t, pow(2.0, i + 1.0)));
    }
    
    return fi;
}

function dirichletbeta(b) {
    b = math.complex(b); // Ensure b is complex
    let fi = math.complex(0);
    let mul = math.complex(1);

    if (b.re <= 0.5) {
        // Calculate multiplication factor
        const piHalf = div(pi(), math.complex(2));
        const bMinus1 = sub( math.complex(1),b);
        mul = mul(
            pow(piHalf, sub(math.complex(0),bMinus1)),
            math.sin(div(mul(pi(), bMinus1), math.complex(2))),
            gamma(bMinus1),dirichletbeta(bMinus1)
        );


return mul;
    }

    // Summation part
    for (let n = 0; n < bign; n++) {
        fi = add(
            fi,
            div(
                pow(-1, n),
                pow(add(2 * n, 1), b)
            )
        );
    }
    
    return fi;
}



function gammad(t, z) {
    return mul(pow(t, sub(z,math.complex(1)) ),math.exp(-t));
}
function gamma(z) {
	return math.gamma(z);
		if(math.complex(z).re<0)return div(sub(0,pi()),mul(z,math.sin(mul(pi(),z)), integral(gammad,0,bign/4,sub(0,z))));

	if(math.complex(z).re<1)return div(sub(pi(),0),mul(z,math.sin(mul(pi(),z)),gamma(sub(1,z))));
return integral(gammad,0,bign/4,z);

    const complexZ = math.complex(z);

    let fi = div(math.exp(mul(-0.577216, complexZ)), complexZ);

    for (let i = 1; i < bign; i++) {
        let term = div(complexZ, i);
        fi = mul(fi, div(math.exp(term), add(1, term)));
    }

    return fi;
}

function jacobitheta1(z, q) {
    let fi = math.complex(0, 0);
    
    for (let n = 0; n < bign; n++) {
        let term = mul(
            pow(-1, n),
            pow(q, pow(n + 0.5, 2)),
            math.sin(mul(2 * n + 1, z))
        );
        fi = add(fi, term);
    }
    
    return mul(fi, 2.0);
}

// Define the jacobitheta2 function
function jacobitheta2(z, q) {
    let fi = math.complex(0, 0);
    
    for (let n = 0; n < bign; n++) {
        let term = mul(
            pow(q, pow(n + 0.5, 2)),
            math.cos(mul(2 * n + 1, z))
        );
        fi = add(fi, term);
    }
    
    return mul(fi, 2.0);
}

// Define the jacobitheta3 function
function jacobitheta3(z, q) {
    let fi = math.complex(1, 0);
    
    for (let n = 1; n < bign; n++) {
        let term = mul(
            pow(q, n * n),
            math.cos(mul(2 * n, z))
        );
        fi = add(fi, term);
    }
    
    return mul(fi, 2.0);
}

// Define the jacobitheta4 function
function jacobitheta4(z, q) {
    let fi = math.complex(1, 0);
    
    for (let n = 1; n < bign; n++) {
        let term = mul(
            pow(-1, n),
            pow(q, n * n),
            math.cos(mul(2 * n, z))
        );
        fi = add(fi, term);
    }
    
    return mul(fi, 2.0);
}

function jinvariant(z) {
    // Calculate a1 and a2
    const a1 = pow(dedekindeta(z), 24.0);
    const a2 = pow(dedekindeta(mul(2.0, z)), 24.0);
    
    // Compute the final result
    const numerator = pow(add(a1, mul(256.0, a2)), 3.0);
    const denominator = mul(1728.0, pow(a1, 2.0), a2);
    
    return div(numerator, denominator);
}
function lemniscaten(b) {
    return div(
        lemniscatem(mul(math.complex(1.0, 1.0), b)),
        mul(math.complex(1.0, 1.0), lemniscatem( b))
    );
}

function lemniscatem(b) {
    let fi = math.complex(b);
    for (let i = 1; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const l = math.complex(mul(2.62205755 , i), mul(2.62205755 , j));
            const term = div(pow(b, 4), pow(l, 4));
            fi = mul(fi, sub(math.complex(1.0), term));
        }
    }
    return fi;
}


function lemniscates(b) {
    return sub(
        pow(lemniscaten(div(b, math.complex(1.0, 1.0))), math.complex(2)),
        mul(math.complex(0, 1), pow(lemniscatem( div(b, math.complex(1.0, 1.0))), math.complex(2)))
    );
}

function lemniscatet(a) {
let b = mul(a,math.complex(0,1));
    return lemniscates(b);
}



function sl(a) {
let b = sub(1.311028775 , a);
    const l1 = lemniscates(b);
    const l2 = lemniscatet(b);
    return div(l1, l2);
}

function cl(x) {
    const l1 = lemniscates(x);
    const l2 = lemniscatet(x);
    return div(l1, l2);
}

function lemniscatetan(b) {
    return div(
        sl(b),
        cl(b)
    );
}

function lemniscatecot(b) {
    return div(
        cl(b),
        sl(b)
    );
}

function lemniscatecsc(b) {
  return div(math.complex(1),sl(s));
}

function lemniscatesec(b) {
 return div(math.complex(1),cl(s));
}

function tlh(b) {
    const fisl = sl(div(b, math.sqrt(2.0)));
    const ficl = cl(div(b, math.sqrt(2.0)));
    return mul(fisl, math.sqrt(div(add(pow(ficl, 2), math.complex(1.0)), add(pow(fisl, 2), mul(ficl, ficl)))));
}

function ctlh(b) {
    const fisl = sl(div(b, math.sqrt(2.0)));
    const ficl = cl(div(b, math.sqrt(2.0)));
    return mul(ficl, math.sqrt(div(add(pow(fisl, 2), math.complex(1.0)), add(pow(fisl, 2), mul(ficl, ficl)))));

   }

function tesseract(x){return mul(mul(x,x),mul(x,x));}
function tesseractroot(x){return pow(x,0.25)};
function penteract(x){return mul(mul(x,x),mul(x,x),x);}
function penteractroot(x){return pow(x,0.2)};

function plex(x){return pow(10,x);}
function minex(x){return pow(10,sub(0,x));}
function ty(x){return mul(10,x);}
function teen(x){return add(10,x);}
function ylion(x){return pow(10,pow(2,add(2,x)));}
function yriad(x){return pow(10000,x);}
function last(x){return pow(10,mul(3,pow(1000,x)));}
function illion(x){return pow(10,mul(3,add(1,x)));}
function illiard(x){return pow(10,mul(6,add(0.5,x)));}
function illiad(x){return pow(10,pow(6,x));}//long scale illion
function illiob(x){return pow(10,add(3,mul(3,pow(10,add(3,mul(3,x))))));}
function exian(x){return pow(6,mul(4,x));}
function eciam(x){return pow(6,mul(4,pow(2,x)));}
//prefixes
function beasta(x){return mul(666,x);}
function beasto(x){return div(x,666);}
//fz
function gar(x){return mul(x,x); }
function fuga(x){return pow(x,pow(x,sub(x,1))); }
function megafuga(x){return tetrbcc(x,x);}
function googo(x){return pow(add(x,x),x);}
function googolple(x){return pow(x,pow(x,pow(x,2)));}
function googople(x,y){return pow(y,pow(mul(2,x),x));}
function ogoogolple(x){return pow(x,pow(mul(2,x),x));}//original googolple

function quecto(x){return mul(pow(10,-30),x);}
function ronto(x){return mul(pow(10,-27),x);}
function yocto(x){return mul(pow(10,-24),x);}
function zepto(x){return mul(pow(10,-21),x);}
function atto(x){return mul(pow(10,-18),x);}
function femto(x){return mul(pow(10,-15),x);}
function pico(x){return mul(pow(10,-12),x);}
function nano(x){return mul(pow(10,-9),x);}
function micro(x){return mul(pow(10,-6),x);}
function milli(x){return mul(pow(10,-3),x);}
function centi(x){return mul(pow(10,-2),x);}
function deci(x){return mul(pow(10,-1),x);}
function unumilli(x){return mul(1.001,x);}
function unidecamilli(x){return mul(1.01,x);}
function unihectomilli(x){return mul(1.1,x);}
function unipentohectomilli(x){return mul(1.5,x);}
function deca(x){return mul(pow(10,1),x);}
function hecto(x){return mul(pow(10,2),x);}
function kilo(x){return mul(pow(10,3),x);}
function myria(x){return mul(10000,x);}
function laka(x){return mul(100000,x);}
function mega(x){return mul(pow(10,6),x);}
function crora(x){return mul(10000000,x);}
function giga(x){return mul(pow(10,9),x);}
function dialogia(x){return mul(pow(10,10),x);}
function tera(x){return mul(pow(10,12),x);}
function peta(x){return mul(pow(10,15),x);}
function exa(x){return mul(pow(10,18),x);}
function guppa(x){return mul(pow(10,20),x);}
function zetta(x){return mul(pow(10,21),x);}
function yotta(x){return mul(pow(10,24),x);}
function minna(x){return mul(pow(10,25),x);}
function ronna(x){return mul(pow(10,27),x);}
function deca(x){return mul(pow(10,30),x);}
function quetta(x){return mul(pow(10,35),x);}
function googola(x){return mul(pow(10,100),x);}

function polygonal(a, b) {
    return div(
        sub(
            mul(sub(a, math.complex(2.0)), pow(b, 2)),
            mul(sub(a, math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function antisidepolygonal(a, b) {
    const term1 = mul(math.complex(8.0), sub(a, math.complex(2.0)));
    const term2 = sub(pow(b, 2), mul(math.complex(4.0), b));
    return div(
        add(math.sqrt(add(term1, term2)), sub(a, math.complex(4.0))),
        sub(mul(math.complex(2.0), a), math.complex(4.0))
    );
}

function antipolygonal(a, b) {
    return antisidepolygonal(a, b);
}

function centeredpolygonal(a, b) {
    return add(
        mul(div(a, math.complex(2.0)), mul(b, sub(b, math.complex(1.0)))),
        math.complex(1.0)
    );
}

function pyramidal(a, b) {
    return div(
        add(
            mul(math.complex(3.0), pow(b, 2)),
            add(
                mul(pow(b, 2), sub(a, math.complex(2.0))),
                sub(mul(math.complex(-1.0), b), sub(a, math.complex(5.0)))
            )
        ),
        math.complex(6.0)
    );
}

function star(b) {
    return add(
        mul(math.complex(6.0), mul(b, sub(b, math.complex(1.0)))),
        math.complex(1.0)
    );
}

function starprime(b) {
    let i = math.complex(0.0);
    while (math.larger(math.abs(i), math.abs(b))) {
        if (isPrime(add(mul(math.complex(6.0), mul(i, sub(i, math.complex(1.0)))), math.complex(1.0)))) {
            i = add(i, math.complex(1.0));
        }
    }
    return i;
}

function superstarprime(b) {
    let i = math.complex(0.0);
    while (math.larger(math.abs(i), math.abs(b))) {
        if (isPrime(add(mul(math.complex(6.0), mul(nthPrime(i), sub(nthPrime(i), math.complex(1.0)))), math.complex(1.0)))) {
            i = add(i, math.complex(1.0));
        }
    }
    return i;
}

function reversesuperstar(b) {
    return add(
        mul(math.complex(6.0), mul(nthPrime(b), sub(nthPrime(b), math.complex(1.0)))),
        math.complex(1.0)
    );
}

function superballot(b) {
    return div(
        mul(math.complex(60.0), gamma(add(mul(math.complex(2.0), b), math.complex(1.0)))),
        mul(gamma(add(b, math.complex(1.0))), gamma(add(b, math.complex(4.0))))
    );
}

function hauyoctahedral(b) {
    return div(
        mul(
            sub(mul(math.complex(2.0), b), math.complex(1.0)),
            sub(mul(math.complex(2.0), pow(b, 2)), add(mul(math.complex(-2.0), b), math.complex(3.0)))
        ),
        math.complex(3.0)
    );
}

function hauyrhombicdodecahedronal(b) {
    return mul(
        sub(mul(math.complex(2.0), b), math.complex(1.0)),
        sub(mul(math.complex(8.0), pow(b, 2)), add(mul(math.complex(-14.0), b), math.complex(7.0)))
    );
}

function hauysquarepyramid(b) {
    return div(
        mul(b, sub(mul(math.complex(4.0), pow(b, 2)), math.complex(1.0))),
        math.complex(3.0)
    );
}

function octahedral(b) {
    return div(
        mul(b, add(mul(math.complex(2.0), pow(b, 2)), math.complex(1.0))),
        math.complex(3.0)
    );
}

function pronic(b) {
    return mul(b, add(b, math.complex(1.0)));
}

function biquadratic(b) {
    return pow(b, 4);
}

function surfolide(b) {
    return pow(b, 5);
}

function secondsurfolide(b) {
    return pow(b, 7);
}

function thirdsurfolide(b) {
    return pow(b, 11);
}

function fourthsurfolide(b) {
    return pow(b, 13);
}

function fifthsurfolide(b) {
    return pow(b, 17);
}

function sixthsurfolide(b) {
    return pow(b, 19);
}

function seventhsurfolide(b) {
    return pow(b, 23);
}

function nthsurfolide(b, a) {
    return pow(b, nthPrime(a + 2.0));
}

function zenzicube(b) {
    return pow(b, 6);
}

function cubicube(b) {
    return pow(b, 9);
}

function zenzizenzizenzic(b) {
    return pow(b, 8);
}

function zenzizenzicube(b) {
    return pow(b, 12);
}

function zenzizenzizenzizenzic(b) {
    return pow(b, 16);
}

function zenzicubicube(b) {
    return pow(b, 18);
}

function zenzizenzizenzicube(b) {
    return pow(b, 24);
}

function nthzenzic(b, a) {
    return pow(b, pow(math.complex(2.0), a));
}

function rhombicdodecahedronal(b) {
    return mul(
        sub(mul(math.complex(2.0), b), math.complex(1.0)),
        sub(mul(math.complex(2.0), pow(b, 2)), add(mul(math.complex(-2.0), b), math.complex(1.0)))
    );
}

function truncoctahedral(b) {
    return add(
        sub(mul(math.complex(16.0), pow(b, 3)), mul(math.complex(33.0), pow(b, 2))),
        add(mul(math.complex(24.0), b), math.complex(-6.0))
    );
}

function trunctetrahedral(b) {
    return div(
        mul(b, sub(mul(math.complex(23.0), pow(b, 2)), add(mul(math.complex(-27.0), b), math.complex(10.0)))),
        math.complex(6.0)
    );
}

function trigonal(b) {
    return div(mul(b, sub(b, math.complex(1.0))), math.complex(2.0));
}

function pentagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(5.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(5.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function hexagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(6.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(6.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function septagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(7.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(7.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function octagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(8.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(8.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function nonagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(9.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(9.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function decaagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(12.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(10.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function dodecagonalgonal(b) {
    return div(
        sub(
            mul(sub(math.complex(12.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(12.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function icosagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(20.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(20.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

function myriagonal(b) {
    return div(
        sub(
            mul(sub(math.complex(10000.0), math.complex(2.0)), pow(b, 2)),
            mul(sub(math.complex(10000.0), math.complex(4.0)), b)
        ),
        math.complex(2.0)
    );
}

// Simplex and Higher Dimensional Functions
function tetrahedral(b) {
    return ncr(add(b, math.complex(2.0)), math.complex(3.0));
}

function pentachoric(b) {
    return ncr(add(b, math.complex(3.0)), math.complex(4.0));
}

function simplex(a, b) {
    return ncr(add(b, a, math.complex(-1.0)), a);
}

// Gnomon Function
function gnomon(b) {
    return add(mul(math.complex(2.0), b), math.complex(1.0));
}

const PI = math.pi;

// Barnes-G Function
function barnesg(b) {
    const aggs = mul(pow(2.0 * PI, div(b, 2.0)),  math.exp(mul(-1, div(add(b, mul(b, add(b, 0.5772156649))), 2.0))));
    let aggt = math.complex(1, 0);

    for (let k = 1; k < bign; k++) {
        aggt = mul(aggt, mul(pow(add(1.0 , div(b,k)), k), math.exp(sub(div(pow(b, 2), mul(2,k)), b))));
    }

    return mul(aggs, aggt);
}

// K-function (Corrected)
function kfunc(x) {
	return exp(sub(derv2(hurwitzzeta,-1,add(x,1)),-0.16542114370045092921));
	return div(pow(gamma(x),sub(x,1)),barnesg(x));
    const aggs = mul(pow(2.0 * PI, div(b, 2.0)), math.exp(mul(-1, div(add(b, mul(b, add(b, 0.5772156649))), 2.0))));
    let aggt = math.complex(1, 0);

    for (let k = 1; k < bign; k++) {
        aggt = mul(aggt, mul(pow(add(1.0 , div(b,k)), k), math.exp(sub(div(pow(b, 2),mul(2,k)), b))));
    }

    return div(pow(gamma(b), sub(b, 1.0)), mul(aggs, aggt));
}
function subfactorial(x){
	return div(incgamma(add(x,1),-1),eulerc);
}

function hurwitzzeta(z,a){
	let fi=math.complex(0,0);
	for(let n=0;n<bign;n++){
		let num =math.complex(0,0);
		for(let k=0;k<=n;k++)
		num=add(num,mul(pow(-1,k),ncr(n,k),pow(add(a,k),sub(1,z))));	
		fi= add(fi,mul(div(1,add(n,1)),num));
	}
	return div(fi,sub(z,1));
}
function hyperfactorial(x) {
	return kfunc(add(x,1));
}
function hermitepoly(n,z){//H_n
	return mul(pow(mul(2,z),n),hypergeometric([mul(n,-0.5),mul(-0.5,sub(n,1))],[],pow(sub(0,z),-2)));
}
function hermitehepoly(n,z){//He_n
	return mul(pow(2,div(n,-2)),hermitepoly(n,div(x,sqrt(2.0))));
}
function rookpoly(m,n,x){
	return mul(factorial(n),pow(x,n),laguerrepoly(n,sub(m,n),div(-1,x)));
}
function nonattackingrooks(m,n,k){
return mul(ncr(m,k),ncr(n,k),factorial(k));
}
function laguerrepoly(n,a,x){
	return mul(ncr(add(n,a),n),confluenthypergeometricm(sub(0,n),add(a,1),x));
}
function telephonenum(n){
	return div(hermitehepoly(n,math.complex(0,1)),pow(math.complex(0,1),n));
}
function charlierpoly(n,x,m){
	return hypergeometric([sub(0,n),sub(0,x)],[],div(-1,m));
}
function wilsonpoly(n,a,b,c,d,tt){
	let t = sqrt(t);
	return mul(pochhammer(add(a,b),n),pochhammer(add(a,c),n),pochhammer(add(a,d),n),hypergeometric([sub(0,n),add(a,b,c,d,n,-1),sub(a,t),add(a,t)],[add(a,b),add(a,c),add(a,d)],1));
}
function askeywilsonpoly(n,x,a,b,c,d,q){
	let t = acos(x);
	return mul(pow(a,sub(0,n)),qpochhammer(add(a,b),q,n),qpochhammer(add(a,c),q,n),qpochhammer(add(a,d),q,n),qhypergeometric([pow(q,sub(0,n)),mul(a,b,c,d,pow(q,sub(n,1))),mul(a,exp(mul(t,math.complex(0,1)))),mul(a,exp(mul(-1,t,math.complex(0,1))))],[mul(a,b),mul(a,c),mul(a,d)],q,q));
}
// Beta Function
function beta(a, b) {
    return div(mul(gamma(a), gamma(b)), gamma(a + b));
}

// Pi number Functiondigamma(x)
function pin(b) {
    return div(pow(gamma(div(1, b)), math.complex(2)), gamma(add(div(1, b), div(1, b))));
}

// Digamma Function (Approximation)
function digamma(b, epsilon=1e-5) {
    const m1 = math.log(gamma(b));
    const m2 = math.log(gamma(add(b , epsilon)));
    return mul(div(sub(m2, m1), epsilon), 1.0);
}

// Trigamma Function (Approximation)
function trigamma(b, epsilon=1e-5) {
    const m1 = math.log(gamma(b));
    const m2 = math.log(gamma(add(b , epsilon)));
    const m3 = math.log(gamma(add(add(b , epsilon) , epsilon)));
    return div(sub(sub(m2, m1), sub(m3, m2)), epsilon*epsilon);
}
function ellipticModulus(a, b) {
    return pow(div(jacobitheta2(a, b) , jacobitheta1(a, b)), math.complex(2));
}

function compEllipticModulus(a, b) {
    return pow(div(jacobitheta4(a, b) , jacobitheta1(a, b)), math.complex(2));
}

function ellipticLambda(a, b) {
    return pow(div(jacobitheta2(a, b) , jacobitheta3(a, b)), math.complex(4));
}

function g2(b) {
    return mul(60.0, einsteinseries(math.complex(4), b));
}

function g3(b) {
    return mul(140.0, einsteinseries(math.complex(6), b));
}

function picardFuchsJ(b) {
    const g2Val = g2(b);
    const g3Val = g3(b);
    return div(pow(g2Val, math.complex(3)), (pow(g2Val, math.complex(3)) - mul(27.0, pow(g3Val, math.complex(2)))));
}

function ellipticDiscriminant(b) {
    const g2Val = g2(b);
    const g3Val = g3(b);
    return sub(pow(g2Val, math.complex(3)), mul(27.0, pow(g3Val, math.complex(2))));
}

function ellipticLambdaStar(a, b) {
    return pow(div(jacobitheta2(a, b), jacobitheta3(a, b )), math.complex(2));
}
function ci(b) {
    return mul(-1.0, integral(cosc, b, bign));
}

function nielsenci(a, b) {
    return mul(sub(0,a), integral(cosc, b, bign));
}

function si(b) {
    return mul(-1.0, integral(sinc, 0, b));
}

function nielsensi(a, b) {
    return mul(sub(0,a), integral(sinc, 0, b));
}

function triintgauxf(b) {
    const integral_cosc = integral(cosc, b, bign);
    const integral_sinc = integral(sinc, 0, b);
    return add(
        mul(
            mul(-1.0, integral_cosc),
            math.sin(b)
        ),
        mul(
            sub(
                div(math.PI, 2.0),
                mul(-1.0, integral_sinc)
            ),
            math.cos(b)
        )
    );
}

function lncos(x,n=1){return pow(math.log(math.cos(x)),n);}
function lnsin(x,n=1){return pow(math.log(math.sin(x)),n);}
function lntan(x,n=1){return pow(math.log(math.tan(x)),n);}
function lnsec(x,n=1){return pow(math.log(math.sec(x)),n);}
function lncot(x,n=1){return pow(math.log(math.cot(x)),n);}
function lncsc(x,n=1){return pow(math.log(math.csc(x)),n);}

function logsin(x){return integral(lnsin,math.complex(0,0),div(pi(),2),x);}
function logcos(x){return integral(lncos,math.complex(0,0),div(pi(),2),x);}
function logtan(x){return integral(lntan,math.complex(0,0),div(pi(),2),x);}
function logsec(x){return integral(lnsec,math.complex(0,0),div(pi(),2),x);}
function logcsc(x){return integral(lncsc,math.complex(0,0),div(pi(),2),x);}
function logcot(x){return integral(lncot,math.complex(0,0),div(pi(),2),x);}



function triintgauxg(b) {
    const integral_cosc = integral(cosc, b, bign);
    const integral_sinc = integral(sinc, 0, b);
    return add(
        mul(
            mul(-1.0, integral_cosc),
            math.cos(b)
        ),
        mul(
            sub(
                div(math.PI, 2.0),
                mul(-1.0, integral_sinc)
            ),
            math.sin(b)
        )
    );
}

// Function for "ein"
function ein(b) {
    return integral(expein, 0, b);
}
function ssi(b) {
    return mul(-1.0, integral(sinhc, 0, b));
}

function shi(b) {
    return mul(-1.0, integral(sind, 0, b));
}
function rec(b){return div(1,b);}
function chi(b) {
    return add(
        0.5772156649,
        sub(
            mul(log(b), integral(coshc, 0, b)),
            integral(rec, 0, b)
        )
    );
}
function expcp(t,nx){
	//return mul(math.exp(div(sub(0,nx[1]),t)),pow(t,sub(nx[0],2)));
	return div(math.exp(mul(-1,nx[1],t)),pow(t,nx[0]))
}
function en(n,b){
	//let fi=mul(pow(b,sub(n,1)),gamma(sub(1,n)));
	//for(let i=0;i<math.complex(n).re)
	//return integral(expcp, 0, 1, [n,b]);
	return integral(expcp, 1, bign, [n,b]);
}
function ei(b) {
    return integral(expc, sub(0,bign), b);
}
function fresnelc(b) {
    return integral(cossqr, 0, b);
}

function fresnels(b) {
    return integral(sinsqr, 0, b);
}

function fresnelt(b) {
    const sinsqrIntegral = integral(sinsqr, 0, b);
    const cossqrIntegral = integral(cossqr, 0, b);
    return div(sinsqrIntegral, cossqrIntegral);
}

function fresnelct(b) {
    const cossqrIntegral = integral(cossqr, 0, b);
    const sinsqrIntegral = integral(sinsqr, 0, b);
    return div(cossqrIntegral, sinsqrIntegral);
}

function fresnelsc(b) {
    return div(1.0, integral(cossqr, 0, b));
}

function fresnelcs(b) {
    return div(1.0, integral(sinsqr, 0, b));
}

function gudermannian(b) {
    return integral(sech, 0, b);
}

function gudermanniani(b) {
    return integral(cosh_inv, 0, b);
}
let gcei1d = 0;
function compellint1d(a) {
return div(1.0,math.sqrt(mul(sub(1.0,mul(a,a)),sub(1.0,mul(mul(a,a),mul(gcei1d,gcei1d)))))) ;
}
function compellint1(a) {
gcei1d=a;
 return integral(compellint1d, 0, 1);

}
function nevthetc(a, b) {
    const K = compellint1(b);
    const Kp = compellint1(math.sqrt(sub(1, pow(b, 2))));
        const Q = math.exp(mul(math.complex(-math.pi), div(Kp, K)));

    let fi = math.complex(0);

    for (let i = 0; i < bign; i++) {
        const term = mul(pow(Q, mul(i, add(i, 1)))
            ,math.cos(div(mul(math.pi, a ,math.complex(2*i+1)), mul(2, K))));
        fi = add(fi, term);
    }

    return mul(
        div(math.sqrt(mul(2, math.pi)), mul(math.sqrt(K), pow(b, math.complex(0.25)))),
        fi
    );
}

// nevthetd function
function nevthetd(a, b) {
    const K = compellint1(b);
    const Kp = compellint1(math.sqrt(sub(1, pow(b, 2))));
        const Q = math.exp(mul(math.complex(-math.pi), div(Kp, K)));

    let fi = math.complex(0);

    for (let i = 1; i < bign; i++) {
        const term = mul(pow(Q, mul(i, i))
            ,(math.cos(div(mul(math.pi, a, math.complex(i)), K))));
        fi = add(fi, term);
    }

    return mul(
        div(math.sqrt(mul(2, math.pi)), mul(2, math.sqrt(K))),
        add(math.complex(1), mul(math.complex(2), fi))
    );
}

// nevthetn function
function nevthetn(a, b) {
    const K = compellint1(b);
    const Kp = compellint1(math.sqrt(sub(1, pow(b, 2))));
      const Q = math.exp(mul(math.complex(-math.pi), div(Kp, K)));

    let fi = math.complex(0);

    for (let i = 1; i < bign; i++) {
        const term = mul(pow(math.complex(-1), i)
            ,(pow(Q, mul(i, i)))
            ,(math.cos(div(mul(math.pi, a , math.complex(i)), K))));
        fi = add(fi, term);
    }

    return mul(
        div(math.sqrt(mul(2, math.pi)), mul(math.sqrt(K), pow(sub(1, b), math.complex(0.25)))),
        add(math.complex(1), mul(math.complex(2), fi))
    );
}

// nevthets function
function nevthets(a, b) {
    const K = compellint1(b);
    const Kp = compellint1(math.sqrt(sub(1, pow(b, 2))));
    const Q = math.exp(mul(math.complex(-1), div(math.pi, Kp)));
    let fi = math.complex(0);

    for (let i = 0; i < bign; i++) {
        const term = mul(pow(math.complex(-1), i)
            ,(pow(Q, mul(i, add(i, 1))))
            ,(math.sin(div(mul(math.pi, a,math.complex(2*i+1)), mul(2, K)))));
        fi = add(fi, term);
    }

    return mul(
        div(
            mul(math.sqrt(mul(2, math.pi)), pow(Q, math.complex(0.25))),
            div(
                math.sqrt(K),
                mul(pow(sub(1, b), math.complex(0.25)), pow(b, math.complex(0.25)))
            )
        ),
        fi
    );
}
function cc(a, b) {
    return nevthetc(a, b);
}

// cs
function cs(a, b) {
    return div(nevthetc(a, b), nevthetd(a, b));
}

// cn
function cn(a, b) {
    return div(nevthetc(a, b), nevthetn(a, b));
}

// cd
function cd(a, b) {
    return div(nevthetc(a, b), nevthetd(a, b));
}

// sc
function sc(a, b) {
    return div(nevthetd(a, b), nevthetc(a, b));
}

// ss
function ss(a, b) {
    return div(nevthetd(a, b), nevthetd(a, b));
}

// sn
function sn(a, b) {
    return div(nevthetd(a, b), nevthetn(a, b));
}

// sd
function sd(a, b) {
    return div(nevthetd(a, b), nevthetd(a, b));
}

// nc
function nc(a, b) {
    return div(nevthetn(a, b), nevthetc(a, b));
}

// ns
function ns(a, b) {
    return div(nevthetn(a, b), nevthetd(a, b));
}

// nn
function nn(a, b) {
    return div(nevthetn(a, b), nevthetn(a, b));
}

// nd
function nd(a, b) {
    return div(nevthetn(a, b), nevthetd(a, b));
}

// dc
function dc(a, b) {
    return div(nevthets(a, b), nevthetc(a, b));
}

// ds
function ds(a, b) {
    return div(nevthets(a, b), nevthetd(a, b));
}

// dn
function dn(a, b) {
    return div(nevthets(a, b), nevthetn(a, b));
}

// dd
function dd(a, b) {
    return div(nevthets(a, b), nevthetd(a, b));
}


function lacunary(a,b) {
    let fi = math.complex(0.0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, pow(b, pow(math.complex(a), i)));
    }
    return fi;
}

// Updated functions
function weberf(b) {
    return div(
        pow(dedekindeta(b), 2),
        mul(dedekindeta(div(b, math.complex(2.0))), dedekindeta(mul(math.complex(2.0), b)))
    );
}

function weberf1(b) {
    return div(
        dedekindeta(div(b, math.complex(2.0))),
        dedekindeta(b)
    );
}

function weberf2(b) {
    return div(
        mul(math.sqrt(math.complex(2.0)), dedekindeta(mul(math.complex(2.0), b))),
        dedekindeta(b)
    );
}

function weberr(a,b) {
    return div(
        mul(pow(math.complex(2.0), div(sub(a,math.complex(1.0)), math.complex(4.0))), qpocinf(pow(b, math.complex(a)), pow(b, mul(math.complex(a), math.complex(2.0))), bign)),
        pow(qpocinf(b, pow(b, 2), bign), math.complex(a))
    );
}

function weberr5(a,b) {
    return div(
        mul(pow(math.complex(2.0), div(sub(math.complex(5.0),math.complex(1.0)), math.complex(4.0))), qpocinf(pow(b, math.complex(a)), pow(b, math.complex(10.0)), bign)),
        pow(qpocinf(b, pow(b, 2), bign), math.complex(5))
    );
}
function todoub(x) {
    return math.number(x);
}

function qnum(a, b) {
    if (math.equal(b, math.complex(1.0, 0))) return a;
    return div(
        sub(math.complex(1.0, 0), pow(b, a)),
        sub(math.complex(1.0, 0), b)
    );
}

function qfac(n, q) {
    let fi = math.complex(1.0, 0);
    for (let i = 1; i <= todoub(n); i++) {
        fi = mul(fi, qnum(math.complex(i, 0), q));
    }
    return fi;
}

function qpocinf(a, q) {
    let fi = math.complex(1.0, 0);
    for (let i = 0; i < bign; i++) {
        fi = mul(fi, sub(math.complex(1.0, 0), mul(a, pow(q, i))));
    }
    return fi;
}

function qexp(q, n) {
    let fi = math.complex(0, 0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, div(pow(n, i), qfac(math.complex(i, 0), q)));
    }
    return fi;
}

function dqexp(q, n) {
    let fi = math.complex(0, 0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, div(pow(n, i), qfac(math.complex(i, 0), q)));
    }
    return fi;
}

function qpoch(a, q, k) {
    let fi = math.complex(1.0, 0);
    if (todoub(k) > 0) {
        for (let i = 0; i <= todoub(k) - 1.0; i++) {
            fi = mul(fi, sub(math.complex(1.0, 0), mul(a, pow(q, i))));
        }
        return fi;
    }
    if (todoub(k) === 0) return math.complex(0, 0);
    if (todoub(k) < 0) {
        for (let i = 1; i <= math.abs(todoub(k)); i++) {
            fi = mul(fi, div(math.complex(1.0, 0), sub(math.complex(1.0, 0), mul(a, pow(q, sub(0,i))))));
        }
        return fi;
    }
    return fi;
}

function accuracy (x){
bign = x;
return 0;
}
function clausencos(a,b) {
    let fi = math.complex(0);
    for (let i = 1; i < bign; i++) {
        fi = add(fi, div(math.cos(mul(b,i)), pow(i, math.complex(a))));
    }
    return fi;
}

function clausensin(a,b) {
    let fi = math.complex(0);
    for (let i = 1; i < bign; i++) {
        fi = add(fi, div(math.sin(mul(b,i)), pow(i, math.complex(a))));
    }
    return fi;
}

function legendrechi(a,b) {
    let fi = math.complex(0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, div(pow(b, math.complex(2 * i + 1)), pow(2 * i + 1, math.complex(a))));
    }
    return fi;
}
function besselj(a, b) {
    let fi = math.complex(0, 0);
    for (let n = 0; n < bign/2; n++) {
        const sign = pow(math.complex(-1.0, 0), n);
        const numerator = mul(sign, pow(div(b, math.complex(2.0, 0)), add(1e-7,a, mul(2.0, n))));
        const denominator = mul(gamma(add(n, math.complex(1.0, 0))), gamma(add(1e-7,a, n, math.complex(1.0, 0))));
        fi = add(fi, div(numerator, denominator));
    }
    return fi;
}

function besselk(a, b) {
    const term1 = besseli(mul(math.complex(-1.0, 0), a), b);
    const term2 = besseli(a, b);
    const numerator = sub(term1, term2);
    const denominator = math.sin(mul(pi(), add(1e-7,a)));
    return mul(div(numerator, denominator), div(pi(), math.complex(2.0, 0)));
}

function besseli(a, b) {
    let fi = math.complex(0, 0);
    for (let n = 0; n < bign/2; n++) {
        const numerator = pow(div(b, math.complex(2.0, 0)), add(1e-7,a, mul(2.0, n)));
        const denominator = mul(gamma(add(n, math.complex(1.0, 0))), gamma(add(1e-7,a, n, math.complex(1.0, 0))));
        fi = add(fi, div(numerator, denominator));
    }
    return fi;
}function bessely(a,b){
	return mul(math.csc(mul(a,pi())),sub(mul(a,pi(),besselj(a,b)),besselj(sub(0,a),b)));
}
function hankel1(a, b) {
    return add(mul(math.complex(0,1),bessely(a,b)),besselj(a,b));
}
function hankel2(a, b) {
    return sub(besselj(a,b),mul(math.complex(0,1),bessely(a,b)));
}
function sphbesseli(a,b){return mul(math.sqrt(div(pi(),add(b,b))),besseli(add(a,0.5),b));}
function sphbesselj(a,b){return mul(math.sqrt(div(pi(),add(b,b))),besselj(add(a,0.5),b));}
function sphbesselk(a,b){return mul(math.sqrt(div(pi(),add(b,b))),besselk(add(a,0.5),b));}
function sphbessely(a,b){return mul(math.sqrt(div(pi(),add(b,b))),bessely(add(a,0.5),b));}
function sphhankel1(a,b){return mul(math.sqrt(div(pi(),add(b,b))),hankel1(add(a,0.5),b));}
function sphhankel2(a,b){return mul(math.sqrt(div(pi(),add(b,b))),hankel2(add(a,0.5),b));}
function ricattibessels(n,x){return mul(x,sphbesselj(n,x));}
function ricattibesselc(n,x){return mul(-1,x,sphbessely(n,x));}
function ricattibesselxi(n,x){return mul(x,sphhankel1(n,x));}
function ricattibesselzeta(n,x){return mul(x,sphhankel2(n,x));}

// Converted functions
function neuman(a, b) {
    const term1 = mul(besselj(a, b), math.cos(mul(pi(), a)));
    const term2 = besselj(mul(math.complex(-1.0, 0), a), b);
    const numerator = sub(term1, term2);
    const denominator = math.sin(mul(pi(), a));
    return div(numerator, denominator);
}

function struve(a, b) {
    let fi = math.complex(0, 0);
    for (let n = 0; n < math.log(bign); n++) {
        const sign = pow(math.complex(-1.0, 0), n);
        const numerator = mul(sign, pow(div(b, math.complex(2.0, 0)), mul(2.0, n)));
        const denominator = mul(gamma(add(n, math.complex(1.5, 0))), gamma(add(a, n, math.complex(1.5, 0))));
        fi = add(fi, div(numerator, denominator));
    }
    return mul(pow(div(b, math.complex(2.0, 0)), add(a, math.complex(1.0, 0))), fi);
}
function struvel(a, b) {
    let fi = math.complex(0, 0);
    for (let n = 0; n < math.log(bign); n++) {
        const sign = 1;
        const numerator = mul(sign, pow(div(b, math.complex(2.0, 0)), mul(2.0, n)));
        const denominator = mul(gamma(add(n, math.complex(1.5, 0))), gamma(add(a, n, math.complex(1.5, 0))));
        fi = add(fi, div(numerator, denominator));
    }
    return mul(pow(div(b, math.complex(2.0, 0)), add(a, math.complex(1.0, 0))), fi);
}
function struvek(a, b) {
    return sub(struve(a,b),struvel(a,b));
}
function struvem(a, b) {
    return sub(struvel(a,b),besseli(a,b));
}
function modc(a, b) {
	let ac = math.complex(a);
	let bc = math.complex(b);
	if (b.re == 0 || b.im == 0){
	return a;}
    return math.complex(math.mod(ac.re, bc.re), math.mod(ac.im, bc.im));
}

function weierstrasselliptic(bn, w, ww) {
	
    let fi =  div(1.0, pow(bn, 2));
    let bgn = math.floor(math.sqrt(bign * 3) / 2);  // Adjust bign if needed
    for (let i = sub(0,bgn); i <= bgn; i++) {
        for (let j = sub(0,bgn); j <= bgn; j++) {
            if (! (i == 0 && j == 0)) {
                let l = add(mul(w, i), mul(ww, j)); // Ensure l is treated as a complex number
                let term1 = div(1.0, pow(sub(bn, l), 2));
                let term2 = div(1.0, pow(l, 2));
                fi = add(fi, sub(term1, term2));
            }
        }
    }
    return fi;
}
function weierstrassellipticd(bn, w, ww) {
	
    let fi = 0;
    let bgn = math.floor(math.sqrt(bign * 3) / 2);  // Adjust bign if needed
    for (let i = sub(0,bgn); i <= bgn; i++) {
        for (let j = sub(0,bgn); j <= bgn; j++) {
     
                let l = add(mul(w, i), mul(ww, j)); // Ensure l is treated as a complex number
                let term1 = div(1.0, pow(sub(bn, l), 3));
                fi = add(fi,term1);
            
        }
    }
    return mul(fi,-2);
}
function weierstrassellipticsigma(bn, w, ww) {
	
    let fi = bn;
    let bgn = math.floor(math.sqrt(bign * 3) / 2);  // Adjust bign if needed
    for (let i = sub(0,bgn); i <= bgn; i++) {
        for (let j = sub(0,bgn); j <= bgn; j++) {
      if (! (i == 0 && j == 0)) {
                let l = add(mul(w, i), mul(ww, j)); // Ensure l is treated as a complex number
                let term1 = mul(sub(1,div(bn,l)),math.exp(add(div(bn,l),div(mul(bn,bn),mul(l,l,2)))));
                
                fi = mul(fi, term1);
            }
        }
    }
    return fi;
}
function weierstrassellipticzeta(bn, w, ww) {

    let fi =  div(1.0, pow(bn, 1));
    let bgn = math.floor(math.sqrt(bign * 3) / 2);  // Adjust bign if needed
    for (let i = sub(0,bgn); i <= bgn; i++) {
        for (let j = sub(0,bgn); j <= bgn; j++) {
            if (! (i == 0 && j == 0)) {
                let l = add(mul(w, i), mul(ww, j)); // Ensure l is treated as a complex number
                let term1 = div(1.0,sub(bn, l));
                let term2 = div(1.0, l);
				 let term3 = div(bn, pow(l, 2));
                fi = add(fi,term3,term1, term2);
            }
        }
    }
    return fi;
}
function weierstrassellipticeta(bn, w, ww) {
	
   return sub( weierstrassellipticzeta(add(randc,bn),w,ww),weierstrassellipticzeta(randc,w,ww));
}
let globw = 1;
let	globww = 1;
function weierzeta(b){
return weierstrassellipticzeta(b,globw,globww);
}
function weierstrassellipticdelta(bn, w, ww) {
	globw = w;
	globww = ww;
   return math.exp(integral(weierzeta,0,bn));
}
function arcweierstrassellipticd(a, b) {
    // Convert a to a complex number and extract real and imaginary parts
    let aComplex = math.complex(a);
    let realA = aComplex.re;
    let imagA = aComplex.im;

    // Calculate the term under the square root
    let term = sub(mul(4.0, pow(b, 3)), realA * b, imagA);

    // Calculate the result
    let result = div(1.0, math.sqrt(term));

    return result;
}
function arcweierstrasselliptic(a, b) {
	return integral(arcweierstrassellipticd,math.complex(bign),b,a);
}
function bickleynaylor(a, b) {
	bngc = a;
	return integral(bickleynaylord,math.complex(0),math.complex(bign),b);
}
let bngc = 0;
function bickleynaylord(a, b) {
    // Ensure a and b are complex if needed
    let aComplex = math.complex(a);
    let bComplex = math.complex(b);

    // Calculate exp(sub(0,a)*cosh(b)) / (cosh(b)^globalc)
    let expTerm = math.exp(mul(sub(0,aComplex), math.cosh(bComplex)));
    let coshTerm = pow(math.cosh(bComplex), bngc);

    // Calculate the result
    let result = div(expTerm, coshTerm);

    return result;
}

function weierstrassauxf1(a, b) {
    // Convert a to complex number if needed
    let aComplex = math.complex(a);
    
    // Calculate the terms
    let term1 = pow(math.cosh(div(mul(aComplex, b) , 2.0)), 2);
    let term2 = sub(1.0, mul(2.0, math.exp(sub(0,aComplex))));
    let term3 = math.cosh(mul(aComplex, b));
    let term4 = math.exp(mul(-2.0 , aComplex));

    // Calculate the result
    let result = div(term1, term2);
    result = add(mul(result, term3), term4);

    return result;
}

function weierstrassauxf2(a, b) {
    // Convert a and b to complex numbers if needed
    let aComplex = math.complex(a);
    let bComplex = math.complex(b);

    // Calculate the terms
    let term1 = pow(math.cos(div(aComplex , 2.0)), 2);
    let term2 = sub(1.0, mul(2.0, math.exp(mul(aComplex, bComplex))));
    let term3 = math.cos(aComplex);
    let term4 = math.exp(mul(2.0, aComplex, bComplex));

    // Calculate the result
    let result = div(term1, term2);
    result = add(mul(result, term3), term4);

    return result;
}

function arcsld(b) {
    // Calculate the result for arcsld
    let term = math.sqrt(add(1.0, pow(b, 4)));
    return div(1.0, add(term, 0.0001));
}

function arcslhd(b) {
    // Calculate the result for arcslhd
    let term = math.sqrt(add(1.0, pow(b, 4)));
    return div(1.0, add(term, 0.0001));
}

function arcsl(b){return integral(arcsld,b,math.complex(1));}
function arccl(b){return integral(arcsld,math.complex(0),b);}
function arcslh(b){return integral(arcslhd,b,math.complex(1));}
function arcclh(b){return integral(arcslhd,math.complex(0),b);}


function slh(b) {
    let w = math.complex(1, 0);
    let divisor = math.sqrt(2.0);
    w = div(w, divisor);

    let term1 = nevthets(b, w);
    let term2 = nevthetd(b, w);
    let term3 = nevthetc(b, w);
    let term4 = nevthetn(b, w);

    return div(mul(term1, term2), mul(term3, term4));
}

function clh(b) {
    let w = math.complex(1, 0);
    let divisor = math.sqrt(2.0);
    w = div(w, divisor);

    let term1 = nevthetc(b, w);
    let term2 = nevthetn(b, w);
    let term3 = nevthets(b, w);
    let term4 = nevthetd(b, w);

    return div(mul(term1, term2), mul(term3, term4));
}



function arcsnd(a, b) {
    let term1 = sub(1.0, mul(b, b));
    let term2 = sub(1.0, mul(a, mul(b, b)));
    let denominator = mul(term1, term2);
    return div(1.0, math.sqrt(denominator));
}

function arccnd(a, b) {
    let term1 = sub(1.0, mul(b, b));
    let term2 = sub(add(a, mul(a, mul(b, b))), 1.0);
    let denominator = mul(term1, term2);
    return div(1.0, math.sqrt(denominator));
}

function arcdnd(a, b) {
    let term1 = sub(1.0, mul(b, b));
    let term2 = add(mul(b, b), sub(a, 1.0));
    let denominator = mul(term1, term2);
    return div(1.0, math.sqrt(denominator));
}

function arccdd(a, b) {
    let term1 = sub(1.0, mul(b, b));
    let term2 = sub(1.0, mul(a, mul(b, b)));
    let denominator = mul(term1, term2);
    return div(1.0, math.sqrt(denominator));
}

function arccsd(a, b) {
    let term1 = add(1.0, mul(b, b));
    let term2 = add(sub(b, a), 1.0);
    let denominator = mul(term1, term2);
    return div(1.0, math.sqrt(denominator));
}

function arcdsd(a, b) {
    let term1 = add(a, mul(b, b));
    let term2 = add(mul(b, b), sub(a, 1.0));
    let denominator = mul(term1, term2);
    return div(1.0, math.sqrt(denominator));
}


function arcsn(a, b) {return integral(arcsnd,math.complex(0),a,b);}
function arccn(a, b) {return integral(arccnd,a,math.complex(1),b);}
function arcdn(a, b) {return integral(arcdnd,a,math.complex(1),b);}
function arcns(a, b) {return integral(arcsnd,math.complex(0),div(1,a),b);}
function arcnc(a, b) {return integral(arccnd,div(1,a),math.complex(1),b);}
function arcnd(a, b) {return integral(arcdnd,div(1,a),math.complex(1),b);}
function arccd(a, b) {return integral(arccdd,a,math.complex(1),b);}
function arccs(a, b) {return integral(arccsd,a,math.complex(bign),b);}
function arcds(a, b) {return integral(arcdsd,a,math.complex(bign),b);}
function arcdc(a, b) {return integral(arccdd,div(1,a),math.complex(1),b);}
function arcsc(a, b) {return integral(arccsd,div(1,a),math.complex(bign),b);}
function arcsd(a, b) {return integral(arcdsd,div(1,a),math.complex(bign),b);}


function erf(b){return mul(2*math.sqrt(pi()),integral(expmsqr,math.complex(0),b));}
function erfc(b){return sub(1,mul(2*math.sqrt(pi()),integral(expmsqr,math.complex(0),b)));}
function erfcx(b){return mul(math.exp(mul(b,b)),sub(1,mul(2*math.sqrt(pi()),integral(expmsqr,math.complex(0),b))));}
function erfi(b){return mul(math.complex(0,-1),mul(2*math.sqrt(pi()),integral(expmsqr,math.complex(0),mul(b,math.complex(0,1)))));}
function dawsondplus(b){return mul(math.sqrt(pi())/2,math.exp(mul(b,b,-1)),erfi(b));}
function dawsondminus(b){return mul(math.sqrt(pi())/2,math.exp(mul(b,b)),erf(b));}
function faddeeva(b){return erfcx(mul(b,math.complex(0,-1)));}
function hilberttransform(b){return mul(2/math.sqrt(pi()),dawsondplus(b));}//hilberttransormofthe gaussian
function hilberttransformsub(b){return mul(2/math.sqrt(pi()),dawsondplus(math.sqrt(b)));}//hilberttransormofthe x^2n e^sub(0,x)^2

function invcerf(k){
	if(k<=0)return 1;
	let fi =0;
	for(let m=0;m<k;m++)fi=fi+((invcerf(k-1-m))*(invcerf(m)))/((2*m+1)*(m+1));//fi=add(fi,div(mul(invcerf(k),invcerf(sub(k,1,m))),add(m,1),add(m,m,1)));
	return fi;
}
function inverf(x){

	let fi = math.complex(0,0);
	for(let k=0;k<bign;k++)fi=add(fi,mul(div(invcerf(k),add(k,k,1)),pow(mul(1.77245385091,x,0.5),add(k,k,1))));
	return fi;
	
}


function lambertwd(a,b){return math.log(add(1,mul(b,sinc(a),math.exp(div(a,math.tan(a))))));}
function lambertw(b){return div(integral(lambertwd,math.complex(0),math.complex(3.1415925),b,50),pi());}

function peritet(b) {
    let lambertW = lambertw(sub(0,math.log(b)));
    let result = div(mul( pi() , math.complex(0.0, -2.0)) , math.log(sub(0,lambertW)));
    return result;
}

function weakexpofactorial(b) {
    return pow(b, gamma(b));
}

function qfunc(b) {
    let arg = div(b, math.sqrt(2.0));
    let integralq = integral(expmsqr,0, arg);
    return sub(0.5, mul(0.5, mul(2.0 / pi(), integralq)));
}

function ramanujantautheta(b) {
    let logGammaTerm1 = math.log(gamma(add(6.0, mul(math.complex(0.0, 1.0), b))));
    let logGammaTerm2 = math.log(gamma(sub(6.0, mul(math.complex(0.0, 1.0), b))));
    let result = sub(mul(-math.log(2.0 * pi()), b), div(sub(logGammaTerm1, logGammaTerm2), 2.0));
    return result;
}
function schlaflian(b) {
    return mul(4.0, pow(math.sin(div(pi(), b)), 2.0));
}

function wexzal(b) {
    let lambertW_pow = lambertw(pow(b, 10.0));
    let log_b = math.log(b);
    let term1 = div(log_b, math.log(lambertW_pow));
    let exponent = add(term1, 1.0);
    let result = lambertw(mul(term1, math.exp(exponent)));
    return result;
}

function dexp(b) {
    return mul(0.5, math.exp(div(mul(b, b), 2.0))
        ,  add(mul(math.sqrt(2.0 * pi()),erf(div(b,math.sqrt(2)))) , 2.0));
}

function serpentine(b) {
    return div(b, add(mul(b, b), 1.0));
}

function witchofagnesi(b) {
    return div(1.0, add(mul(b, b), 1.0));
}
function ssrt(b) {
    return div(math.log(b), lambertw(math.log(b)));
}

function scbrt(b) {
    // Iteratively applying lambertw and exp as described
    let result = mul(b, math.log(b));
    for (let i = 0; i < 8; i++) {
        result = math.exp(lambertw(lambertw(mul(result,math.log(b)))));
    }
    return result;
}
function theta_e(b){
	let fi=b;
	            for (let i = 0; i < 58; i++) {
                const term = mul(math.complex(0, 1), bi, pi() * 2.0 * i);
                fi = add(fi, mul(knthetaa[i], math.exp(term)));

}return fi;}
   function tetr(b) {
            const N = bign; // bign is set to 10000 for this example

            let fi = math.complex(b.re, Math.abs(b.im));
            const bi = math.complex(math.mod(math.re(b), 1.0), math.im(fi));

            for (let i = 0; i < 58; i++) {
                const term = mul(math.complex(0, 1), bi, pi() * 2.0 * i);
                fi = add(fi, mul(knthetaa[i], math.exp(term)));
            }

            const constant = math.complex(0.318132, 1.33724);
            fi = add(constant, pow(math.log(constant), sub(fi, N)));

            for (let i = 0; i < N; i++) {
                fi = math.exp(fi);
            }

            if (b.im < 0.0) {
                fi = math.conj(fi);
            }

            return fi;
        }
		   function tetrq(b,N) {
          

            let fi = math.complex(b.re, Math.abs(b.im));
            const bi = math.complex(math.mod(math.re(b), 1.0), math.im(fi));

            for (let i = 0; i < 58; i++) {
                const term = mul(math.complex(0, 1), bi, pi() * 2.0 * i);
                fi = add(fi, mul(knthetaa[i], math.exp(term)));
            }

            const constant = math.complex(0.318132, 1.33724);
            fi = add(constant, pow(math.log(constant), sub(fi, N)));

            for (let i = 0; i < N; i++) {
                fi = math.exp(fi);
            }

            if (b.im < 0.0) {
                fi = math.conj(fi);
            }

            return fi;
        }
		
		
	   function tetrbcc(a,b) {
            const N = bign; // bign is set to 10000 for this example

            let fi = math.complex(b.re, Math.abs(b.im));
 

            let constant = conj(filog(a));
			
fi = add(constant, pow(math.log(constant), sub(fi, N)));

            for (let i = 0; i < N; i++) {
                fi = pow(a,fi);
            }

            if (b.im < 0.0) {
                fi = math.conj(fi);
            }

            return fi;
        }
function pentts(x) {

    // Constants
    const c1 = math.complex(0.99727185142263340743455208346122, 0);
    const c2 = math.complex(3.36767615671259898023746, 0);
    const c3 = math.complex(-0.045007215859218115832617467992327, 0);
    const c4 = math.complex(0.0088901369292365764437286761921372, 0);
    const c5 = math.complex(0.045713734782598722205971510001068, 0);
    const c6 = math.complex(-0.010706554884752458976051797391420, 0);
    const c7 = math.complex(0.00011329335331439235574805971805731, 0);
    const c8 = math.complex(0.0051620130076806122858704585184006, 0);
    const c9 = math.complex(-0.0012422756898373028878826856222621, 0);
    const c10 = math.complex(-0.00067376885079665208568672130450693, 0);
    const c11 = math.complex(0.00050296665968765950574361816768155, 0);
    const c12 = math.complex(0.000039905534193068199638492988158461, 0);
    const c13 = math.complex(-0.000094623078715532686231662582532929, 0);
    const c14 = math.complex(0.000026746817775170179559855402990613, 0);
    const c15 = math.complex(0.000015560915176630839373361742908680, 0);
    const c16 = math.complex(-0.000014806164180600879049897255662325, 0);
    const c17 = math.complex(-0.0000010862859329576915398646271649914, 0);
    const c18 = math.complex(0.0000059140073162222162194013397871868, 0);
    const c19 = math.complex(-0.00000071091367653831526613315587588080, 0);
    const c20 = math.complex(-0.0000017666311876111783264226773258896, 0);
    const c21 = math.complex(0.00000051445590441872869647430881209296, 0);
    const c22 = math.complex(0.00000036270009896115685098739030842790, 0);
    const c23 = math.complex(-0.00000020971694575358607315821487792583, 0);
    const c24 = math.complex(-0.000000021225391058732913781072384245741, 0);
    const c25 = math.complex(0.000000064546351710396107513893801263449, 0);
    const c26 = math.complex(-0.000000022236468044317568271338433775775, 0);

    // Transformation of the imaginary part
    const imagTransformed = mul(c2, sub(div(math.im(x), c2), math.round(div(math.im(x), c2))));

    // Base term
    const base = add(math.re(x), math.complex(1, 0));
    const z = add(math.complex(math.re(base), 0), mul(math.i, imagTransformed));

    // Polynomial expression using powers of z
    let result = add(
        mul(c1, z),
        mul(c3, pow(z, 2)),
        mul(c4, pow(z, 3)),
        mul(c5, pow(z, 4)),
        mul(c6, pow(z, 5)),
        mul(c7, pow(z, 6)),
        mul(c8, pow(z, 7)),
        mul(c9, pow(z, 8)),
        mul(c10, pow(z, 9)),
        mul(c11, pow(z, 10)),
        mul(c12, pow(z, 11)),
        mul(c13, pow(z, 12)),
        mul(c14, pow(z, 13)),
        mul(c15, pow(z, 14)),
        mul(c16, pow(z, 15)),
        mul(c17, pow(z, 16)),
        mul(c18, pow(z, 17)),
        mul(c19, pow(z, 18)),
        mul(c20, pow(z, 19)),
        mul(c21, pow(z, 20)),
        mul(c22, pow(z, 21)),
        mul(c23, pow(z, 22)),
        mul(c24, pow(z, 23)),
        mul(c25, pow(z, 24)),
        mul(c26, pow(z, 25))
    );

    return result;
}
	
	function pent(x) {
		let n=math.floor(x.re)+2;
		if(n < 0)return add(-1.85035452902718141848345,math.exp(mul(1.86573322813586677933545,add(x,2.2481745))));
		let y = pentts(math.complex(math.mod(x.re,1)-2,x.im));
	for(let i=0;i<n && i<5;i++){y = tetr(y);}
	//	for(let i=0;i<sub(0,n);i++)y = slog(x);
		return y;
	}
function filog(b) {
    // Convert b to a complex number if necessary
    let logB = math.log(b);
    let lambertW = lambertw(sub(0,logB));
    return div(sub(0,lambertW), logB);
}

function bouncingfactorial(b) {
    return div(pow(tetr(math.gamma(add(b,1)), math.gamma(add(b,1))), 2.0)
        , math.gamma(add(b,1)));
}

function dilbertlambda(b) {
    return div(math.sqrt(lambertw(mul(2.0, mul(b, b))))
        , math.sqrt(2.0));
}

function olga(b) {
    return div(b, add(mul(b, b), 1.0));
}

function glog(b) {
    return lambertw(mul(-1.0, div(1.0, b)));
}

function arcshoka(b) {
    return div(math.log(sub(math.exp(b), 1.0)), math.log(sub(math.e, 1.0)));
}

function arctania(b) {
    return add(b, math.log(b), -1.0);
}

function anka(b) {
    return mul(b, math.exp(sub(b, 1.0)));
}

function nemtsov(b, a) {
    return add(b, add(mul(b, mul(b, b)), mul(a, mul(b, mul(b, b)))));
}

function logit(b) {
    return mul(-1, math.log(sub(div(1.0, b), 1.0)));
}

function wrightw(b) {
    return lambertw(math.exp(b));
}

function tania(b) {
    return lambertw(math.exp(add(b, 1.0)));
}

function arctrappmann(b) {
    return sub(b, lambertw(math.exp(b)));
}

function doya(b) {
    return lambertw(mul(b, math.exp(add(b, 1.0))));
}
function factorial(b) {
	if(b==0)return 1;
    return gamma(add(b,1));
}
function nfactorial(b) {
	//console.log(b);
	if(math.complex(b).re<=0)return 0;
	if(b==math.Infinity)return 0;
    return gamma(add(b,1));
}


function incgammad(t,a){
	return mul(pow(t,sub(a,1)),pow(eulerc(),sub(0,t)));
}
function incgamma(a,x){return integral(incgammad,x,bign,a,bign*2);}
function lincgamma(a,x){return integral(incgammad,0,x,a,bign*2);}
function gincgamma(a,y,x){return integral(incgammad,y,x,a,bign*2);}
function gammaq(a,x){return div(incgamma(a,x),gamma(a));}
function gammap(a,x){return div(lincgamma(a,x),gamma(a));}
function et(t,v,a){return div(mul(pow(a,sub(0,v)),math.exp(mul(a,t)),lincgamma(v,mul(a,t))),gamma(v));}
function gammareg(a,z){return div(incgamma(a,z),gamma(a));}
function lgammareg(a,z){return div(lincgamma(a,z),gamma(a));}
function ggammareg(a,x,z){return div(gincgamma(a,x,z),gamma(a));}

function nests(f, x, n) {
    for (let i = 0; i < n; i++) {
        x = f(x);
    }
    return x;
}
function nest(f, x, n) {
	const xx = x;
    for (let i = 0; i < n; i++) {
        x =  math.evaluate(f, { x:x,c:xx});
    }
    return x;
}


function split(func,input){
return math.complex(func(sub(input.re,input.im))+func(input.re+input.im),func(input.re+input.im)-func(sub(input.re,input.im)));
}
function dual(func,input){
return math.complex(func(input.re),input.im*(((func(input.re+1e-7)-func(input.re))/1e-7)));
}
function bireal(func,input){
return math.complex(func(input.re),func(input.im));
}
function splite(func,input){

	let xr = math.complex(input.re,1e-7);
	let xi = math.complex(input.im,1e-7);
	let dif = math.evaluate(func, { x: add(xr,xi) });
	let sdd = math.evaluate(func, { x: sub(xr,xi) });
return	add(add(dif,sdd),mul(sub(dif,sdd),math.complex(0,1)));
}function bireale(func,input){

	let xr = math.complex(input.re,1e-7);
	let xi = math.complex(input.im,1e-7);
	let dif = math.evaluate(func, { x: xr });
	let sdd = math.evaluate(func, { x: xi });
return	add(dif,mul(sdd,math.complex(0,1)));
}
function duale(func,input){
	let xr = math.complex(input.re,1e-7);
	let xi = math.complex(input.re+1e-7,1e-7);
	let dif = div(sub(math.evaluate(func, { x: xi }),math.evaluate(func, { x: xr })),1e-7);
	let sdd = math.evaluate(func, { x: xr });

return add(sdd,mul(dif,math.complex(input.im,0),math.complex(0,1)));


}





function newtonzero(func, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess;
    for (let i = 0; i < maxIter; i++) {
        let f_x = math.evaluate(func, { x: x });
        let f_prime_x = derve(func, x);

        if (Math.abs(f_x) < tolerance) {
            return x; // root found
        }

        x = math.subtract(x, math.divide(f_x, f_prime_x));

        if (Math.abs(f_x) < tolerance) {
            return x;
        }
    }
  //  throw new Error("Max iterations reached, root not found.");
  return x;
}

function newtonfix(func, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess;
    for (let i = 0; i < maxIter; i++) {
        let f_x = sub(math.evaluate(func, { x: x }),x);
        let f_prime_x = sub(derve(func, x),1);

        if (Math.abs(f_x) < tolerance) {
            return x; // root found
        }

        x = math.subtract(x, math.divide(f_x, f_prime_x));

        if (Math.abs(f_x) < tolerance) {
            return x;
        }
    }
  //  throw new Error("Max iterations reached, root not found.");
   return x;
}
function newtoninv(func, y, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess; // Initial guess for the inverse
    for (let i = 0; i < maxIter; i++) {
        let f_x = math.evaluate(func, { x: x }); // Evaluate the function at x
        let f_prime_x = derve(func, x); // Derivative of the function at x

        // Newton's iteration for inverse: x_n+1 = x_n - (f(x_n) - y) / f'(x_n)
        x = math.subtract(x, math.divide(math.subtract(f_x, y), f_prime_x));

        // Check if the result is close enough to the desired value y
        if (Math.abs(math.subtract(f_x, y)) < tolerance) {
            return x; // Return the inverse of y
        }
    }
  //  throw new Error("Max iterations reached, inverse not found.");
   return x;
}
function halleyzero(func, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess;
    for (let i = 0; i < maxIter; i++) {
        let f_x = math.evaluate(func, { x: x });
        let f_prime_x = nthderiv(func, x, 1);
        let f_double_prime_x = nthderiv(func, x, 2);

        // Halley's formula: x_n+1 = x_n - (2 * f(x_n) * f'(x_n)) / (2 * (f'(x_n))^2 - f(x_n) * f''(x_n))
        let numerator = math.multiply(2, math.multiply(f_x, f_prime_x));
        let denominator = math.subtract(math.multiply(2, math.pow(f_prime_x, 2)), math.multiply(f_x, f_double_prime_x));

        x = math.subtract(x, math.divide(numerator, denominator));

        if (Math.abs(f_x) < tolerance) {
            return x; // Root found
        }
    }
	return x;
    throw new Error("Max iterations reached, root not found.");
}

function halleyfix(func, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess;
    for (let i = 0; i < maxIter; i++) {
        let f_x = math.subtract(math.evaluate(func, { x: x }), x); // f(x) - x
        let f_prime_x = math.subtract(nthderiv(func, x, 1), 1); // f'(x) - 1
        let f_double_prime_x = nthderiv(func, x, 2); // f''(x)

        // Halley's formula: x_n+1 = x_n - (2 * f(x_n) * f'(x_n)) / (2 * (f'(x_n))^2 - f(x_n) * f''(x_n))
        let numerator = math.multiply(2, math.multiply(f_x, f_prime_x));
        let denominator = math.subtract(math.multiply(2, math.pow(f_prime_x, 2)), math.multiply(f_x, f_double_prime_x));

        x = math.subtract(x, math.divide(numerator, denominator));

        if (Math.abs(f_x) < tolerance) {
            return x; // Fixed point found
        }
    }
	return x;
    throw new Error("Max iterations reached, fixed point not found.");
}
function halleyinv(func, y, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess;
    for (let i = 0; i < maxIter; i++) {
        let f_x = math.evaluate(func, { x: x });
        let f_prime_x = nthderiv(func, x, 1);
        let f_double_prime_x = nthderiv(func, x, 2);

        // Halley's formula: x_n+1 = x_n - (2 * (f(x_n) - y) * f'(x_n)) / (2 * (f'(x_n))^2 - (f(x_n) - y) * f''(x_n))
        let f_diff = math.subtract(f_x, y);
        let numerator = math.multiply(2, math.multiply(f_diff, f_prime_x));
        let denominator = math.subtract(math.multiply(2, math.pow(f_prime_x, 2)), math.multiply(f_diff, f_double_prime_x));

        x = math.subtract(x, math.divide(numerator, denominator));

        if (Math.abs(f_diff) < tolerance) {
            return x; // Inverse found
        }
    }
	return x;
    throw new Error("Max iterations reached, inverse not found.");
}
function euler(ode, x0, y0, h, steps) {
    let x = x0;
    let y = y0;
    let result = [[x, y]];

    for (let i = 0; i < steps; i++) {
        let dydx = math.evaluate(ode, { x: x, y: y });
        y = math.add(y, math.multiply(h, dydx));
        x = math.add(x, h);
        result.push([x, y]);
    }
    
    return result;
}
function ntheuler(odes, x0, y0, h, steps, N) {
    let x = x0;
    let y = y0.slice();  // Clone the initial array y0 (e.g., [y, dy, ddy, ...])
    let result = [[x, y.slice()]];  // Store the initial condition

    for (let i = 0; i < steps; i++) {
        let hN = h / N;  // Sub-step size
        for (let j = 0; j < N; j++) {
            let yNext = y.slice();  // Copy current values for update

            // Update each component of the array
            for (let k = 0; k < y.length; k++) {
                let dydx = math.evaluate(odes[k], { x: x, y: y });
                yNext[k] = math.add(y[k], math.multiply(hN, dydx));
            }

            // Update x and y for the next sub-step
            x = math.add(x, hN);
            y = yNext.slice();  // Move to the next step with updated values
        }

        result.push([x, y.slice()]);  // Store the result after the full step
    }

    return result;
}
function rungekutta(ode, x0, y0, h=epsilon, steps=bign) {
    let x = x0;
    let y = y0;
    let result = [[x, y]];

    for (let i = 0; i < steps; i++) {
        let k1 = math.evaluate(ode, { x: x, y: y });
        let k2 = math.evaluate(ode, { x: x + h / 2, y: y + h / 2 * k1 });
        let k3 = math.evaluate(ode, { x: x + h / 2, y: y + h / 2 * k2 });
        let k4 = math.evaluate(ode, { x: x + h, y: y + h * k3 });

        y = math.add(y, math.multiply(h / 6, math.add(k1, math.add(math.multiply(2, k2), math.add(math.multiply(2, k3), k4)))));
        x = math.add(x, h);
        
        result.push([x, y]);
    }
    
    return result;
}
function abelj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
return math.evaluate(funcStr, {x:math.subtract(newtoninv(funcStr, bf, initialGuess, bignc), 1)});
}

function invabelj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.add(1, newtoninv(funcStr, bf, initialGuess, bignc))});
}

function schroderj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.divide(newtoninv(funcStr, bf, initialGuess, bignc), a)});
}

function invschroderj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.multiply(a, newtoninv(funcStr, bf, initialGuess, bignc))});
}

function bottcherj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.pow(newtoninv(funcStr, bf, initialGuess, bignc), math.divide(1, a))});
}

function invbottcherj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.pow(newtoninv(funcStr, bf, initialGuess, bignc), a)});
}
function abel(funcStr, a, bf, initialGuess, globalc=2, bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return math.divide(math.log(schroder(funcStr, a, bf, globalc, bignc)), math.log(globalcd));
}

function invabel(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return invschroder(funcStr, a, math.pow(globalcd, bf), globalc, bignc);
}

function bottcher(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return math.pow(globalcd, math.log(schroder(funcStr, a, bf, globalc, bignc)));
}

function invbottcher(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return invschroder(funcStr, a, math.divide(math.log(bf), initialGuess, math.log(globalcd)), globalc, bignc);
}
function invschroder(funcStr, a, bf, initialGuess, globalc=2, bignc=bign, ffgh = 1) {
    let bs = bf;

    try {
        let fi = (bs);
        if (ffgh) {
            fi = (bs);
        } else {
            fi = bs;
        }
let fix = newtonfix(funcStr, bf);
        const globalcd = derve(funcStr, fix);
        fi = math.add(fix, math.multiply(fi, math.pow(globalcd, -bignc)));

        for (let i = 0; i < bignc; i++) {
            fi = math.evaluate(funcStr, {x:fi});
        }
        return fi;
    } catch (error) {
		
        throw new Error('Calculation error: ' + error.message);
    }
}

function fastsuperfunc(funcStr, a, bf, globalc=2, bignc=bign, ffgh = 1) {
    let bs = bf;

    try {
        let fi = (bs);
        if (ffgh) {
            fi = (bs);
        } else {
            fi = (a);
        }
let fix = newtonfix(funcStr, bf);
        const globalcd = derve(funcStr, fix);
        fi = math.add(fix, math.pow(globalcd, math.subtract(math.add(bs, fi), bignc)));

        for (let i = 0; i < bignc; i++) {
            fi = math.evaluate(funcStr, {x:fi});
        }

        return fi;
    } catch (error) {
        throw new Error('Calculation error: ' + error.message);
    }
}
function superfunc(funcStr, a, bf, globalc=2, bignc=bign, ffgh = 1) {
    let bs = bf;

    try {
        let fi = (bs);
        if (ffgh) {
            fi = (bs);
        } else {
            fi = (a);
        }
        let fix = newtonfix(funcStr, bf);
       // let fix = newtonfix(funcStr, fi, 1e-7); // Calculate fix using newtonfix
        let lam = math.evaluate(funcStr, {x:fi});
        
        for (let i = 0; i < bignc; i++) {
            fi = newtoninv(funcStr, fi, initialGuess, bignc); // Use newtoninv
            lam = newtoninv(funcStr, lam, initialGuess, bignc); // Use newtoninv
        }
        
        fi = math.divide(
            math.log(math.multiply(math.subtract(fi, fix), math.pow(globalc, bignc))),
            math.log(globalc)
        );
        lam = math.divide(
            math.log(math.multiply(math.subtract(lam, fix), math.pow(globalc, bignc))),
            math.log(globalc)
        );
        
        fi = math.add(fi, math.multiply(bs, math.subtract(lam, fi)));
        fi = math.add(fix, math.pow(globalc, math.subtract(fi, bignc)));
        
        for (let i = 0; i < bignc; i++) {
            fi = math.evaluate(funcStr, {x:fi});
        }

        scaleCanvas();
        return fi;
    } catch (error) {
        throw new Error('Calculation error: ' + error.message);
    }
}
function superfuncqsp(funcStr, af, bf, globalc=2, bignc=bign, startq=0) {
    let bp = math.complex(af);
    let ap = math.complex(bf);
    ap = math.subtract(ap, bignc);

    let fix = 12;
if(startq!==0)fix=add(startq,math.complex(1e-7,1e-7));else fix = newtonfix(funcStr,bp);
    const d = derve(funcStr, fix);
    const dd = nthderiv(funcStr, fix, 2);

    let o = math.complex(af);
//superfuncqsp("tetr(x)",1,x,i,1,-1.89)
    o = math.add(
        fix,
        math.multiply(
            math.subtract(bp, fix),
            math.pow(d, ap)
        ),
        math.divide(
            math.multiply(
                math.pow(math.subtract(bp, fix), 2),
                math.pow(d, math.subtract(ap, 1)),
                math.subtract(math.pow(d, ap), 1),
                dd
            ),
            math.multiply(2, math.subtract(d, 1))
        )
    );

    for (let i = 0; i < bignc; i++) {
        o = math.evaluate(funcStr, { x: o });
    }

    return o;
}
function superfuncosp(funcStr, af, bf, globalc=2, bignc=bign) {
    let bp = math.complex(af);
    let ap = math.complex(bf);
    ap = math.subtract(ap, bignc);

    let fix = newtonfix(funcStr, bp);

    const d = derve(funcStr, fix);

    let o = math.add(fix, math.multiply(math.subtract(bp, fix), math.pow(d, ap)));

    for (let i = 0; i < bignc; i++) {
        o = math.evaluate(funcStr, { x: o });
    }

    return o;
}

function derv(func,input){
return ((div(sub(func(add(input,1e-7)),func(input)),1e-7)));
}
function derv2(func,input,alt){
return ((div(sub(func(add(input,1e-7),alt),func(input,alt)),1e-7)));
}
function derve(func,input){
return ((div(sub(math.evaluate(func, { x: add(input,1e-7) }),math.evaluate(func, { x: input })),1e-7)));
}
function intg(func,input){
return integral(func,0,input);

}
function intg(func,input,input2){
return integral(func,0,input,input2);

}
function nthderiv(func,input,n){
	const h=pow(10,add(-7,div(n,1.2)));
let fi=math.complex(0,0);
for(let i=0;i<=n;i++)
fi = add(fi,mul(pow(-1,i),ncr(n,i),math.evaluate(func,{x:sub(add(input,div(n,2)),mul(h,i))})));	
return div(fi,pow(h,n));
return fi;
}
function rmod(x,n){return math.complex(math.mod(x.re,n),x.im);}
function rfloor(x,n){return math.complex(math.floor(x.re,n),x.im);}

function fractionalderiv(func,input,n){
const h=pow(10,add(-7,div(n,1.2)));
let fi=math.complex(0,0);
for(let i=0;i<=math.ceil(math.complex(n).re);i++)
fi = add(fi,mul(pow(-1,i),ncr(math.ceil(math.complex(n).re),i),fractionalintg(func,sub(add(input,div(math.ceil(math.complex(n).re),2)),mul(h,i)),sub(1,rmod(math.complex(n),1.00001)))));	
return div(fi,pow(h,math.ceil(math.complex(n).re)));
return fi;
}
function fractionalintg(func,input,m){
	       function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);let sum = math.complex(0,0);      for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0),pow(sub(input,add(a, mul(math.complex(i,0), h))),sub(m,1)),math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));} for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0),pow(sub(input,add(a, mul(math.complex(i,0), h))),sub(m,1)) , math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));}      
        return mul(div(h, math.complex(3,0)), sum);}
    
	return simpsonsRule(0,input,bign);
}
function intge(func,input){
    // Function to handle complex integration
    function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);
        let sum = math.complex(0,0);
        
        for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0), math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));
        }
        
        for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0), math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));
        }
        
        return mul(div(h, math.complex(3,0)), sum);
    }

    // Adaptive Simpson's rule to ensure convergence
          return simpsonsRule(math.complex(0,0),input, bign);
       }
	   function intge(func,input){
    // Function to handle complex integration
    function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);let sum = math.complex(0,0);      for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0), math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));} for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0), math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));}      
        return mul(div(h, math.complex(3,0)), sum);}

    // Adaptive Simpson's rule to ensure convergence
          return simpsonsRule(math.complex(0,0),input, bign);
       }
function ramanujansum(func,input)
{
	    function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);let sum = math.complex(0,0);      for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0), math.evaluate(func, { n:add(a, mul(math.complex(i,0), h)),x:input})));} for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0), math.evaluate(func, { n:add(a, mul(math.complex(i,0), h)),x:input})));}      
        return mul(div(h, math.complex(3,0)), sum);}
		
	let fi= sub(0,simpsonsRule(math.complex(1,0),bign, bign*2));
	
	for(let i=1;i<=bign;i++){
		fi=add(fi,math.evaluate(func, { n: math.complex(i,0) ,x:input}));
	}
	return fi;
}


function summate(func,a,b,x)
{
let fi=math.complex(0,0);
for(let n=a;n<=b;n++)
fi = add(fi,math.evaluate(func,{x:x,n:n}));	
return fi;	
}
function product(func,a,b,x)
{
let fi=math.complex(1,0);
for(let n=a;n<=b;n++)
fi = mul(fi,math.evaluate(func,{x:x,n:n}));	
return fi;	
}
function expo(func,a,b,x)
{
let fi=math.complex(1,0);
for(let n=a;n<=b;n++)
fi = pow(math.evaluate(func,{x:x,n:n}),fi);	
return fi;	
}
function contf(func,a,b,x)
{
let fi=math.complex(1,0);
for(let n=a;n<=b;n++)
fi = add(div(1,fi),math.evaluate(func,{x:x,n:n}));	
return fi;	
}
function comp(func,a,b,x)
{
let fi=x;
for(let n=a;n<=b;n++)
fi = math.evaluate(func,{x:fi,n:n});
return fi;	}
function icomp(func,a,b,x)
{
let fi=x;
for(let n=b;n>=a;n--)
fi = math.evaluate(func,{x:fi,n:n});
return fi;	}
function engel(func,a,b,x)
{
let fi=math.complex(0,0);
for(let n=b;n<=a;n--)
fi = div(add(1,fi),math.evaluate(func,{x:x,n:n}));	
return fi;	
}




function completequotient(x){
	return div(1,sub(x,floor(x)));
}

function zog(b){return mul(b,math.log(b));}

function zechlog(b){return math.log(add(1,b));}
function keller(b){return math.log(add(1,math.exp(add(1,b)),sub(0,eulerc())));}
function arckeller(b){return add(math.log(add(-1,math.exp(b),-1)),-1);}
function shoka(b){return add(b,log(add(exp(sub(0,b)),eulerc(),-1)));}
function fibpoly(n,b){ return  div(sub(pow(add(b,math.sqrt(add(mul(b,b),4))),n),pow(sub(b,math.sqrt(add(mul(b,b),4))),n)),mul(pow(2,n),math.sqrt(add(mul(b,b),4))));}
//function fib(n){return div(sub(pow(1+sqrt(5),n),pow(1-sqrt(5),n))),mul(sqrt(5),pow(2,n)));}
function lucaspoly(n,b){ return mul(pow(2,sub(0,n)),add(pow(add(b,math.sqrt(add(mul(b,b),4))),n),pow(sub(b,math.sqrt(add(mul(b,b),4))),n)));}
	  
function	 chebyshevu(n,b){return div(math.sin(mul(add(1,n),math.acos(b))),sin(acos(b)));}  
function	 chebyshevw(n,b){return div(math.sin(mul(add(n,0.5),math.acos(b))),sin(div(math.acos(x),2)));}//return div(cos(mul(add(1,n),b)),cos(b));}  
function	 chebyshevt(n,b){return  mul(math.sqrt(sub(1,mul(b,b))),chebyshevw(add(n,1),b));}  
function	 chebyshevv(n,b){return mul(math.sqrt(sub(1,mul(b,b))),chebyshevu(sub(n,1),b));}  
function dirichletkernel(n,b){return div(math.sin(mul(0.5,add(add(n,n),1),b)),sin(div(b,2)));}	   
function chebyshevc(n,b){return mul(2,chebyshevt(n,mul(0.5,b)));}
function chebyshevs(n,b){return mul(1,chebyshevu(n,mul(0.5,b)));}
function chebyshevtstar(n,b){return chebyshevt(n,sub(add(b,b),1));}
	function chebyshevustar(n,b){return chebyshevu(n,sub(add(b,b),1));}
	
	
	function dicksond(n,x,a){
		let fi = math.complex(0,0);
		for (let i=0;i<=floor(n/2);i++)
		fi = add(fi,mul(div(n,sub(n,i)),ncr(sub(n,i),i),pow(sub(0,a),i),pow(x,sub(n,add(i,i)))));
	return fi;}
	function dicksone(n,x,a){
		let fi = math.complex(0,0);
		for (let i=0;i<=floor(n/2);i++)
		fi = add(fi,mul(ncr(sub(n,i),i),pow(sub(0,a),i),pow(x,sub(n,add(i,i)))));
	return fi;}
	function dicksongeneral(n,k,x,a){
		let fi = math.complex(0,0);
		for (let i=0;i<=floor(n/2);i++)
		fi = add(fi,mul(div(sub(n,mul(k,i)),sub(n,i)),ncr(sub(n,i),i),pow(sub(0,a),i),pow(x,sub(n,add(i,i)))));
	return fi;}
	/* function brewersum(n,a){
		let fi = math.complex(0,0);
		for (let i=0;i<=floor(n/2);i++)
		fi=add(fi,legendresymbol(dicksond(),p));
	return fi;
	} */
	
	function twoindexharmonic(n,j){
		let fi=math.complex(0,0);
		for(let i=1;i<=math.complex(n).re;i++)
			fi=add(fi,mul(ncr(n,i),pow(-1,sub(i,1)),pow(i,sub(0,j))));
		return fi;
	}
	function harmoniclog(n,t,x){
		let fi=math.complex(0,0);
		for(let j=0;j<=math.complex(t).re;j++)
			fi=add(fi,mul(pow(-1,j),pochhammer(t,j),pow(math.log(x),sub(t,j)),twoindexharmonic(n,j)));
		return mul(pow(x,n),fi);
	}
	function harmonicc(t){
		let fi=math.complex(0,0);
		for(let j=1;j<=bign;j++)
			fi=add(fi,div(math.cos(mul(j,t)),mul(j,j)));
		return fi;
	}
		function harmonics(t){
		let fi=math.complex(0,0);
		for(let j=1;j<=bign;j++)
			fi=add(fi,div(math.sin(mul(j,t)),mul(j,j)));
		return fi;
	}
	
//	function scorergid(t,x){return math.sin(add(div(mul(t,t,t),3),mul(x,t)));}
		function scorergid(t,x){ return mul(math.exp(sub(div(mul(t,t,t),-3),div(mul(t,x),2))),math.cos(add(mul(0.5,math.sqrt(3),x,t),div(pi(),1.5))));}
	function scorerhid(t,x){return math.exp(add(div(mul(t,t,t),-3),mul(x,t)));}
	function scorergi(x){return div(integral(scorergid,0,mul(bign,0.5),x,mul(bign,2)),sub(0,pi()));}
	function scorerhi(x){return div(integral(scorerhid,0,mul(bign,0.5),x,mul(bign,2)),pi());}
	function aid(x){return(derv(ai,x))};
	function bid(x){return(derv(bi,x))};
	function ai(x){
	if(x.re>0) return mul(1/pi(),math.sqrt(div(x,3)),besselk(0.333333333,mul(0.666666666,pow(x,1.5))));
	return mul(math.sqrt(div(sub(0,x),9)),add(besselj(0.33333333,mul(pow(sub(0,x),1.5),0.666666666)),besselj(-0.33333333,mul(pow(sub(0,x),1.5),0.666666666))));}
	function bi(x){
	if(x.re>0) return mul(math.sqrt(div(x,3)),add(besseli(-0.33333333,mul(pow(x,1.5),0.666666666)),besseli(0.33333333,mul(pow(x,1.5),0.666666666))));
	return mul(math.sqrt(div(sub(0,x),3)),sub(besselj(-0.33333333,mul(pow(sub(0,x),1.5),0.666666666)),besselj(0.33333333,mul(pow(sub(0,x),1.5),0.666666666))));}

function airyc(x){return div(bi(x),ai(x));}

function airyzeta(x){let fi=math.complex(0,0);
for(let i=0;i<30;i++)fi=add(fi,pow(math.abs(airyaizero[i]),sub(0,x)));
return fi;
}
function airybizeta(x){let fi=math.complex(0,0);
for(let i=0;i<30;i++)fi=add(fi,pow(math.abs(airybizero[i]),sub(0,x)));
return fi;
}
function sinczeta(x){let fi=math.complex(0,0);
for(let i=0;i<20;i++)fi=add(fi,pow(math.abs(sinczero[i]),sub(0,x)));
return fi;
}
//function airytn(n,z){
	
//}
function qpochhammer(a,q,n){
	let fi=math.complex(1,0);
	for(let i=0;i<n;i++)
	fi=mul(fi,sub(1,mul(a,pow(q,i))));	
	return fi;
}
function infqpochhammer(a,q){
	let fi=math.complex(1,0);
	for(let i=0;i<bign;i++)
	fi=mul(fi,sub(1,mul(a,pow(q,i))));	
	return fi;
}
function multiqpochhammer(A,q,n){
	let fi=math.complex(1,0);
	for(let i=0;i<leng(A);i++)
	fi=mul(fi,qpochhammer(g(A,i),q,i));	
	return fi;
}
function multiinfqpochhammer(A,q){
	let fi=math.complex(1,0);
	for(let i=0;i<leng(A);i++)
	fi=mul(fi,infqpochhammer(g(A,i),q));	
	return fi;
}
function modifiedjacobitheta(x,p){
return mul(infqpochhammer(div(p,x),p),infqpochhammer(x,p));	
}

function polymodifiedjacobitheta(X,p){
	let fi=math.complex(1,0);
	for(let i=0;i<leng(X);i++)
	fi=mul(fi,modifiedjacobithet(g(X,i),p));
return fi;
}
function ellipticshiftedfactorial(x,q,p,n){
let fi=math.complex(1,0);
for(let i=0;i<n;i++)fi=mul(fi,modifiedjacobitheta(mul(x,pow(q,i)),p));
return fi;
}
function polyellipticshiftedfactorial(X,q,p,n){
	let fi=math.complex(1,0);
	for(let i=0;i<leng(X);i++)
	fi=mul(fi,ellipticshiftedfactorial(g(X,i),q,p,n));
return fi;
}

function thetahypergeometric(A,B,q,p,z){//E
let fi=math.complex(0,0);
	for(let n=0;n<bign;n++){
	let nom=pow(z,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,ellipticshiftedfactorial(g(A,i),q,p,n));
	let denom=math.complex(1,0);
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,ellipticshiftedfactorial(g(B,i),q,p,n));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function bilateralthetahypergeometric(A,B,q,p,z){//G
let fi=math.complex(0,0);
	for(let n=sub(0,bign);n<=bign;n++){
	let nom=pow(z,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,ellipticshiftedfactorial(g(A,i),q,p,n));
	let denom=math.complex(1,0);
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,ellipticshiftedfactorial(g(B,i),q,p,n));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function poisedhetahypergeometric(a,A,q,p,z){//V
let fi=math.complex(0,0);
	for(let n=sub(0,bign);n<=bign;n++){
	let nom=mul(pow(z,n),mul(nom,ellipticshiftedfactorial(a,q,p,n)));
		for(let i=0;i<leng(A);i++)
			nom=mul(1,ellipticshiftedfactorial(g(A,i),q,p,n));
	let denom=mul(modifiedjacobitheta(a,p),ellipticshiftedfactorial(q,q,p,n));
		for(let i=0;i<leng(A);i++)
			denom=mul(denom,ellipticshiftedfactorial(div(q,g(A,i)),q,p,n));
	fi=add(fi,div(mul(modifiedjacobitheta(mul(a,pow(q,add(n,n))),p),nom),denom));
	}
	return fi;
}
function ellipticnum(a,s,t){//https://en.wikipedia.org/wiki/Elliptic_hypergeometric_series
	return  div(jacobitheta1(mul(pi(),s,a),math.exp(mul(pi(),math.complex(0,1),t))),jacobitheta1(mul(pi(),s),math.exp(mul(pi(),math.complex(0,1),t))));
}
function additiveellipticshifteddactorial(a,s,t,n){
	let fi=math.complex(1,0);
	for(let i=0;i<n;i++)fi=mul(fi,ellipticnum(add(a,i),s,t));
	return fi;
}
function polyadditiveellipticshifteddactorial(A,s,t,n){
	let fi=math.complex(1,0);
	for(let i=0;i<leng(A);i++)fi=mul(fi,additiveellipticshifteddactorial(g(A,i),s,t,n));
	return fi;
}
function additivethetahypergeometric(A,B,q,p,z){//e
let fi=math.complex(0,0);
	for(let n=0;n<bign;n++){
	let nom=pow(z,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,additiveellipticshifteddactorial(g(A,i),q,p,n));
	let denom=math.complex(1,0);
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,additiveellipticshifteddactorial(g(B,i),q,p,n));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function additivebilateralthetahypergeometric(A,B,q,p,z){//g
let fi=math.complex(0,0);
	for(let n=sub(0,bign);n<=bign;n++){
	let nom=pow(z,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,additiveellipticshifteddactorial(g(A,i),q,p,n));
	let denom=math.complex(1,0);
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,additiveellipticshifteddactorial(g(B,i),q,p,n));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function additivepoisedhetahypergeometric(a,A,q,p,z){//v 
let fi=math.complex(0,0);
	for(let n=sub(0,bign);n<=bign;n++){
	let nom=mul(pow(z,n),mul(1,additiveellipticshifteddactorial(a,q,p,n)));
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,additiveellipticshifteddactorial(g(A,i),q,p,n));
	let denom=mul(ellipticnum(add(a,n,n),q,p),additiveellipticshifteddactorial(q,q,p,n));
		for(let i=0;i<leng(A);i++)
			denom=mul(denom,additiveellipticshifteddactorial(div(q,g(A,i)),q,p,n));
	fi=add(fi,div(mul(ellipticnum(a,q,p),nom),denom));
	}
	return fi;
}



function askeywilsonpoly(n,x,a,b,c,d,q){
	return mul(pow(a,sub(0,n)),multiqpochhammer([mul(a,b),mul(a,c),mul(a,d)],q,n),qhypergeometric([pow(q,sub(0,n)),mul(a,b,c,d,pow(q,sub(n,1))),mul(a,exp(mul(math.complex(0,1),acos(x)))),mul(a,exp(mul(-1,math.complex(0,1),acos(x))))],[mul(a,b),mul(a,c),mul(a,d)],q,q))
	
}
function koornwinderpoly(X,a,b,c,d,q,t){
	fi=math.complex(1,0);
	for(i=0;i<leng(X);i++)
	fi=mul(fi,div(multiinfqpochhammer([sqr(g(X,i)),div(1,sqr(g(X,i)))],q),multiinfqpochhammer([mul(a,g(X,i)),div(a,g(X,i)), mul(b,g(X,i)),div(b,g(X,i)), mul(c,g(X,i)),div(c,g(X,i)), mul(d,g(X,i)),div(d,g(X,i))],q)));	
	for(i=0;i<leng(X)-1;i++)
	for(j=i+1;j<leng(X);j++)
	fi=mul(fi,div(multiinfqpochhammer([mul(g(X,i),g(X,j)),div(g(X,i),g(X,j)),div(g(X,j),g(X,i)),div(1,g(X,i),g(X,j))],q),multiinfqpochhammer([mul(t,g(X,i),g(X,j)),mul(t,g(X,i),div(g(X,j))),mul(t,g(X,j),div(g(X,i))),div(t,g(X,i),g(X,j))],q)));
	return fi;
}

function leng(A) {
    try {
        if (A._data !== undefined) return A._data.length;
        return A.length;
    } catch (e) {
        return 0;
    }
}

function g(A, n ,w=0) {
    try {
        if (A._data !== undefined) return A._data[n];
        return A[n];
    } catch (e) {
        return w;
    }
}
function polynomial(A,x){
	let fi=math.complex(0,0);
	//console.log((A._data).length);
	for(let i=0;i<leng(A);i++){
	//	console.log(i);
	fi = add(fi,mul(pow(x,i),g(A,i)));}
return fi;
}
function hypergeometric(A,B,x){
	let fi=math.complex(0,0);
	for(let n=0;n<bign;n++){
	let nom=pow(x,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,pochhammer(g(A,i),n));
	let denom=facti(n);
	
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,pochhammer(g(B,i),n));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function hypg00(c){return hypergeometric([],[],c);}
function hypg10(a,c){return hypergeometric([a],[],c);}
function hypg01(b,c){return hypergeometric([],[b],c);}
function hypg11(a,b,c){return hypergeometric([a],[b],c);}
function hypg21(a,aa,b,c){return hypergeometric([a,aa],[b],c);}
function hypg12(a,b,bb,c){return hypergeometric([a],[b,bb],c);}

function jacobipoly(n,a,b,x){
	return div(hypergeometric([sub(0,n),add(1,b,n)],[add(a,1)],div(sub(x,1),-2)),div(factorial(n),pochhammer(add(a,1),n)));
}
function bigqjacobipoly(x,a,b,c,q){
	return qhypergeometric([pow(q,sub(0,n)),mul(a,b,pow(q,add(1,n))),x],[mul(a,q),mul(c,q)],q,q);
}
function continuousqjacobipoly(x,a,b,c,q){
	return mul(div(qpochhammer(pow(q,add(n,1)),q,n),qpochhammer(q,q,n)),qhypergeometric([pow(q,sub(0,n)),pow(q,add(n,a,b,1)),pow(q,add(mul(a,0.5),div(exp(mul(math.complex(0,1),acos(x))),4))),pow(q,add(mul(a,0.5),div(exp(mul(math.complex(0,1),-1,acos(x))),4)))],[pow(q,add(n,1)),mul(-1,pow(q,div(add(a,b,1),2))),mul(-1,pow(q,div(add(a,b,2),2)))],q,q));
}

function littleqjacobipoly(n,x,a,b,q){
	return  qhypergeometric([pow(q,sub(0,n)),mul(a,b,pow(q,add(1,n))),x],[mul(a,q)],q,mul(q,x));
}

function gegenbauerpoly(n,a,z){
	return mul(div(pochhammer(add(a,a),n),factorial(n)),hypergeometric([sub(0,n),add(a,a,n)],[add(a,0.5)],div(sub(1,z),2)));
}
function rogerspoly(n,x,b,q){
	return mul(div(pochhammer(add(a,a),n),factorial(n)),qhypergeometric([pow(q,sub(0,n)),b],[div(pow(q,sub(1,n)),b)],q,mul(q,div(exp(mul(-2,math.complex(0,1),acos(x))),b))));
}

function qform(a,b,c,z){
	return div(add(mul(z,z,sub(1,mul(a-b,a-b))),mul(z,sub(mul(2,c,add(a,b,-1)),mul(4,a,b))),mul(c,sub(2,c))),mul(4,z,z,sub(1,z),sub(1,z)));
}
function qformv(a,b,c,z){return mul(pow(z,div(c,-2)),pow(sub(1,z),div(sub(c,a,b,1),2)));}

function qhypergeometric(A,B,q,x){
	let fi=math.complex(0,0);
	for(let n=0;n<bign;n++){
	let nom=mul(pow(x,n),pow(mul(pow(-1,n),pow(q,ncr(n,2))),sub(leng(B),-1,leng(A))));
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,qpochhammer(g(A,i),q,n));
	let denom=math.complex(1,0);
	
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,qpochhammer(g(B,i),q,n));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function reghypergeometric(A,B,x){
	let fi=math.complex(0,0);
	for(let n=0;n<bign;n++){
	let nom=pow(x,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,pochhammer(g(A,i),n));
	let denom=facti(n);
	
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,gamma(add(g(B,i),n)));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function bilateralhypergeometric(A,B,x){
	let fi=math.complex(0,0);
	for(let n=sub(0,bign);n<=bign;n++){
	let nom=pow(x,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,pochhammer(g(A,i),n));
	let denom=math.complex(1,0);
	
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,pochhammer(g(B,i),n));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function foxwright(Al,Bl,x){
	let A=g(Al,0);let Ag=g(Al,1);
	let B=g(Bl,0);let Bg=g(Bl,1);
	let fi=math.complex(0,0);
	for(let n=0;n<bign;n++){
	let nom=pow(x,n);
		for(let i=0;i<leng(A);i++)
			nom=mul(nom,gamma(add(g(A,i),mul(g(Ag,i),n))));
	let denom=facti(n);
	
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,gamma(add(g(B,i),mul(g(Bg,i),n))));
	fi=add(fi,div(nom,denom));
	}
	return fi;
}
function mwright(a,z){
		const r = mul(a,z);
	return mul(awright(a),pow(r,div(sub(a,0.5),sub(1,a))),math.exp(mul(-1,bwright(a),pow(r,div(1,sub(1,a))))))
}
function awright(a){//https://en.wikipedia.org/wiki/Fox–Wright_function

	return div(1,math.sqrt(mul(2,pi(),sub(1,a))));
}
function bwright(a){
	return div(sub(1,a),a);
}
function macroberte(A,B,x)
{
	let E=[];
	return meijerg(A,E,[1],B,x);}

function gammastar(a){
	if(a==0)return 1;
	if(Number.isInteger(a))
	return facti(a-1);
return gamma(a);
}

function batemand(t,[v,x]){
	return cos(sub(mul(x,tan(t)),mul(v,t)));
}
function havelockd(t,[v,x]){
	return sin(sub(mul(x,tan(t)),mul(v,t)));
}
function bateman(v,x){return mul(integral(batemand,0,div(pi(),2),[v,x]),div(2,pi()));}
function havelock(v,x){return mul(integral(havelockd,0,div(pi(),2),[v,x]),div(2,pi()));}

/*
function meijerg(m,n,A,B,z){
	let p=leng(A)-1;let q=leng(B);
	let fi=math.complex(0,0);
	for(let h=0;h<=m;h++){
		let noma=pow(z,B._data[h]);
		let nomb=math.complex(1,0);
		let denoma=math.complex(1,0);
		let denomb=math.complex(1,0);
	for(let j=0;j<=m;j++)
	noma=mul(noma,gammastar(sub(B._data[j],B._data[h])));	
	for(let j=0;j<=n;j++)
	nomb=mul(nomb,gammastar(add(1,sub(B._data[h],A._data[j]))));	
	for(let j=m+1;j<q;j++)
	denoma=mul(denoma,gammastar(add(1,sub(B._data[h],B._data[j]))));		
	for(let j=n+1;j<p;j++)
	denomb=mul(denomb,gammastar(sub(A._data[j],B._data[h])));		
	let C=[];let D=[];
for(let j=0;j=p;j++)C.push(add(1,B._data[h],sub(0,A._data[j])));
for(let j=0;j<=h;j++)D.push(add(1,B._data[h],sub(0,B._data[j])));	
for(let j=h+1;j<q;j++)D.push(add(1,B._data[h],sub(0,B._data[j])));	
	fi=add(fi,mul(div(mul(noma,nomb),mul(denoma,denomb)),hypergeometric(C,D,mul(pow(-1,sub(p,sub(m,n))),z))));
	}
	return fi;
}*/



function meijerg(A,B,C,D,z,r=1){//f this s
	let fi =math.complex(0,0);
	for(let k=0;k<leng(C);k++){
		let bk = g(C,k);
	let num=math.complex(1,0);
	let dnum1=math.complex(1,0);
	let dnum2=math.complex(1,0);
	for(let i=0;i<leng(A);i++)num=mul(num,gamma(add(sub(1,g(A,i)),bk)));
	for(let i=0;i<leng(B);i++)dnum2=mul(dnum2,gamma(sub(g(B,i),bk)));
	for(let i=0;i<leng(C);i++)if(i!==k)dnum2=mul(dnum2,sin(mul(pi(),(sub(g(C,i),bk)))));
	let E = [];let F = [];
	for(let i=0;i<leng(A);i++)E.push(add(sub(1,g(A,i)),bk));
	for(let i=0;i<leng(B);i++)E.push(add(sub(1,g(B,i)),bk));
	for(let i=0;i<leng(C)-1;i++)F.push(add(sub(1,g(C,i)),bk));
	for(let i=0;i<leng(D);i++)F.push(add(sub(1,g(D,i)),bk));
	fi = add(fi,mul(div(num,mul(dnum1,dnum2)),pow(z,div(bk,r)),
	reghypergeometric(E,F,mul(pow(-1,sub(sub(leng(B),leng(C)),leng(A))),pow(z,div(1,r))))));
	}
	
	return mul(fi,pow(pi(),sub(leng(C),1))); 
}
function meijera(A,B,C,D,k,z,r=1){
	
		let bk = g(C,k);
	let num=math.complex(1,0);
	let dnum1=math.complex(1,0);
	let dnum2=math.complex(1,0);
	for(let i=0;i<leng(A);i++)num=mul(num,gamma(add(sub(1,g(A,i)),bk)));
	for(let i=0;i<leng(B);i++)dnum2=mul(dnum2,gamma(sub(g(B,i),bk)));
	for(let i=0;i<leng(C);i++)if(i!==k)dnum2=mul(dnum2,sin(mul(pi(),(sub(g(C,i),bk)))));
	return mul(div(num,mul(dnum1,dnum2)),pow(z,div(bk,r)));

}
function foxfh(Al,Bl,Cl,Dl,z,s){//f this s ^2
let A = g(Al,0);let Ag = g(Al,1);
let B = g(Bl,0);let Bg = g(Bl,1);
let C = g(Cl,0);let Cg = g(Cl,1);
let D = g(Dl,0);let Dg = g(Dl,1);
let num = div(1,mul(2,pi(),math.complex(0,1)));
	for(let i=0;i<leng(A);i++)num=mul(num,gamma(sub(sub(1,g(A,i)),mul(s,g(Ag,i)))));
	for(let i=0;i<leng(C);i++)num=mul(num,gamma(add(g(C,i),mul(g(Cg,i),s))));
	for(let i=0;i<leng(B);i++)num=div(num,gamma(add(g(B,i),mul(g(Bg,i),s))));
	for(let i=0;i<leng(D);i++)num=div(num,gamma(sub(sub(1,g(D,i)),mul(s,g(Dg,i)))));
return mul(num,pow(z,add(0,s)));
}
/*
function foxh(Al,Bl,Cl,Dl,z){//kilometers per second
let A = g(Al,0);let Ag = g(Al,1);
let B = g(Bl,0);let Bg = g(Bl,1);
let C = g(Cl,0);let Cg = g(Cl,1);
let D = g(Dl,0);let Dg = g(Dl,1);
let num = math.complex(0,0);
	for(let i=0;i<leng(A);i++)for(let j=0;j<bign/4;j++)num=add(num,mul(signum(g(Ag,i)),res(add(g(A,i),div(j,g(Ag,i))))));
	for(let i=0;i<leng(D);i++)for(let j=0;j<bign/4;j++)num=add(num,mul(signum(g(Bg,i)),res(add(g(B,i),div(j,g(Bg,i))))));
	for(let i=0;i<leng(C);i++)for(let j=0;j<bign/4;j++)num=add(num,mul(signum(g(Cg,i)),res(add(g(C,i),div(j,g(Cg,i))))));
	for(let i=0;i<leng(D);i++)for(let j=0;j<bign/4;j++)num=add(num,mul(signum(g(Dg,i)),res(add(g(D,i),div(j,g(Dg,i))))));


	
	function res(x){
		return mul(-1e-7,foxfh(Al,Bl,Cl,Dl,z,add(x,1e-7)));
		return add(
		mul(math.complex(1,-1),foxfh(Al,Bl,Cl,Dl,z,add(x,mul(math.complex(0,1),1e-5)))),
		mul(math.complex(-1,-1),foxfh(Al,Bl,Cl,Dl,z,add(x,mul(math.complex(1,0),1e-5)))),
		mul(math.complex(-1,1),foxfh(Al,Bl,Cl,Dl,z,add(x,mul(math.complex(0,-1),1e-5)))),
		mul(math.complex(1,1),foxfh(Al,Bl,Cl,Dl,z,add(x,mul(math.complex(-1,0),1e-5))))
		);
		
	}
	//foxh([[0.5],[0.2]],[],[],[],x)
return num;
}*/

function foxh(Al,Bl,Cl,Dl,z){//kilometers per second
let A = g(Al,0);let Ag = g(Al,1);
let B = g(Bl,0);let Bg = g(Bl,1);
let C = g(Cl,0);let Cg = g(Cl,1);
let D = g(Dl,0);let Dg = g(Dl,1);
let fi = math.complex(0,0);
let m = math.complex(0,0);
for(let i=0;i<leng(A);i++)m=add(m,g(Ag,i));
for(let i=0;i<leng(D);i++)m=add(m,g(Dg,i));		  
for(let i=0;i<leng(B);i++)m=add(m,g(Bg,i));	 
for(let i=0;i<leng(C);i++)m=add(m,g(Cg,i));
if((m.re<0 && leng(C)!=0)||leng(A)==0)
for(let h=0;h<leng(C);h++)
for(let k=0;k<bign;k++)
{	let num = math.complex(1,0);
let Bh = div(add(g(C,h),k),g(Cg,h,1));
	for(let i=0;i<leng(A);i++)        num=mul(num,gamma(add(sub(1,g(A,i)),mul(g(Ag,i,1),Bh))));
	for(let i=0;i<leng(D);i++)		  num=div(num,gamma(add(sub(1,g(D,i)),mul(g(Dg,i,1),Bh))));
	for(let i=0;i<leng(B);i++)		  num=div(num,gamma(sub(  g(B,i),mul(g(Bg,i,1),Bh))));
	for(let i=0;i<leng(C);i++)if(i!=h)num=mul(num,gamma(sub(  g(C,i),mul(g(Cg,i,1),Bh))));
	fi=add(fi,inftozero(div(mul(num,pow(-1,k),pow(div(1,z),Bh)),factorial(k),g(Cg,h,1))));
}	
else
for(let h=0;h<leng(A);h++)
for(let k=0;k<bign;k++)
{	let num = math.complex(1,0);
let Ah = div(sub(add(1,k),g(A,h)),g(Ag,h,1));
	for(let i=0;i<leng(A);i++)if(i!=h)num=mul(num,gamma(sub(1,g(A,i),mul(g(Ag,i,1),Ah))));
	for(let i=0;i<leng(D);i++)		  num=div(num,gamma(sub(1,g(D,i),mul(g(Dg,i,1),Ah))));
	for(let i=0;i<leng(B);i++)	  	  num=div(num,gamma(add(  g(B,i),mul(g(Bg,i,1),Ah))));
	for(let i=0;i<leng(C);i++)		  num=mul(num,gamma(add(  g(C,i),mul(g(Cg,i,1),Ah))));
	fi=add(fi,inftozero(div(mul(num,pow(-1,k),pow(div(1,z),Ah)),factorial(k),g(Ag,h,1))));
}
return fi; //foxh([[1.33],[1.5]],[[1],[0.5]],[[],[]],[[],[]],x)
}

function generalizedfoxhi(Al,Bl,Cl,Dl,z){// I-Function
let fi = math.complex(0,0);
let A = g(Al,0);let Ag = g(Al,1);let Ac = g(Al,2);
let B = g(Bl,0);let Bg = g(Bl,1);let Bc = g(Bl,2);
let C = g(Cl,0);let Cg = g(Cl,1);let Cc = g(Cl,2);
let D = g(Dl,0);let Dg = g(Dl,1);let Dc = g(Dl,2);
for(let r=0;r<bign;r++)
for(let h=0;h<leng(C);h++){
	let Bh =div(add(r,g(C,h)),g(Cg,h,1))
	let num = div(mul(pow(z,Bh),pow(-1,r)),mul(factorial(r),g(Cg,h)));
	for(let i=0;i<leng(A);i++)        num=mul(num,pow(gamma(sub(mul(g(Ag,i,1),Bh),-1,g(A,i))),g(Ac,i,1)));
	for(let i=0;i<leng(B);i++)        num=div(num,pow(gamma(sub(g(B,i),mul(g(Bg,i,1),Bh))),g(Bc,i,1)));
	for(let i=0;i<leng(C);i++)if(i!=h)num=mul(num,pow(gamma(sub(g(C,i),mul(g(Cg,i,1),Bh))),g(Cc,i,1)));
	for(let i=0;i<leng(A);i++)        num=div(num,pow(gamma(sub(mul(g(Dg,i,1),Bh),-1,g(D,i))),g(Dc,i,1)));
	fi=math.add(fi,inftozero(num));
}
return fi;
}


function barneszeta(s,w,A){//barneszeta(x,2,[1,2,3])
	let N = leng(A);
	let G = new Array(N);
	let fi=math.complex(0,0);
	for(let k=0;k<bign*N;k++){
		let GGG=k;
		for(let i=0;i<N;i++){
		G[i]=math.mod(GGG,bign);
		GGG=floor(GGG/bign);
		}
		
		
	let den=math.complex(0,0);
		for(let i=0;i<N;i++){
			den=add(den,mul(g(A,i),g(G,i)));
		}
		fi=add(fi,div(1,pow(add(w,den),s)));
	}
	return fi;
}

function shintanizeta(s,w,A){//shintanizeta(x,2,[[1,2],[2,3],[4,5]])
	let N = leng(A);
	let G = new Array(N);
	let fi=math.complex(0,0);
	for(let k=0;k<bign*N;k++){
		let GGG=k;
		for(let i=0;i<N;i++){
		G[i]=math.mod(GGG,bign);
		GGG=floor(GGG/bign);
		}
		
		let ren=math.complex(1,0);
		for(let j=0;j<N;j++){
	let den=math.complex(0,0);
		for(let i=0;i<leng(g(A,j));i++){
			den=add(den,mul(g(g(A,j),i),g(G,i)));
		}ren=mul(ren,den)
		}
		fi=add(fi,div(1,pow(add(w,ren),s)));
	}
	return fi;
}
function polyshintanizeta(S,w,A){//polyshintanizeta(x,[2,3,4],[[1,2],[2,3],[4,5]])
	let N = leng(A);
	let G = new Array(N);
	let fi=math.complex(0,0);
	for(let k=0;k<bign*N;k++){
		let GGG=k;
		for(let i=0;i<N;i++){
		G[i]=math.mod(GGG,bign);
		GGG=floor(GGG/bign);
		}
		
		let ren=math.complex(1,0);
		for(let j=0;j<N;j++){
	let den=math.complex(0,0);
		for(let i=0;i<leng(g(A,j));i++){
			den=add(den,mul(g(g(A,j),i),g(G,i)));
		}ren=mul(ren,pow(den,g(S,j)));
		}
		fi=add(fi,div(1,pow(add(w,ren),1)));
	}
	return fi;
}

function hypergeometricpolyaleph(A,Al,Bl,C,D,Tl,Z){
	//structres//
	/*
	A - [[a],[aa],[aa]...] of v +1incex
	Bl - [[b],[bb],[bb]...] of v +1incex
	Al - [[a],[aa],[aa]...] of v +1incex
	C - [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]...]  of v of 4 of m
	D -  [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]...]  of v of 4 of m 
	Tl - [[t],[tt],[tt]] of v
	R - [] of v +1incex
	Z - [] of v
	*/
	
	let fi = math.complex(0,0);
	let v = leng(Z);
	function getm(x){
	return minc(leng(g(g(D,x),0)),0)+1;}
	let R = 1;
	for(let i=0;i<v;i++)R=R*getm(i);
	let qg = new Array(v);
	let G = new Array(v);
	let eta = new Array(v);
	let gsum = math.complex(0,0);
	for(let GG=0;GG<bign*v/3;GG++){
		let GGG=GG;
		for(let mm=0;mm<v;mm++){
		G[mm]=math.mod(GGG,bign);
		gsum=add(gsum,g(G,mm));
		GGG=floor(GGG/bign);
	}
	for(let gg=0;gg<=R;gg++){
		let ggg=gg;
	for(let mm=0;mm<v;mm++){
		qg[mm]=math.mod(ggg,getm(mm));
		eta[mm]=div(add(g(g(g(D,mm),0),g(qg,mm)),g(G,mm)),g(g(g(D,mm),1),g(qg,mm)));
		ggg=floor(ggg/getm(ggg));
	}
	
	
	//console.log(v);
		let nom=pow(-1,gsum);
		let denom=math.complex(1,0);
		for(let i=0;i<v;i++)
		denom=div(denom,inftozero(factorial(mul(g(g(g(D,i),1),g(qg,i)),g(G,i))),1));
		//console.log(factorial(mul(g(g(g(D,0),1),g(qg,0)),g(G,0))));
		let xi=math.complex(1,0);
		for(let k=0;k<v;k++){
		let xitop=math.complex(1,0);
		for(let i=0;i<leng(g(g(D,k),0));i++)xitop=mul(xitop,gamma(sub(g(g(g(D,k),0),i),mul(g(eta,k),g(g(g(D,k),1),i)))));
		for(let i=0;i<leng(g(g(C,k),0));i++)xitop=mul(xitop,gamma(sub(mul(g(eta,k),g(g(g(C,k),1),i)),-1,g(g(g(C,k),0),i))));
     	
		let xibot=math.complex(0,0);
		for(let k=0;k<v;k++){
		let xibottop=g(Tl,k+1);	
		for(let i=0;i<leng(g(g(D,k),3));i++)xibottop=mul(xibottop,gamma(sub(mul(g(eta,k),g(g(g(D,k),3),i)),-1,g(g(g(D,k),2),i))));
		for(let i=0;i<leng(g(g(C,k),3));i++)xibottop=mul(xibottop,gamma(sub(g(g(g(C,k),2),i),mul(g(eta,k),g(g(g(C,k),3),i)))));
		xibot=add(xibot,inftozero(xibottop));}
		console.log(xitop);
		xi=mul(xi,inftozero(div(xitop,xibot),1));}
		let psitop=math.complex(1,0);
		for(let i=0;i<leng(g(A,0));i++){
		let psitopsum=math.complex(0,0);
		for(let j=0;j<v;j++)psitopsum=add(psitopsum,mul(g(g(A,j+1),i),g(eta,j)));
		psitop=mul(psitop,gamma(sub(psitopsum,-1,g(g(A,0),i))));}
		let psibot=math.complex(0,0);
		{let psibottop=math.complex(1,0);
		for(let i=0;i<leng(g(Bl,0));i++){
		let psitopsumb=math.complex(0,0);
		for(let j=0;j<v;j++)psitopsumb=add(psitopsumb,mul(g(g(Bl,j+1),i),g(eta,j)));
		psibottop=mul(psibottop,gamma(sub(psitopsumb,-1,g(g(Bl,0),i))));}
		for(let i=0;i<leng(g(Al,0));i++){
		let psitopsuma=math.complex(0,0);
		for(let j=0;j<v;j++)psitopsuma=add(psitopsuma,mul(g(g(Al,j+1),i),g(eta,j)));
		psibottop=mul(psibottop,gamma(sub(g(g(Al,0),i),psitopsuma)));}				
		psibot=add(psibot,inftozero(psibottop));}

		let psi=inftozero(div(psitop,psibot),1);
		let zaza=math.complex(1,0);
		for(let i=0;i<v;i++)
		zaza=mul(zaza,pow(g(Z,i),eta[i]));
	//console.log(nom);
	//	console.log(denom);
	//	console.log(psi);
	//console.log(xi);
	//	console.log(zaza);
		fi=add(fi,mul(nom,inftozero(denom,1),psi,xi,zaza));
	}}
	
	return fi;// finnaly
	//hypergeometricpolyaleph([[0.3],[0.44]],[[0.719],[0.782]],[[0.523],[0.543]],[[[0.1176],[1.2763],[0.63453],[0.345]]],[[[0.22],[0.5],[0.933],[0.132]]],[1.2123,2.123,3],[x])
	//hypergeometricpolyaleph([[0.3],[0.44]],[[0.719],[0.782]],[[0.523],[0.543]],[[[0.2176],[0.2763],[0.63453],[0.345]]],[[[0.72],[0.5],[0.333],[0.132]]],[1.2123,2.123,3],[0.3])
}

/*
function hypergeometricalephphi1(Al,Bl,)


function hypergeometricaleph(Al,Bl,Cl,Dl,Tl,Z){
	let fi = math.complex(0,0);


	for(let G=0;G<bign;G++)
	for(let g=0;g<leng(C);g++){
	let Bh =div(add(r,g(C,g)),g(Cg,g,1))
	let num = div(mul(pow(z,Bh),pow(-1,r)),mul(factorial(r),g(Cg,g)));
	//let eta = hypergeometricalepheta(G,g);
	let eta = div(add(G,g(D,g)),g(Dg,g));
	for(let i=0;i<leng(A);i++)        num=mul(num,pow(gamma(sub(mul(g(Ag,i,1),Bh),-1,g(A,i))),g(Ac,i,1)));
	for(let i=0;i<leng(B);i++)        num=div(num,pow(gamma(sub(g(B,i),mul(g(Bg,i,1),Bh))),g(Bc,i,1)));
	for(let i=0;i<leng(C);i++)if(i!=g)num=mul(num,pow(gamma(sub(g(C,i),mul(g(Cg,i,1),Bh))),g(Cc,i,1)));
	for(let i=0;i<leng(A);i++)        num=div(num,pow(gamma(sub(mul(g(Dg,i,1),Bh),-1,g(D,i))),g(Dc,i,1)));
	fi=math.add(fi,inftozero(mul(num,hypergeometricalephphi1([eta]),hypergeometricalephxi(eta))));
}
}
*/
function kampedeferiet(A,B,Bp,C,D,Dp,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)
	for(let n=0;n<bign;n++){
		let fil = math.complex(1,0);
		for(let i=0;i<leng(A);i++)fil=mul(fil,pochhammer(g(A,i),add(m,n)));
		for(let i=0;i<leng(C);i++)fil=div(fil,pochhammer(g(C,i),add(m,n)));
		for(let i=0;i<leng(B);i++)fil=mul(fil,pochhammer(g(B,i),m));
		for(let i=0;i<leng(Bp);i++)fil=mul(fil,pochhammer(g(Bp,i),n));
		for(let i=0;i<leng(D);i++)fil=div(fil,pochhammer(g(D,i),m));
		for(let i=0;i<leng(Dp);i++)fil=div(fil,pochhammer(g(Dp,i),n));
		
		fi=add(fi,mul(fil,div(mul(pow(x,m),pow(y,n)),mul(factorial(m),factorial(n)))));
	}
	return fi;
}

function riemannp(a,b,c,al,bl,cl,ap,bp,cp,z){//https://en.wikipedia.org/wiki/Riemann%27s_differential_equation
return mul(pow(div(sub(z,a),sub(z,b)),al),pow(div(sub(z,c),sub(z,b)),cl),hypergeometric([add(al,bl,cl),add(al,bp,cl)],[add(1,sub(a,ap))],div(mul(sub(z,a),sub(c,b)),mul(sub(z,b),sub(c,a)))));
}

function qriemannintegral(a,q,f,x){//I^a_qf(x)
	fi=math.complex(0);
	for(let k=0;k<bign;k++)
	fi=add(fi,mul(pow(q,k),div(qpochhammer(pow(q,a),q,k),qpochhammer(q,q,k)),f(mul(x,pow(q,k)))));	
	return mul(pow(x,a),pow(sub(1-q),a),fi);
}
function qweyltegral(a,q,f,x){//I^a_qf(x)
	fi=math.complex(0);
	for(let k=0;k<bign;k++)
	fi=add(fi,mul(pow(q,mul(-1,k,a)),div(qpochhammer(pow(q,a),q,k),qpochhammer(q,q,k)),f(mul(x,pow(q,sub(0,a,k))))));	
	return mul(pow(x,a),pow(sub(1-q),a),pow(q,div(mul(a,add()),-2)),fi);
}

function humbertphi1(a,b,c,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,mul(div(mul(pochhammer(a,add(m,n)),pochhammer(b,m)),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n))));
return fi;
}
function humbertphi2(a,b,c,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,mul(div(mul(pochhammer(a,m),pochhammer(b,n)),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n))));
return fi;
}
function humbertphi3(b,c,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,mul(div(pochhammer(b,n),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n))));
return fi;
}
function humbertpsi1(a,b,c,d,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,mul(div(mul(pochhammer(a,add(m,n)),pochhammer(b,m)),mul(pochhammer(c,add(m)),pochhammer(d,add(n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n))));
return fi;
}
function humbertpsi2(a,c,d,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,mul(div(pochhammer(a,add(m,n)),mul(pochhammer(c,add(m)),pochhammer(d,add(n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n))));
return fi;
}
function humbertxi1(a,aa,b,c,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,mul(div(mul(pochhammer(a,m),pochhammer(aa,n),pochhammer(b,m)),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n))));
return fi;
}
function humbertxi2(a,b,c,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,mul(div(mul(pochhammer(a,add(m)),pochhammer(b,m)),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n))));
return fi;
}

function multiset(n,r){
	return div(factorial(add(n,r,-1)),mul(factorial(r),factorial(sub(n,1))));
}
function  confluenthypergeometricm(a,b,z){
	return hypergeometric([a,bign],[b],div(z,bign));
}
function  confluenthypergeometricu(a,b,z){
	return add(mul(div(gamma(sub(1,b)),add(a,sub(1,b))),confluenthypergeometricm(a,b,z)),mul(div(gamma(add(b,-1)),gamma(a)),pow(z,sub(1,b)),confluenthypergeometricm(add(a,sub(1,b)),sub(2,b),z)));
}

function whittakerm(k,m,z){
	return mul(exp(div(z,-2)),pow(z,add(0.5,m)),confluenthypergeometricm(add(sub(m,k),0.5),add(m,m,1),z));
}
function whittakerw(k,m,z){
	return mul(exp(div(z,-2)),pow(z,add(0.5,m)),confluenthypergeometricu(add(sub(m,k),0.5),add(m,m,1),z));
}
function pthabsrawmoment(m,s,p){
	return mul(div(mul(pow(add(s,s),div(p,2)),gamma(div(add(1,p),2))),pi()),hypergeometric([div(p,-2)],[0.5],div(mul(m,m),mul(-2,s))));
}
function pthrawmoment(m,s,p){
	return mul(pow(mul(-2,s),div(p,2)),confluenthypergeometricu(div(p,-2),0.5,div(mul(m,m),mul(-2,s))));
}
function toronto(m,n,r){
	return mul(pow(r,add(n,n,sub(1,m))),exp(mul(r,r,-1)),div(gamma(add(div(m,2),0.5)),gamma(add(n,1))),hypergeometric([add(div(m,2),0.5)],[add(n,1)],mul(r,r)))
}
function charlierpoly(n,x,m){
	return hypergeometric([sub(0,n),sub(0,x)],[],div(-1,m));
}
function cunningham(m,n,x){
	return mul(div(exp(sub(mul(math.complex(0,1),pi(),sub(div(m,2),n)),x)),gamma(add(1,sub(n,mul(0.5,m))))),confluenthypergeometricu(sub(div(m,2),n),add(m,1),x));
}
function coloumbhplus(l,n,p){
	return mul(mul(-2,math.complex(0,1)),pow(-2,l),exp(mul(0.5,pi(),n)),exp(coloumbsigma(l,n)),pow(p,add(l,1)),exp(mul(math.complex(0,1),p)),confluenthypergeometricu(add(l,1,mul(math.complex(0,1),n)),add(l,l,2),mul(-2,math.complex(0,1),p)));
}
function coloumbhminus(l,n,p){
	return mul(mul(2,math.complex(0,1)),pow(-2,l),exp(mul(0.5,pi(),n)),exp(sub(0,coloumbsigma(l,n))),pow(p,add(l,1)),exp(mul(-1,math.complex(0,1),p)),confluenthypergeometricu(add(l,1,mul(-1,math.complex(0,1),n)),add(l,l,2),mul(2,math.complex(0,1),p)));
}
function coloumbsigma(l,n){return arg(gamma(add(l,1,mul(math.complex(0,1),n))));}
function coloumbf(l,n,p){
	return div(sub(coloumbhplus(l,n,p),coloumbhminus(l,n,p)),mul(2,math.complex(0,1)));
}
function coloumbg(l,n,p){
	return div(add(coloumbhplus(l,n,p),coloumbhminus(l,n,p)),mul(2,1));
}
function coloumbtheta(l,n,p){
	return add(p,coloumbsigma(l,n),sub(0,mul(n,log(add(p,p))),mul(l,pi(),0.5)))
}
function coloumbpsiplus(k,n,r){
return mul(gamma(add(1,mul(math.complex(0,1),n))),exp(mul(-0.5,n,pi())),exp(mul(math.complex(0,1),dot(k,r))),confluenthypergeometricm(mul(n,math.complex(0,1),-1),1,sub(mul(math.complex(0,1),k,r),mul(math.complex(0,1),dot(k,r)))));
}
function coloumbpsiminus(k,n,r){
return mul(gamma(sub(1,mul(math.complex(0,1),n))),exp(mul(-0.5,n,pi())),exp(mul(math.complex(0,1),dot(k,r))),confluenthypergeometricm(mul(n,math.complex(0,1),1),1,sub(mul(-1,math.complex(0,1),k,r),mul(math.complex(0,1),dot(k,r)))));
}
function coloumbwm(l,n,p){
return whittakerm(mul(-1,n,math.complex(0,1)),add(l,0.5),mul(-2,math.complex(1,0),p));
}
function coloumbww(l,n,p){
return whittakerw(mul(-1,n,math.complex(0,1)),add(l,0.5),mul(-2,math.complex(1,0),p));
}
function coloumbrm(k,l,r){
return mul(4,pi(),pow(math.complex(1,0),l),coloumbwm(l,n,p),div(1,r));
}
function coloumbpsi(k,n,r){
let fi=math.complex(0);
let p=mul(k,r);

for(let l=0;l<bign;l++)
for(let m=sub(0,l);m<=l;m++)
fi = add(fi,mul(pow(math.complex(0,1),l),exp(mul(math.complex(1,0),coloumbsigma(l,n))),coloumbf(l,n,p),sphericalharmonic(l,m,r.re,r.im),conj(sphericalharmonic(l,m,k.re,k.im))))
return mul(4,pi(),fi,div(1,r));
}
function coloumbpsim(k,l,n,r){
return mul(coloumbrm(k,l,r),sphericalharmonic(l,m,r.re,r.im));
}
function coloumbpsiw(k,l,n,r){
return mul(coloumbrm(k,l,r),sphericalharmonic(l,m,r.re,r.im));
}

function apellf1(a,b,bb,c,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,add(m,n)),pochhammer(b,m),pochhammer(bb,n)),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n)))));
return fi;
}
function apellf2(a,b,bb,c,cc,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,add(m,n)),pochhammer(b,m),pochhammer(bb,n)),mul(pochhammer(c,m),pochhammer(cc,n),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n)))));
return fi;
}
function apellf3(a,aa,b,bb,c,cc,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,m),pochhammer(aa,n),pochhammer(b,m),pochhammer(bb,n)),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n)))));
return fi;
}
function apellf4(a,b,c,cc,x,y){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,add(m,n)),pochhammer(b,add(m,n))),mul(pochhammer(c,m),pochhammer(cc,n),factorial(m),factorial(n))),mul(pow(x,m),pow(y,n)))));
return fi;
}






function schwarztriangle(a,b,c,z){
	let aa = div(sub(1,a,b,c),2);
	let bb = div(sub(add(1,b),a,c),2);
	let cc = sub(1,a);
	return mul(pow(z,a),div(hypergeometric([add(1,sub(aa,cc)),add(1,sub(bb,cc))],[sub(2,cc)],z),hypergeometric([aa,bb],[cc],z)));
}
function schwarzchristoffelmapd(w,C){
	const A=g(C,0);const B=g(C,1);
	let fi=math.complex(1,0);
	for(let i=0;i<leng(A);i++)fi=mul(fi,pow(sub(w,g(A,i)),sub(1,div(g(B,i),pi()))));
	return fi;
}
function schwarzchristoffelmap(A,B,z){
	return integral(schwarzchristoffelmapd,math.complex(0,0),z,[A,B]);
}

function associatedlegendre(l,m,x){
	let fi=math.complex(0,0);for(let k=m;k<=l;k++)
	{	fi = add(fi,mul(div(factorial(k),factorial(sub(k,m))),pow(x,sub(k,m)),ncr(l,k),ncr(div(add(l,k,-1),2),l)));
	console.log(div(factorial(k),factorial(sub(k,m))));}
	return mul(fi,pow(-1,m),pow(2,l),pow(sub(1,mul(x,x)),div(m,2)));
}

function sphericalharmonic(l, m, theta, phi) {
    const term1 = pow(-1, m);
    const term2 = math.sqrt(
        div(
            mul(
                mul(2 * l + 1, gamma(sub(l, m))),
                div(1, gamma(add(l, m)))
            ),
            4 * math.pi
        )
    );
    const legendre = associatedlegendre(l, m, math.cos(theta));
    const expTerm = math.exp(mul(math.complex(0, 1), mul(m , phi)));
    return mul(mul(term1, term2), mul(legendre, expTerm));
}

// Spherical harmonic for acoustic applications
function sphericalharmonicacoustic(l, m, theta, phi) {
    const term1 = math.sqrt(
        div(
            mul(
                mul(2 * l + 1, gamma(sub(l, m))),
                div(1, gamma(add(l, m)))
            ),
            4 * math.pi
        )
    );
    const legendre = associatedlegendre(l, m, math.cos(theta));
    const expTerm = math.exp(mul(math.complex(0, 1), mul(m , phi)));
    return mul(term1, mul(legendre, expTerm));
}

// Spherical harmonic for geodesy
function sphericalharmonicgeodesy(l, m, theta, phi) {
    const term1 = math.sqrt(
        div(
            mul(gamma(sub(l, m)), 1),
            gamma(add(l, m))
        )
    );
    const legendre = associatedlegendre(l, m, math.cos(theta));
    const expTerm = math.exp(mul(math.complex(0, 1), mul(m , phi)));
    return mul(term1, mul(legendre, expTerm));
}

// Spherical harmonic for magnetics
function sphericalharmonicmagnetics(l, m, theta, phi) {
    const term1 = math.sqrt(
        div(
            gamma(sub(l, m)),
            gamma(add(l, m))
        )
    );
    const legendre = associatedlegendre(l, m, math.cos(theta));
    const expTerm = math.exp(mul(math.complex(0, 1), mul(m , phi)));
    return mul(term1, mul(legendre, expTerm));
}
function inftozero(term,subb=0){if (math.abs(math.complex(term).re)===math.Infinity)return subb;return term;}

function wigner3j(j1,j2,j3,m1,m2,m3) {
    let fi = math.complex(0,0);
	const j1a=math.complex(j1).re;const j2a=math.complex(j2).re;const j3a=math.complex(j3).re;
	const m1a=math.complex(m1).re;const m2a=math.complex(m2).re;const m3a=math.complex(m3).re;
    const kStart = math.max(0,sub(sub(j2a,j3a),m1a),add(sub(j1a,j3a),m2a));
    const kEnd =math.min(sub(j1a,m1a),add(j2a,m2a),sub(add(j1a,j2a),j3a));
//console.log(kStart);   
//console.log(kEnd);
   for (let k = kStart; k <= kEnd; k++) {
        const term = div(
            pow(-1, k),
            mul(
                nfactorial(k),
                nfactorial(add(j1, j2, sub(0,j3), sub(0,k))),
                nfactorial(sub(sub(j1, m1), k)),
                nfactorial(sub(sub(j2, m2), k)),
                nfactorial(add(j3, sub(0,j2), m1, k)),
                nfactorial(add(j3, sub(0,j1), sub(0,m2), k))
            ));
	//	console.log(term);
        fi = add(fi, inftozero(term));

    }
//	console.log(fi);
    const multiplier = mul(
        pow(-1, sub(sub(j1, j2), m3)),
        math.sqrt(
            ntriangef(j1,j2,j3)
        ),
        math.sqrt(
            mul(
                nfactorial(sub(j1, m1)),
                nfactorial(add(j1, m1)),
                nfactorial(sub(j2, m2)),
                nfactorial(add(j2, m2)),
                nfactorial(sub(j3, m3)),
                nfactorial(add(j3, m3))
            )
        )
    );

    return mul(multiplier, fi);
}


function catastrophek(t,A){
	let fi=math.complex(0);
	for(let i=0;i<leng(A);i++)
	fi=add(fi,mul(pow(g(A,i),pow(t,add(1,i)))));	
	return add(pow(t,add(leng(A),2)),fi);
}
function canonicalintegrald(t,A){
	return exp(mul(math.complex(0,1),catastrophek(t,A)));
}
function canonicalintegral(A){
	return integral(canonicalintegrald,-bign,bign,A);
}
function paracylindereven(a, b) {
    return mul(b, exp(neg(div(mul(b, b), 4))), hypg11(add(mul(0.5 , a), 0.25), 0.5, div(mul(b, b), 2)));
}

function paracylinderodd(a, b) {
    return mul(b, exp(neg(div(mul(b, b), 4))), hypg11(add(mul(0.5 , a), 0.75), 1.5, div(mul(b, b), 2)));
}

function paraboliccylinderu(a, b) {
    const fi = add(mul(0.5 , a), 0.25);
    return sub(div(
        mul(
            1.0,
            cos(mul(fi, pi())),
            gamma(sub(0.5 , fi)),
            paracylindereven(a, b)
        ),
        mul(pow(2.0, fi), sqrt(pi()))
    ) , mul(
        sqrt(2.0),
        sin(mul(fi, pi())),
        gamma(sub(1 , fi)),
        paracylinderodd(a, b)
    ));
}

function paraboliccylinderv(a, b) {
    const fi = add(mul(0.5 , a), 0.25);
    return div(
        add(
            mul(
                1.0,
                cos(mul(fi, pi())),
                gamma(sub(0.5 , fi)),
                paracylindereven(a, b)
            ),
            mul(sqrt(2.0), sin(mul(fi, pi())), gamma(sub(1 , fi)), paracylinderodd(a, b))
        ),
        mul(sqrt(pi()), gamma(sub(0.5 , a)))
    );
}

function paraboliccylinderd(a, b) {
    const fi = add(mul(0.5 , a), 0.25);
    return mul(
        div(1.0 , sqrt(pi())),
        pow(2.0, div(a, 2.0)),
        exp(sub(0,div(mul(b, b), 4.0))),
        add(
            mul(
                cos(div(mul(a, pi()), 2.0)),
                gamma(add(a, 1.0), 2.0),
                hypg11(sub(0,div(a, 2.0)), 0.5, div(mul(b, b), 2.0))
            ),
            mul(
                sqrt(2 * pi()),
                sin(div(mul(pi(), a), 2.0)),
                gamma(add(a, 1.0), 2.0),
                hypg11(add(0.5, sub(0,div(a, 2.0))), 1.5, div(mul(b, b), 2.0))
            )
        )
    );
}

function wignerd(j,b,mp,m){
	let fi=math.complex(0,0);
	for(let s=math.max(0,sub(m,mp));s<=math.min(add(j,m),sub(j,mp));s++)
		fi=add(fi,inftozero(div(mul(pow(-1,add(sub(mp,m),s)),pow(math.cos(div(b,2)),sub(add(j,j,m),add(mp,s,s))),pow(math.sin(div(b,2)),add(sub(mp,m),s,s))),mul(factorial(sub(add(j,m),s)),factorial(add(sub(mp,m),s)),factorial(sub(sub(j,mp),s)),factorial(s)))));
	return mul(fi,math.sqrt(mul(factorial(add(j,mp)),factorial(sub(j,mp)),factorial(add(j,m)),factorial(sub(j,m)))));
}
function wigner6j(j1,j2,j3,J1,J2,J3){
	let fi=math.complex(0,0)
	for(let t=math.max(add(J1,j2,J3),add(J1,J2,j3),add(j1,J2,J3),add(j1,j2,j3));t<math.min(add(j1,j2,J1,J2),add(j2,j3,J2,J3),add(j1,j3,J1,J3));t++)
	{fi=add(fi,inftozero(div(mul(pow(-1,t),factorial(add(t,1))),wigner6jf(j1,j2,j3,J1,J2,J3,t+0.01))));
	}//console.log (inftozero(fi));
	return mul(fi,math.sqrt(mul(triangef(j1,j2,j3),triangef(j1,J2,J3),triangef(J1,j2,J3),triangef(J1,J2,j3))));
}

function wigner6jf(j1,j2,j3,J1,J2,J3,t){
	return mul(
	factorial(sub(t,add(j1,j2,j3))),
	factorial(sub(t,add(j1,J2,J3))),
	factorial(sub(t,add(J1,J2,j3))),
	factorial(sub(t,add(J1,j2,J3))),
	factorial(sub(add(j1,j2,J1,J2),t)),
	factorial(sub(add(j2,j3,J2,J3),t)),
	factorial(sub(add(j1,j3,J1,J3),t))
	)
}

 
function triangef(a, b, c) {
    const term1 = factorial(add(a, b, mul(-1, c)));
    const term2 = factorial(add(a, mul(-1, b), c));
    const term3 = factorial(sub(add(b, c), a));
    const term4 = factorial(add(a, b, c, 1));

    return div(mul(term1, term2, term3), term4);
}
function ntriangef(a, b, c) {
    const term1 = nfactorial(add(a, b, mul(-1, c)));
    const term2 = nfactorial(add(a, mul(-1, b), c));
    const term3 = nfactorial(sub(add(b, c), a));
    const term4 = nfactorial(add(a, b, c, 1));

    return div(mul(term1, term2, term3), term4);
}




function wigner3jhypg(j1,j2,j3,m1,m2,m3){
	j1=add(j1,1e-7);j2=add(j2,1e-7);j3=add(j3,1e-7);
	m1=add(m1,1e-7);m2=add(m2,1e-7);m3=add(m3,1e-7);
	return div(mul(
	pow(-1,sub(add(j2,m3),j1)),
	
	math.sqrt(factorial(sub(add(j3,j1),j2))),
	math.sqrt(factorial(sub(add(j3,j2),j1))),
	math.sqrt(factorial(sub(j3,m3))),
    math.sqrt(factorial(add(j3,m3))),
	math.sqrt(factorial(add(j1,m1))),
	math.sqrt(factorial(sub(j2,m2))),
	hypergeometric([sub(j3,add(j1,j2)),sub(m1,j1),sub(j2,m2)],[sub(add(1,j3,m1),j2),sub(add(j3,1),add(m2,j1))],1))
	,mul(math.sqrt(factorial(sub(add(j2,j1),j3)))
	,math.sqrt(factorial(sub(0,add(j3,j1,1,j2))))
	,math.sqrt(factorial(add(j2,m2)))
	,math.sqrt(factorial(sub(j1,m1)))
	))
	
	; }


function wigner6jhypg(j1,j2,j3,j4,j5,j6){
	j1=add(j1,1e-7);j2=add(j2,1e-7);j3=add(j3,1e-7);
	j4=add(j4,1e-7);j5=add(j5,1e-7);j6=add(j6,1e-7);
	return div(mul(
	pow(-1,sub(0,add(j1,j2,j4,j5))),
	pi(),math.csc(mul(pi(),add(j1,j2,j4,j5))),
	math.sqrt(factorial(sub(add(j3,j1),j2))),
	math.sqrt(factorial(sub(add(j3,j2),j1))),
	math.sqrt(factorial(sub(add(j3,j4),j5))),
	math.sqrt(factorial(sub(add(j3,j5),j4))),
	 math.sqrt(factorial(sub(add(j6,j2),j4))),
	 math.sqrt(factorial(sub(add(j6,j4),j2))),
	 math.sqrt(factorial(sub(add(j6,j1),j5))),
	 math.sqrt(factorial(sub(add(j6,j5),j1))),
	hypergeometric([sub(j3,add(j1,j2)),sub(j3,add(j4,j5)),sub(j6,add(j2,j4)),sub(j6,add(j1,j5))],[sub(0,add(j1,j2,j4,j5,1)),sub(add(1,j3,j6),add(j1,j4)),sub(add(1,j3,j6),add(j2,j5))],1))
	,mul(math.sqrt(factorial(sub(add(j2,j1),j3)))
	,math.sqrt(factorial(add(1,j2,j3,j1)))
	,math.sqrt(factorial(sub(add(j5,j4),j3)))
	,math.sqrt(factorial(add(1,j3,j4,j5)))
	,math.sqrt(factorial(add(1,j2,j4,j6)))
	,math.sqrt(factorial(add(1,j6,j5,j1)))
	,math.sqrt(factorial(sub(add(j2,j4),j6)))
	,math.sqrt(factorial(sub(add(j1,j5),j6)))
	))
	
	; }


function rubixcomb(x){
	let divo = sub(div(sub(x,2),2),mul(0.5,sqr(math.sin(mul(div(sub(x,2),2),pi())))));
	return mul(3674160.0,pow(11771943321600.0,sqr(math.sin(mul(x,pi(),0.5)))),pow(620448401733239439360000.0,divo),pow(3246670537110000,sqr(divo)));
}
function redrubixcomb(x){
	let divo = sub(div(sub(x,2),2),mul(0.5,sqr(math.sin(mul(div(sub(x,2),2),pi())))));
	return mul(1,pow(12,sqr(math.sin(mul(x,pi(),0.5)))),pow(24,divo),pow(6,sqr(divo)));
}

function gauntcoefficient(l1,l2,l3,m1,m2,m3){
	return mul(math.sqrt(div(mul(add(l1,l1,1),add(l2,l2,1),add(l3,l3,1)),mul(4,pi()))),wigner3jhypg(l1,l2,l3,0,0,0),wigner3jhypg(l1,l2,l3,m1,m2,m3));
}
function spinweightedsphericalharmonic(l1,l2,l3,m1,m2,m3,s1,s2,s3){
	return mul(math.sqrt(div(mul(add(l1,l1,1),add(l2,l2,1),add(l3,l3,1)),mul(4,pi()))),wigner3jhypg(l1,l2,l3,sub(0,s1),sub(0,s2),sub(0,s3)),wigner3jhypg(l1,l2,l3,m1,m2,m3));
}
function wigner1jm(j,m,mp){
	return mul(math.sqrt(add(j,j,1)),wigner3jhypg(j,0,j,m,0,mp));
}
function racahv(j1,j2,j3,m1,m2,m3){
	return mul(pow(-1,sub(sub(j1,j2),j3)),wigner3jhypg(j1,j2,j3,m1,m2,m3));
}
function racahw(j1,j2,j3,j4,j5,j6){
	return mul(pow(-1,add(j1,j2,j3,j4)),wigner3jhypg(j1,j2,j3,j4,j5,j6));
}
function clebschgordan(j1,j2,j,m1,m2,m){
 return mul(math.sqrt(add(j,j,1)),pow(-1,sub(add(m,j1),j2)),wigner3jhypg(j1,j2,j,m1,m2,sub(0,j)));
}
function recouplingcoefficient(j1,j2,j3,j4,j5,j6,j7,j8,j9){
 return mul(math.sqrt(mul(add(j3,j3,1),add(j6,j6,1),add(j7,j7,1),add(j8,j8,1))),wigner9j(j1,j2,j3,j4,j5,j6,j7,j8,j9));
}
function triangulardelta(j1,j2,j3){
	if(math.abs(sub(j1,j2)) <= math.abs(j3) && math.abs(add(j1,j2))>=math.abs(j3)){
		return 1;
	}
	return 0;
}
function hexagonaldelta(j1,j2,j3,j4,j5,j6){
	if(triangulardelta(j1,j2,j3) && triangulardelta(j1,j5,j6) && triangulardelta(j4,j2,j6) && triangulardelta(j3,j4,j5)){
		return 1;
	}
	return 0;
}
function wigner9j(j1,j2,j3,j4,j5,j6,j7,j8,j9){
let fi=math.complex(0,0);
let x = math.complex(0,0);
for(let q=0;x<=add(j1,j2,j3,j4,j5,j6,j7,j8,j9);x=add(x,0.5)){
	if(hexagonaldelta(j1,j4,j7,j8,j9,x) && hexagonaldelta(j2,j5,j8,j4,x,j6) && hexagonaldelta(j3,j6,j9,x,j1,j2))
	fi=add(fi,inftozero(mul(pow(-1,add(x,x)),add(x,x,1),wigner6jhypg(j1,j4,j7,j8,j9,x),wigner6jhypg(j2,j5,j8,j4,x,j6),wigner6jhypg(j3,j6,j9,x,j1,j2))));
}
	return fi;
}


function bei(v,z){
	const term = mul(pow(-1,0.25),z);
	return mul(-0.5,math.complex(0,1),math.exp(mul(-0.75,math.complex(0,1),pi(),v)),pow(z,v),pow(term,sub(0,v)),sub(mul(math.exp(mul(math.complex(0,1.5),pi(),v)),besseli(v,term)),besselj(v,term)));
}
function ber(v,z){
	const term = mul(pow(-1,0.25),z);
	return mul(0.5,math.complex(0,1),math.exp(mul(-0.75,math.complex(0,1),pi(),v)),pow(z,v),pow(term,sub(0,v)),add(mul(math.exp(mul(math.complex(0,1.5),pi(),v)),besseli(v,term)),besselj(v,term)));
}
function ker(v,z){
	v = math.add(0.00000002,v);
	const term = mul(pow(-1,0.25),z);
	return mul(0.25,pi(),math.csc(mul(pi(),v)),math.exp(mul(-0.75,math.complex(0,1),pi(),v)),pow(z,sub(0,v)),pow(term,sub(0,v)),
	sub(
	mul(pow(term,add(v,v)),add(besseli(sub(0,v),term),mul(math.exp(mul(math.complex(0,1.5),pi(),v)),besselj(sub(0,v),term)))),
	mul(math.exp(mul(math.complex(0,0.5),pi(),v)),pow(z,add(v,v)),add(besseli(v,term),mul(math.exp(mul(math.complex(0,0.5),pi(),v)),besselj(v,term))))
	));}
function kei(v,z){
	v = math.add(0.00000002,v);
	const term = mul(pow(-1,0.25),z);
	return mul(-0.25,pi(),math.csc(mul(pi(),v)),math.exp(mul(-0.75,math.complex(0,1),pi(),v)),pow(z,sub(0,v)),pow(term,sub(0,v)),
	sub(
	mul(pow(term,add(v,v)),sub(besseli(sub(0,v),term),mul(math.exp(mul(math.complex(0,1.5),pi(),v)),besselj(sub(0,v),term)))),
	mul(math.exp(mul(math.complex(0,0.5),pi(),v)),pow(z,add(v,v)),sub(besseli(v,term),mul(math.exp(mul(math.complex(0,0.5),pi(),v)),besselj(v,term))))
	));}
function bei0(x){return bei(0,x);}
function ber0(x){return ber(0,x);}
function kei0(x){return kei(0,x);}
function ker0(x){return ker(0,x);}



function polygamma(z){
	const m1 = math.log(gamma(b));
    const m2 = math.log(gamma(add(b , epsilon)));
    const m3 = math.log(gamma(add(add(b , epsilon) , epsilon)));
    return div(sub(sub(m2, m1), sub(m3, m2)), epsilon*epsilon);
	let fi=math.complex(0,0);
	for(let k=1;k<bign;k++)
		fi=add(fi,sub(div(1,k),div(1,add(k,z,1))));
	return sub(fi,0.5772156649);
}

function mobiustransform(a,b,c,d,z){
	return div(add(mul(a,z),b),add(mul(c,z),d));
}

function slog(x){
	if (math.complex(x).re>0.1 && math.complex(x).im>-0.5)
	return newtoninv("tetr(x)",x,math.complex(2,0.3),1e-3);
//newtoninv("tetr(x)",x,2+0.03i)
	else if (math.complex(x).re>0.1 && math.complex(x).im<-0.1)
	return newtoninv("tetr(x)",x,math.complex(2,-0.3),1e-3);
//newtoninv("tetr(x)",x,2-0.03i)
	else if ((math.complex(x).re>-1 && math.complex(x).im>-1.337) && math.complex(x).im<1.337)
	return newtoninv("tetr(x)",x,math.complex(-2,-0.1),1e-3);
	else if (math.complex(x).im>1.337 && math.complex(x).re>-4)
//newtoninv("tetr(x)",x,2+i)
	return newtoninv("tetr(x)",x,math.complex(2,1),1e-3);	
	else if (math.complex(x).im<-1.337 && math.complex(x).re>-4)
//newtoninv("tetr(x)",x,2-i)
	return conj(newtoninv("tetr(x)",conj(x),math.complex(2,1)),1e-3);
		else if (math.complex(x).im>1.337)
//newtoninv("tetr(x)",x,2.3+i)
	return newtoninv("tetr(x)",x,math.complex(2.3,1),1e-3);	
	else if (math.complex(x).im<-1.337)
//newtoninv("tetr(x)",x,2.3-i)
	return conj(newtoninv("tetr(x)",conj(x),math.complex(2.3,1)),1e-3);
	else if (math.complex(x).re>-6)
//newtoninv("tetr(x)",x,2-i)
	return newtoninv("tetr(x)",x,mul(math.tanh(x),2),1e-3);
	else return -2;
	
}


math.import({
	slog:slog,
	hypergeometricpolyaleph:hypergeometricpolyaleph,
	canonicalintegral:canonicalintegral,
	generalizedfoxhi:generalizedfoxhi,
	apellf1:apellf1,
	apellf2:apellf2,
	apellf3:apellf3,
	apellf4:apellf4,
	humbertphi1:humbertphi1,
	humbertphi2:humbertphi2,
	humbertphi3:humbertphi3,
	humbertpsi1:humbertpsi1,
	humbertpsi2:humbertpsi2,
	humbertxi1:humbertxi1,
	humbertxi2:humbertxi2,
	foxh:foxh,
	foxfh:foxfh,
	 whittakerm: whittakerm,
    whittakerw: whittakerw,
    pthabsrawmoment: pthabsrawmoment,
    pthrawmoment: pthrawmoment,
    toronto: toronto,
    charlierpoly: charlierpoly,
    cunningham: cunningham,
    coloumbhplus: coloumbhplus,
    coloumbhminus: coloumbhminus,
    coloumbsigma: coloumbsigma,
    coloumbf: coloumbf,
    coloumbg: coloumbg,
    coloumbtheta: coloumbtheta,
    coloumbpsiplus: coloumbpsiplus,
    coloumbpsiminus: coloumbpsiminus,
    coloumbwm: coloumbwm,
    coloumbww: coloumbww,
    coloumbrm: coloumbrm,
    coloumbpsi: coloumbpsi,
    coloumbpsim: coloumbpsim,
    coloumbpsiw: coloumbpsiw,
    meijera: meijera,
    kampedeferiet: kampedeferiet,
	polygamma:polygamma,
	bei:bei,ber:ber,ker:ker,kei:kei,
	 meijerg: meijerg,
		wigner9j:wigner9j,
		wigner1jm:wigner1jm,
		spinweightedsphericalharmonic:spinweightedsphericalharmonic,
		gauntcoefficient:gauntcoefficient,
		hexagonaldelta:hexagonaldelta,
		triangulardelta:triangulardelta,
		recouplingcoefficient:recouplingcoefficient,
		clebschgordan:clebschgordan,
		racahw:racahw,
		racahv:racahv,
		rubixcomb:rubixcomb,
	redrubixcomb:redrubixcomb,
		wigner3j:wigner3jhypg,
		wigner6j:wigner6jhypg,
		triangef:triangef,
	wigner6jf:wigner6jf,
	wigner6jalt:wigner6j,
		wigner3jalt:wigner3j,
        sphericalharmonic:sphericalharmonic,
        sphericalharmonicacoustic:sphericalharmonicacoustic,
        sphericalharmonicgeodesy:sphericalharmonicgeodesy,
        sphericalharmonicmagnetics:sphericalharmonicmagnetics,
		multifactorial:multifactorial,
		
    },
    { override: true }
);
math.import({
Ccauchy:Ccauchy,
Ccircle:Ccircle,
Chankel:Chankel,
Chalfcirc:Chalfcirc,
Cpochammer:Cpochammer,
	cintegral:cintegral,
},	    { override: true }
);
math.import({
	wignerd:wignerd,
	associatedlegendre:associatedlegendre,
	confluenthypergeometricu:confluenthypergeometricu,
	confluenthypergeometricm:confluenthypergeometricm,
	multiset:multiset,
	bwright:bwright,
	awright:awright,
	bwright:bwright,
	mwright:mwright,
	riemannp:riemannp,
	ellipticnum:ellipticnum,
additivepoisedhetahypergeometric:additivepoisedhetahypergeometric,
additivebilateralthetahypergeometric:additivebilateralthetahypergeometric,
additivethetahypergeometric:additivethetahypergeometric,	
poisedhetahypergeometric:poisedhetahypergeometric,
bilateralthetahypergeometric:bilateralthetahypergeometric,
thetahypergeometric:thetahypergeometric,
polyellipticshiftedfactorial:polyellipticshiftedfactorial,
ellipticshiftedfactorial:ellipticshiftedfactorial,
polyadditiveellipticshifteddactorial:polyadditiveellipticshifteddactorial,
additiveellipticshifteddactorial:additiveellipticshifteddactorial,
polymodifiedjacobitheta:polymodifiedjacobitheta,
modifiedjacobitheta:modifiedjacobitheta,
multiqpochhammer:multiqpochhammer,
qpochhammer:qpochhammer,
	polynomial:polynomial,
hypergeometric:hypergeometric,
reghypergeometric:reghypergeometric,
gammastar:gammastar,
bilateralhypergeometric:bilateralhypergeometric,
//meijerg:meijerg
	macroberte:macroberte,
	
schwarztriangle:schwarztriangle,
 barneszeta: barneszeta,
schwarzchristoffelmapd:schwarzchristoffelmapd,
	
schwarzchristoffelmap:schwarzchristoffelmap,
	
	penteract:penteract,
	penteractroot:penteractroot,
		mobiustransform: mobiustransform,
	tesseract: tesseract,
	tesseractroot: tesseractroot,
	plex: plex,
	minex: minex,
	ty: ty,
	teen: teen,
	ylion: ylion,
	yriad: yriad,
	last: last,
	illion: illion,
	illiard: illiard,
	illiad: illiad,
	illiob: illiob,
	exian: exian,
	eciam: eciam,
	beasta: beasta,
	beasto: beasto,
	gar: gar,
	fuga: fuga,
	megafuga: megafuga,
	googo: googo,
	googolple: googolple,
	googople: googople,
	ogoogolple: ogoogolple,
	quecto: quecto,
	ronto: ronto,
	yocto: yocto,
	zepto: zepto,
	atto: atto,
	femto: femto,
	pico: pico,
	nano: nano,
	micro: micro,
	milli: milli,
	centi: centi,
	deci: deci,
	unumilli: unumilli,
	unidecamilli: unidecamilli,
	unihectomilli: unihectomilli,
	unipentohectomilli: unipentohectomilli,
	deca: deca,
	hecto: hecto,
	kilo: kilo,
	myria: myria,
	laka: laka,
	mega: mega,
	crora: crora,
	giga: giga,
	dialogia: dialogia,
	tera: tera,
	peta: peta,
	exa: exa,
	guppa: guppa,
	zetta: zetta,
	yotta: yotta,
	minna: minna,
	ronna: ronna,
	quatta: quetta,
	googola: googola

		},{override:true});
math.import({
	bessely:bessely,
	hankel1:hankel1,
	hankel2:hankel2,
	et:et,
	gammaq:gammaq,
	gammap:gammap,
	lincgamma:lincgamma,
	 incgamma: incgamma,
	 gincgamma:gincgamma,
	 gammareg:gammareg,
	 lgammareg:lgammareg,
	 ggammareg:ggammareg,
	nthderiv:nthderiv,
	airybizeta:airybizeta,
	sinczeta:sinczeta,
	//airytn:airytn,
	airyc:airyc,
	airyzeta:airyzeta,
	hi:scorerhi,
	gi:scorergi,
	 nthint: fractionalintg,
	 harmonics: harmonics,
	  harmonicc: harmonicc,
	twoindexharmonic:twoindexharmonic,
	harmoniclog:harmoniclog,
	fallingfactorial:fallingfactorial,
	pochhammer:pochhammer,
	krampsymbol:krampsymbol,
	hankelsymbol:hankelsymbol,
	ai:ai,
	bi:bi,
	ncr:ncr,
	npr:npr,
	chebyshevustar:chebyshevustar,
	chebyshevtstar:chebyshevtstar,
	chebyshevc:chebyshevc,
	chebyshevs:chebyshevs,
	chebyshevv:chebyshevv,
	chebyshevw:chebyshevw,
	chebyshevu:chebyshevu,
	chebyshevt:chebyshevt,
	dicksone:dicksone,
	dicksond:dicksond,
	dicksongeneral:dicksongeneral,
	ramanujansum:ramanujansum,
	splits:split,
	bireals:bireal,
	bireal:bireale,
	split:splite,
	dervs:derv,
    derv:derve,
	intgs:intg,
	intg:intge,
	duals:dual,
	dual:duale,
	fracderiv:fractionalderiv,
	lnsin:lnsin,
	logsin:logsin,
	lncos:lncos,
	logcos:logcos,
	lntan:lntan,
	logtan:logtan,
	lnsec:lnsec,
	logsec:logsec,
	lncsc:lncsc,
	logcsc:logcsc,
	lncot:lncot,
	logcot:logcot,
	norm:norm,
	},{override:true});
math.import({
	fibpoly:fibpoly,
	lucaspoly:lucaspoly,
	zog:zog,
	keller:keller,
	arckeller:arckeller,
	shoka:shoka,
	zechlog:zechlog,
	pent:pent,
	pentts:pentts,
	theta_e:theta_e,
	nest:nest,
	factorial:factorial,
	tetr:tetr,
	tetrq:tetrq,
		tetrc:tetrbcc,
    arcshoka: arcshoka,
    arctania: arctania,
    anka: anka,
    nemtsov: nemtsov,
    logit: logit,
    wrightw: wrightw,
    tania: tania,
    arctrappmann: arctrappmann,
    doya: doya
},{override:true});
math.import({
    wexzal: wexzal,
    dexp: dexp,
    serpentine: serpentine,
    witchofagnesi: witchofagnesi,
    bouncingfactorial: bouncingfactorial,
    dilbertlambda: dilbertlambda,
    olga: olga,
    glog: glog,
	ssrt:ssrt,
	scbrt:scbrt,
	bernoulli:bernoulli,
	bernoulliz:bernoulliz
});
math.import({
    filog: filog,
    peritet: peritet,
    weakexpofactorial: weakexpofactorial,
    qfunc: qfunc,
    ramanujantautheta: ramanujantautheta,
    schlaflian: schlaflian
});
math.import({
	lambertwd:lambertwd,
	lambertw:lambertw,
erf:erf,
erfc:erfc,
	erfcx:erfcx,
	erfi:erfi,
	dawsondplus:dawsondplus,
	dawsondminus:dawsondminus,
	faddeeva:faddeeva,
	hilberttransform:hilberttransform,
	hilberttransformsub:hilberttransform
},{override:true});

math.import({
    arcsn:arcsn,
    arccn:arccn,
    arcdn:arcdn,
    arcns: arcns,
    arcnc:arcnc,
    arcnd:arcnd,
    arccd:arccd,
    arccs:arccs,
    arcds:arcds,
    arcdc:arcdc,
    arcsc:arcsc,
    arcsd:arcsd,
	
	
});
math.import({
    arcsnd: arcsnd,
    arccnd: arccnd,
    arcdnd: arcdnd,
    arccdd: arccdd,
    arccsd: arccsd,
    arcdsd: arcdsd
});

math.import({
    arcsld: arcsld,
    arcslhd: arcslhd,
	arcsl:arcsl,
	arccl:arccl,
		arcslh:arcslh,
	arcclh:arcclh,
	    slh: slh,
    clh: clh

});
math.import({
    weierstrassauxf1: weierstrassauxf1,
    weierstrassauxf2: weierstrassauxf2
});
math.import({
    arcweierstrassellipticd: arcweierstrassellipticd,
    bickleynaylord: bickleynaylord,
	   arcweierstrasselliptic: arcweierstrasselliptic,
    bickleynaylor: bickleynaylor,
	hurwitzzeta:hurwitzzeta,
		   arcwp: arcweierstrasselliptic
});
math.import({
    weierstrasselliptic: weierstrasselliptic,
	weierstrassellipticd: weierstrassellipticd,
	weierstrassellipticsigma: weierstrassellipticsigma,
	weierstrassellipticzeta: weierstrassellipticzeta,
	weierstrassellipticeta: weierstrassellipticeta,
	weierstrassellipticdelta: weierstrassellipticdelta,
	  wp: weierstrasselliptic,
	wpd: weierstrassellipticd,
	wps: weierstrassellipticsigma,
	wpz: weierstrassellipticzeta,
	wpn: weierstrassellipticeta,
	wpdl: weierstrassellipticdelta
});
math.import({
    besselj: besselj,
    besselk: besselk,
    besseli: besseli,
    neuman: neuman,
 struvel: struvel,
  struvek: struvem,
   struvem: struvek,
    struve: struve
});

math.import({
    clausencos: clausencos,
    clausensin: clausensin,
    legendrechi: legendrechi
});

// Import functions into math namespace
math.import({
integral:integral,
accuracy:accuracy ,
    qnuma: qnum,
    qfac: qfac,
    qpocinf: qpocinf,
    qexp: qexp,
    dqexp: dqexp,
    qpoch: qpoch
});

// Import functions into math.js
math.import({
    weberf: weberf,
    weberf1: weberf1,
    weberf2: weberf2,
    lacunary: lacunary,
    weberr: weberr,
    weberr5: weberr5
});


math.import({
    cc:cc,
    cs:cs,
    cn:cn,
    cd:cd,
    sc:sc,
    ss:ss,
    sn:sn,
    sd:sd,
    nc:nc,
    ns:ns,
    nn:nn,
    nd:nd,
    dc:dc,
    ds:ds,
    dn:dn,
    dd:dd
  });
math.import({
nevthetn:nevthetn,
nevthetd:nevthetd,
nevthets:nevthets,
nevthetc:nevthetc,
fresnelc:fresnelc,
fresnels:fresnels,
fresnelt:fresnelt,
fresnelcs:fresnelcs,
fresnelsc:fresnelsc,
fresnelct:fresnelct,
gudermannian:gudermannian,
gudermannian:gudermannian,
inverf:inverf,
   });
math.import({
    ssi:ssi ,
shi:shi,
chi:chi,

ei,ei,

newtonfix:newtonfix,
newtoninv:newtoninv,
newtonzero:newtonzero,
halleyzero:halleyzero,
halleyfix:halleyfix,
halleyinv:halleyinv,
euler:euler,
ntheuler:ntheuler,
rungekutta:rungekutta,
g:g,
eval:eval,
expo:expo,
comp:comp,
icomp:icomp,
contf:contf,
summate:summate,
product:product,
    });
math.import({
    ein: ein,
    ci: ci,
    nielsenci: nielsenci,
    si: si,
    nielsensi: nielsensi,
    triintgauxf: triintgauxf,
    triintgauxg: triintgauxg,
	 superfuncosp: superfuncosp,
    superfuncqsp: superfuncqsp,
    superfunc: superfunc,
    fastsuperfunc: fastsuperfunc,
    invschroder: invschroder,
    abel: abel,
    invabel: invabel,
    bottcher: bottcher,
    invbottcher: invbottcher,
    abelj: abelj,
    invabelj: invabelj,
    schroderj: schroderj,
    invschroderj: invschroderj,
    bottcherj: bottcherj,
    invbottcherj: invbottcherj
});
math.import({
    ellipticModulus: ellipticModulus,
    compEllipticModulus: compEllipticModulus,
    ellipticLambda: ellipticLambda,
    g2: g2,
    g3: g3,
    picardFuchsJ: picardFuchsJ,
    ellipticDiscriminant: ellipticDiscriminant,
    ellipticLambdaStar: ellipticLambdaStar,

});
math.import({
    barnesg: barnesg,
    kfunc: kfunc,
    beta: beta,
    pin: pin,
    digamma: digamma,
    trigamma: trigamma,
	en:en,
	rookpoly:rookpoly,
	laguerrepoly:laguerrepoly,
	
});
math.import({
    trigonal: trigonal,
    pentagonal: pentagonal,
    hexagonal: hexagonal,
    septagonal: septagonal,
    octagonal: octagonal,
    nonagonal: nonagonal,
    decaagonal: decaagonal,
    dodecagonalgonal: dodecagonalgonal,
    icosagonal: icosagonal,
    myriagonal: myriagonal,
    tetrahedral: tetrahedral,
    pentachoric: pentachoric,
    simplex: simplex,
    gnomon: gnomon
});
math.import({
    hauyoctahedral: hauyoctahedral,
    hauyrhombicdodecahedronal: hauyrhombicdodecahedronal,
    hauysquarepyramid: hauysquarepyramid,
    octahedral: octahedral,
    pronic: pronic,
    biquadratic: biquadratic,
    surfolide: surfolide,
    secondsurfolide: secondsurfolide,
    thirdsurfolide: thirdsurfolide,
    fourthsurfolide: fourthsurfolide,
    fifthsurfolide: fifthsurfolide,
    sixthsurfolide: sixthsurfolide,
    seventhsurfolide: seventhsurfolide,
    nthsurfolide: nthsurfolide,
    zenzicube: zenzicube,
    cubicube: cubicube,
    zenzizenzizenzic: zenzizenzizenzic,
    zenzizenzicube: zenzizenzicube,
    zenzizenzizenzizenzic: zenzizenzizenzizenzic,
    zenzicubicube: zenzicubicube,
    zenzizenzizenzicube: zenzizenzizenzicube,
    nthzenzic: nthzenzic,
    rhombicdodecahedronal: rhombicdodecahedronal,
    truncoctahedral: truncoctahedral,
    trunctetrahedral: trunctetrahedral,
	hyperfactorial:hyperfactorial,
	
});
math.import({
    polygonal: polygonal,
    antisidepolygonal: antisidepolygonal,
    antipolygonal: antipolygonal,
    centeredpolygonal: centeredpolygonal,
    pyramidal: pyramidal,
    star: star,
    starprime: starprime,
    superstarprime: superstarprime,
    reversesuperstar: reversesuperstar,
    superballot: superballot
});
math.import({
    sl:sl,
    cl:cl,
ctlh:ctlh,

tlh:tlh,

    lemniscatetan:lemniscatetan,
    lemniscatecot:lemniscatecot,
    lemniscatecsc:lemniscatecsc,
    lemniscatesec:lemniscatesec,
    lemniscaten:lemniscaten,
    lemniscatem:lemniscatem,
    lemniscates:lemniscates,
    lemniscatet:lemniscatet,
	
	
	aid:aid,
	bid:bid,
});

math.import({
    jacobitheta1:jacobitheta1,
    jacobitheta2:jacobitheta2,
    jacobitheta3:jacobitheta3,
    jacobitheta4:jacobitheta4,
jinvariant:jinvariant
});
math.import({
    laurentexpansion: laurentexpansion,
    dirichletchar: dirichletchar,
    dirichleteta: dirichleteta,
    dirichletbeta: dirichletbeta,
gammad:gammad,
gammac:gamma
},{override:true});
math.import({
    einsteinseries: einsteinseries,
    fouriereinstein: fouriereinstein,
   
    ZZZ: ZZZ,
zeta: ZZZ
});


math.import({
    dedekindeta: dedekindeta
});
math.import({
    acosc: acosc,
    acosq: acosq,
    asinc: asinc,
	
});
math.import({
    griewank: griewank,
    schwefel221: schwefel221,
    schwefel222: schwefel222,
    bird: bird,
    alpine: alpine,
    sdp: sdp,
    sumsquaresonsphere: sumsquaresonsphere,
    michalewicz: michalewicz,
    booths: booths,
    sumsquares: sumsquares,
    bohachevsky: bohachevsky,
    sixhumpcamel: sixhumpcamel,
    shubert: shubert
});
math.import({
    eggholder: eggholder,
    holdertable: holdertable,
    mccormick: mccormick,
    schaffern2: schaffern2,
    schaffern4: schaffern4,
    styblinskitang: styblinskitang,
    mihrasbird: mihrasbird,
    townsend: townsend,
    gomezlevi: gomezlevi,
    simionescu: simionescu
});
math.import({
    rastrigin: rastrigin,
    ackley: ackley,
    sphere: sphere,
    rosenbrock: rosenbrock,
    beale: beale,
    goldsteinprice: goldsteinprice,
    booth: booth,
    bukin: bukin,
    matyas: matyas,
    levi: levi,
    himmelblau: himmelblau,
    threehump: threehump,
    easom: easom,
    crossintray: crossintray
});
math.import({
    collatz: collatz,
    zeromosaic: zeromosaic,
    initialmass: initialmass,
    initialmass2: initialmass2,
    kroupa: kroupa,
    kroupatoutgilmore: kroupatoutgilmore,
    larsona: larsona,
    larsonb: larsonb,
    salpeter: salpeter,
    sigmoid: sigmoid,
    generalizedlogistic: generalizedlogistic,
    logisticphi: logisticphi,
    logisticregression: logisticregression,
    softplus: softplus,
    sobolevatanh: sobolevatanh,
    swish: swish,
    fermidirac: fermidirac,
    boseeinstein: boseeinstein,
    einstein1: einstein1,
    einstein2: einstein2,
    einstein3: einstein3,
    einstein4: einstein4,
    probit: probit,
    logitlogistic: logitlogistic,
    cloglog: cloglog,
    gompertz: gompertz,
    log_logistic: log_logistic,
    logistic_exponential: logistic_exponential,
    log_odds: log_odds
});
math.import({
    cullen: cullen,
    mersenne: mersenne,
    doubleMersenne: doubleMersenne,
	doublemersenne: doubleMersenne,
    double_prime_mersenne: doublePrimeMersenne,
	doublePrimeMersenne: doublePrimeMersenne,
    fermat: fermat,
    fermat_prime: fermatPrime,
	fermatPrime: fermatPrime,
    proth: proth,
    is_proth_prime: isProthPrime,
	isProthPrime: isProthPrime,
    thabit: thabit,
    thabit2: thabit2,
    woodall: woodall,
    gen_woodall: genWoodall,
    is_gen_woodall_prime: isGenWoodallPrime,
	 genWoodall: genWoodall,
    isGenWoodallPrime: isGenWoodallPrime,
    hilbert: hilbert,
    idoneal: idoneal,
    leyland: leyland,
    loschian: loschian,
    jacobsthal: jacobsthal,
    jacobsthal_lucas: jacobsthallucas,
    jacobsthal_oblong: jacobsthaloblong,
    
        pell: pell,
    pell_lucas: pellLucas,
        fibonacci: fibonacci,
    lucas: lucas,
 
    oriented_tree: orientedTree,
	orientedTree:orientedTree,
    magic: magic,
    magic_const: magicConst,
	 magicConst: magicConst,
    alucin: alucin,
    metallic_ratio: metallicRatio,
	metallicRatio: metallicRatio,
    joukowsky: joukowsky,
    karmantrefftz: karmantrefftz,
    symmetrical_joukowsky: symmetricalJoukowsky,
	symmetricalJoukowsky: symmetricalJoukowsky,
    cayley: cayley,
    bilinear: bilinear,
    poincare_disc_metric: poincareDiscMetric,
    poincare_metric: poincareMetric,
	poincareDiscMetric: poincareDiscMetric,
    poincareMetric: poincareMetric,
	sphbesseli:sphbesseli,
	sphbesselj:sphbesselj,
	sphbesselk:sphbesselk,
	sphbessely:sphbessely,
	sphhankel1:sphhankel1,
	sphhankel2:sphhankel2,
	ricattibessels:ricattibessels,
	ricattibesselc:ricattibesselc,
	ricattibesselxi:ricattibesselxi,
	ricattibesselzeta:ricattibesselzeta
});
math.import({
    sqr: sqr,
    sqrm: sqrm,
    cum: cum,
    cumm: cumm,
    fz: fz,
    qnum: qnum,
    regular_interior_angle: regularInteriorAngle,
    regular_exterior_angle: regularExteriorAngle,
    regular_apothem: regularApothem,
    regular_area: regularArea,
    average: average,
    clamp: clamp,
    step: step,
    hstep: hstep,
    ustep: ustep,
    hustep: hustep,
        ceiling: ceiling,
    roundc: round,
    absolute: absolute,
    floorc: floor,
    random_integer: randomInteger,
    random_float: randomFloat
});
math.import({
    dot: dot,
    cross: cross,
    mandel: mandel,
            dex: dex,
    doubleexp: doubleexp,
      logPlus: logPlus,
    logp: logp,
    logpc: logpc,
    colog: colog,
    cuberoot: cbrt,
    rabs: rabs,
    iabs: iabs,
    cabs: cabs,
    sabs: sabs,

    proj: proj,
    real: real,
    imag: imag,
    vdot: vdot,
    vcross: vcross,
    mag: mag,
    angle: angle,
    unitv: unit,
	signum:signum,
    signumop: signumOp
	},{override:true});
math.import({
    arithmeticmean: arithmeticmean,
    geometricmean: geometricmean,
    arithmeticgeometricmean: arithmeticgeometricmean,
    arithmeticharmonicmean: arithmeticharmonicmean,
    geometricharmonicmean: geometricharmonicmean,
    harmonicmean: harmonicmean,
    quadraticmean: quadraticmean,
    cubicmean: cubicmean,
    heronianmean: heronianmean,
    contraharmonicmean: contraharmonicmean,
    neumansandormean: neumansandormean,
    neumansandortmean: neumansandortmean,
    rootmean: rootmean,
    logarithmicmean: logarithmicmean,
    identricmean: identricmean
});
math.import({
    cis: cis,
	sic: sic,
	sicc: sicc,
    cas: cas,
    cish: cish,
    sich: sich,
    cisc: cisc,
    casc: casc,
    cishc: cishc,
	 cashc: cashc,
    sichc: sichc,
    sinp: sinp,
    cosp: cosp,
    tanp: tanp,
    cscp: cscp,
    secp: secp,
    cotp: cotp,
    asinp: asinp,
    acosp: acosp,
    acscp: acscp,
    asecp: asecp
});
math.import({
       crd: crd,
    arccrd: arccrd,
       arccrdd: arccrdd,


    exsec: exsec,
    excosec: excosec,
    versin: versin,
    vercosin: vercosin,
    coversin: coversin,
    covercosine: covercosine,
    haversin: haversin,
    hacovercosin: hacovercosin,
    arcversin: arcversin,
    arcvercos: arcvercos,
    arccoversin: arccoversin,
    arccovercos: arccovercos,
    archaversin: archaversin,
    archavercos: archavercos,
    archacoversin: archacoversin,
    archacovercos: archacovercos,
    sinsqr: sinsqr,
    cossqr: cossqr,
    shid: shid,
        cosc: cosc,
    coshc: coshc,
    sinhc: sinhc,
    tanc: tanc,
    tanhc: tanhc,
casin:casin,
cacos:cacos,
catan:catan,
casec:casec,
cacsc:cacsc,
cacot:cacot

});
math.import({
    ramp: ramp,
    squarewave: squarewave,
    trianglewave: trianglewave,
    sawtoothwave: sawtoothwave,
    pulse: pulse,
    todeg: todeg,
    sind: sind,
    sinhdeg: sinhdeg,
    asind: asind,
    cosd: cosd,
    coshdeg: coshdeg,
    acosd: acosd,
    tand: tand,
    tanhdeg: tanhdeg,
    atand: atand,
    atan2d: atan2d
});
math.import({
    powcos: powcos,
    powsin: powsin,
    expPlus: expPlus,
    exp2: exp2,
    exp10: exp10,

    expc: expc,
    expi: expi,
    expic: expic,
    expein: expein,
    expsqr: expsqr,
    expmsqr: expmsqr,
    logMinus1: logMinus1,


    _log: _log,
    antilog: antilog,
    antilog2: antilog2,
    antilog10: antilog10,
    logc: logc,
    naplog: naplog,
    dist: dist,

    sdist: sdist,
    zdist: zdist,
	
	rec:rec
});


// Import the functions into Math.js
math.import({
    taxicab: taxicab,
    arctaxicab: arctaxicab,
    chebyshev: chebyshev,
    arcchebyshev: arcchebyshev
});

    math.import({
      sinc: sinc
    });