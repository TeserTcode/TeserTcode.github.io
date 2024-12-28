let bign = 10;
const I = math.complex(0,1);
//gettaylorff("primeexp(x)",6,0,-1,8)
//conjy("superfunctionqsp('e^x',1,x,2,10,filog(e))",x)
function retry (func,x,n){
	let fi=math.complex(0,0);
	for(let i=0;i<n;i++)
	fi = add(fi,math.evaluate(func,{x:x,i:i,n:n}));
	return div(fi,n);
}
function repeatnum(charm, n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(charm);
  }
  return result;
}
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
function randlist(n) {
    let list = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]]; // Swap elements
    }
    return list;
}

function ordlist(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
}

function revlist(n) {
    return Array.from({ length: n }, (_, i) => n - i);
}
function Cpochammer() {
    const points = poschhammerp.map(point => math.complex(point.re, point.im));
    return new contour(points);
}
function Ccircle(r=1, x=math.complex(0,0)) {
    const totalCircumference = 2 * Math.PI * r;  // Total circumference of the circle
    const points = [];
    const numPoints = bign;  // Number of points to approximate the circle

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





function tobinary(n) {
    if (n === 0) return '0'
    let intpart = Math.floor(Math.abs(n)).toString(2)
    let fracpart = ''
    let frac = Math.abs(n) - Math.floor(Math.abs(n))
    while (frac > 0 && fracpart.length < 20) {
        frac *= 2
        if (frac >= 1) {
            fracpart += '1'
            frac -= 1
        } else {
            fracpart += '0'
        }
    }
    let res = intpart + (fracpart ? '.' + fracpart : '')
    return n < 0 ? '-' + res : res
}

function frombinary(s) {
    let neg = s[0] === '-'
    if (neg) s = s.slice(1)
    let [intpart, fracpart] = s.split('.')
    let intres = parseInt(intpart, 2) || 0
    let fracres = 0
    if (fracpart) {
        for (let i = 0; i < fracpart.length; i++) {
            if (fracpart[i] === '1') fracres += 1 / (2 ** (i + 1))
        }
    }
    let result = intres + fracres
    return neg ? -result : result
}

function padbin(a, b) {
    let [aint, afrac = ''] = a.split('.')
    let [bint, bfrac = ''] = b.split('.')
    let maxint = Math.max(aint.length, bint.length)
    let maxfrac = Math.max(afrac.length, bfrac.length)
    aint = aint.padStart(maxint, '0')
    bint = bint.padStart(maxint, '0')
    afrac = afrac.padEnd(maxfrac, '0')
    bfrac = bfrac.padEnd(maxfrac, '0')
    return [aint + '.' + afrac, bint + '.' + bfrac]
}

function applybinop(a, b, op) {
    let result = ''
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '.' || b[i] === '.') {
            result += '.'
        } else {
            let bit1 = a[i] === '1' ? 1 : 0
            let bit2 = b[i] === '1' ? 1 : 0
            result += op(bit1, bit2).toString()
        }
    }
    return result
}

function orr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => x | y))
}

function andr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => x & y))
}

function norr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => ~(x | y) & 1))
}

function nandr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => ~(x & y) & 1))
}

function xorr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => x ^ y))
}

function xnorr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => ~(x ^ y) & 1))
}

function impliesr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => (!x | y) & 1))
}

function nimpliesr(a, b) {
    let [ab, bb] = padbin(tobinary(a), tobinary(b))
    return frombinary(applybinop(ab, bb, (x, y) => (x & !y) & 1))
}
function bifunc(func,func2,x){
	return math.complex(func(re(x)),func2(im(x)));
}
function bifunction(func,func2,x){
	return math.complex(math.evaluate(func,{x:re(math.complex(x))}),math.evaluate(func2,{x:im(math.complex(x))}))
}

function complexf(func,args,A=[1,0,0,1],B=[0,-1,1,0]) {
    function apply_func_to_diag(diag, func) {
        return [
            [(func(diag[0][0])), math.complex(0)],
            [math.complex(0), (func(diag[1][1]))],
        ];
    }
function mdiv(a, b) {
	return [[div(a[0][0],b),div(a[0][1],b)],[div(a[1][0],b),div(a[1][1],b)]];
	
}
    function matrix_mult(a, b) {
        return [
            [
                math.add(
                    math.multiply(a[0][0], b[0][0]),
                    math.multiply(a[0][1], b[1][0])
                ),
                math.add(
                    math.multiply(a[0][0], b[0][1]),
                    math.multiply(a[0][1], b[1][1])
                ),
            ],
            [
                math.add(
                    math.multiply(a[1][0], b[0][0]),
                    math.multiply(a[1][1], b[1][0])
                ),
                math.add(
                    math.multiply(a[1][0], b[0][1]),
                    math.multiply(a[1][1], b[1][1])
                ),
            ],
        ];
    }

    function invert_matrix(matrix) {
        const det = math.subtract(
            math.multiply(matrix[0][0], matrix[1][1]),
            math.multiply(matrix[0][1], matrix[1][0])
        );

        if (math.equal(det, 0)) {
            throw new Error("Matrix is not invertible");
        }

        return [
            [math.divide(matrix[1][1], det), math.divide(math.unaryMinus(matrix[0][1]), det)],
            [math.divide(math.unaryMinus(matrix[1][0]), det), math.divide(matrix[0][0], det)],
        ];
    }

    const matrix = [
        [add(mul(args.re,g(A,0)),mul(args.im,g(B,0))),add(mul(args.re,g(A,1)),mul(args.im,g(B,1)))],
        [add(mul(args.re,g(A,2)),mul(args.im,g(B,2))), add(mul(args.re,g(A,3)),mul(args.im,g(B,3)))],
    ];
	const absss=mag(args)*10;
	const matrixs = mdiv(matrix,absss)

    const { values: eigenvalues, vectors: eigenvectors } = math.eigs(matrixs);

    const p = [
        [eigenvectors[0][0], eigenvectors[0][1]],
        [eigenvectors[1][0], eigenvectors[1][1]],
    ];
    const p_inv = invert_matrix(p);
    const diag = matrix_mult(matrix_mult(p_inv, matrix), p);

    const transformed_diag = apply_func_to_diag(diag, func);
    let final_matrix = matrix_mult(
        matrix_mult(p, transformed_diag),
        p_inv
    );

//final_matrix = p;
    return math.complex(final_matrix[0][0].re,final_matrix[1][0].re);
}

function complexe(func,args,A=[1,0,0,1],B=[0,-1,1,0]) {
function apply_func_to_diag(diag, func) {
    return [
        [(math.evaluate(func, { x: diag[0][0] })), math.complex(0)],
        [math.complex(0), (math.evaluate(func, { x: diag[1][1] }))],
    ];
}
function mdiv(a, b) {
	return [[div(a[0][0],b),div(a[0][1],b)],[div(a[1][0],b),div(a[1][1],b)]];
	
}
    function matrix_mult(a, b) {
        return [
            [
                math.add(
                    math.multiply(a[0][0], b[0][0]),
                    math.multiply(a[0][1], b[1][0])
                ),
                math.add(
                    math.multiply(a[0][0], b[0][1]),
                    math.multiply(a[0][1], b[1][1])
                ),
            ],
            [
                math.add(
                    math.multiply(a[1][0], b[0][0]),
                    math.multiply(a[1][1], b[1][0])
                ),
                math.add(
                    math.multiply(a[1][0], b[0][1]),
                    math.multiply(a[1][1], b[1][1])
                ),
            ],
        ];
    }

    function invert_matrix(matrix) {
        const det = math.subtract(
            math.multiply(matrix[0][0], matrix[1][1]),
            math.multiply(matrix[0][1], matrix[1][0])
        );

        if (math.equal(det, 0)) {
            throw new Error("Matrix is not invertible");
        }

        return [
            [math.divide(matrix[1][1], det), math.divide(math.unaryMinus(matrix[0][1]), det)],
            [math.divide(math.unaryMinus(matrix[1][0]), det), math.divide(matrix[0][0], det)],
        ];
    }

    const matrix = [
        [add(mul(args.re,g(A,0)),mul(args.im,g(B,0))),add(mul(args.re,g(A,1)),mul(args.im,g(B,1)))],
        [add(mul(args.re,g(A,2)),mul(args.im,g(B,2))), add(mul(args.re,g(A,3)),mul(args.im,g(B,3)))],
    ];
	const absss=mag(args)*10;
	const matrixs = mdiv(matrix,absss);

    const { values: eigenvalues, vectors: eigenvectors } = math.eigs(matrixs);

    const p = [
        [eigenvectors[0][0], eigenvectors[0][1]],
        [eigenvectors[1][0], eigenvectors[1][1]],
    ];
    const p_inv = invert_matrix(p);
    const diag = matrix_mult(matrix_mult(p_inv, matrix), p);

    const transformed_diag = apply_func_to_diag(diag, func);
    let final_matrix = matrix_mult(
        matrix_mult(p, transformed_diag),
        p_inv
    );
//final_matrix = p;
    return math.complex(final_matrix[0][0].re, final_matrix[1][0].re);
}






function id(x){return x};
function succ(x){return add(x,1)};
function cons(x){return 1};
function biggerthan(a, b) {
  return re(a) > re(b) ? 1 : 0; 
}

function smallerthan(a, b) {
  return re(a) < re(b) ? 1 : 0;
}

function biggerthanequalto(a, b) {
  return re(a) >= re(b) ? 1 : 0;
}

function smallerthanequalto(a, b) {
  return re(a) <= re(b) ? 1 : 0;
}

function equalto(a, b) {
  return re(a) === re(b) ? 1 : 0;
}

function notequalto(a, b) {
  return re(a) !== re(b) ? 1 : 0;
}

function magnitudebiggerthan(a, b) {
  return Math.sqrt(re(a) * re(a) + im(a) * im(a)) > Math.sqrt(re(b) * re(b) + im(b) * im(b)) ? 1 : 0;
}

function magnitudesmallerthan(a, b) {
  return Math.sqrt(re(a) * re(a) + im(a) * im(a)) < Math.sqrt(re(b) * re(b) + im(b) * im(b)) ? 1 : 0;
}

function magnitudebiggerthanequalto(a, b) {
  return Math.sqrt(re(a) * re(a) + im(a) * im(a)) >= Math.sqrt(re(b) * re(b) + im(b) * im(b)) ? 1 : 0;
}

function magnitudesmallerthanequalto(a, b) {
  return Math.sqrt(re(a) * re(a) + im(a) * im(a)) <= Math.sqrt(re(b) * re(b) + im(b) * im(b)) ? 1 : 0;
}


function tan(x){return math.tan(x);}
function cot(x){return math.cot(x);}
function cos(x){return math.cos(x);}
function sin(x){return math.sin(x);}
function atan(x){return math.atan(x);}
function acot(x){return math.acot(x);}
function acos(x){return math.acos(x);}
function asin(x){return math.asin(x);}


function gettop(x,y){
	if(math.complex(y).im>=0)return x;
	return 0;
}
function getbot(x,y){
	if(math.complex(y).im<0)return x;
	return 0;
}
function getrig(x,y){
	if(math.complex(y).re>=0)return x;
	return 0;
}
function getlef(x,y){
	if(math.complex(y).re<0)return x;
	return 0;
}

function integral(func, initial, end, input, N = bign) {
    function simpsonsRule(a, b, n) {
		
        const h = div(sub(b, a), n);
		
        let sum = math.complex(0,0); 
        for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0), func(add(a, mul(math.complex(i), h)), input)));
        }
        for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0), func(add(a, mul(math.complex(i), h)), input)));
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
function cintegralf(func, C , t=0 , N = bign) {
let sum = math.complex(0,0); 
let n = N;
const h = div(1, n);
for (let i = 1; i < n-1; i += 1){
	sum = add(sum,mul(func(C.cdist(mul(h,i)),t),sub(C.cdist(mul(h,i)),C.cdist(mul(h,i-1)))));
}
return sum;

}

function getdenom(x, epsilons = 1e-2) {
    let a = math.complex(1);
    let b = math.complex(1);
    const yy = cabs(x);
	const y=math.complex(math.mod(yy.re,1),math.mod(yy.im,1));
    let approx = div(a, b);
    let k = mag(sub(y, approx));

    const one = math.complex(1, 0);
    const i = math.complex(0, 1);

    for (let asd=0;asd<bign*bign*2 && k > epsilons;asd++) {
        const options = [
            { nextA: add(a, one), nextB: b },
            { nextA: a, nextB: add(b, one) },
            { nextA: add(a, i), nextB: b }
        ];

        let bestOption = options[0];
        let minK = mag(sub(y, div(bestOption.nextA, bestOption.nextB)));

        for (let option of options) {
            const newApprox = div(option.nextA, option.nextB);
            const newK = mag(sub(y, newApprox));
            if (newK < minK) {
                minK = newK;
                bestOption = option;
            }
        }

        a = bestOption.nextA;
        b = bestOption.nextB;
        approx = div(a, b);
        k = mag(sub(y, approx));
    }

    return b;
}


function getdenomangle(x,thet, epsilons = 1e-2) {
    let a = math.complex(1);
    let b = math.complex(1);
    const yy = cabs(x);
	  const i = cis(thet);
	const y=math.complex(math.mod(yy.re+1000,1),yy.im);
    let approx = div(a, b);
    let k = mag(sub(y, approx));

    const one = math.complex(1, 0);
  

    for (let asd=0;asd<bign*bign*2 && k > epsilons;asd++) {
        const options = [
            { nextA: add(a, one), nextB: b },
            { nextA: a, nextB: add(b, one) },
            { nextA: add(a, i), nextB: b }
        ];
        let bestOption = options[0];
        let minK = mag(sub(y, div(bestOption.nextA, bestOption.nextB)));

        for (let option of options) {
            const newApprox = div(option.nextA, option.nextB);
            const newK = mag(sub(y, newApprox));
            if (newK < minK) {
                minK = newK;
                bestOption = option;
            }
        }

        a = bestOption.nextA;
        b = bestOption.nextB;
        approx = div(a, b);
        k = mag(sub(y, approx));
    }

    return b;
}
function getdenompolyangle(x, thet, epsilons = 1e-2) {
    let a = math.complex(1);
    let b = math.complex(1);
    const yy = cabs(x);
	const y=x;
   // const y = math.complex(math.mod(yy.re + 1000, 1), yy.im);
    let approx = div(a, b);
    let k = mag(sub(y, approx));

    const one = math.complex(1, 0);
    const length = leng(thet);  // Length of the thet list

    for (let asd = 0; asd < bign * bign * 2 && k > epsilons; asd++) {
        // Base options
        let options = [
            { nextA: add(a, one), nextB: b },
            { nextA: a, nextB: add(b, one) }
        ];

        // Additional options from each entry in `thet`
        for (let n = 0; n < length; n++) {
            options.push({ nextA: add(a, cis(g(thet, n))), nextB: b });
        }

        let bestOption = options[0];
        let minK = mag(sub(y, div(bestOption.nextA, bestOption.nextB)));

        // Evaluate each option to find the one with the smallest k
        for (let option of options) {
            const newApprox = div(option.nextA, option.nextB);
            const newK = mag(sub(y, newApprox));
            if (newK < minK) {
                minK = newK;
                bestOption = option;
            }
        }

        // Update `a`, `b`, `approx`, and `k` based on the best option found
        a = bestOption.nextA;
        b = bestOption.nextB;
        approx = div(a, b);
        k = mag(sub(y, approx));
    }

    return b;
}//getdenompolyangle(x,[2*pi/3,5*pi/6])

function thomea(x, epsilon = 1e-2){
	return div(1,getdenom(x,epsilon));
}
function getnom(x, epsilons = 1e-2) {
    let a = math.complex(1);
    let b = math.complex(1);
    const yy = cabs(x);
	const y=math.complex(math.mod(yy.re,1),math.mod(yy.im,1));
    let approx = div(a, b);
    let k = mag(sub(y, approx));

    const one = math.complex(1, 0);
    const i = math.complex(0, 1);

    for (let asd=0;asd<bign*bign*2 && k > epsilons;asd++) {
        const options = [
            { nextA: add(a, one), nextB: b },
            { nextA: a, nextB: add(b, one) },
            { nextA: add(a, i), nextB: b }
        ];

        let bestOption = options[0];
        let minK = mag(sub(y, div(bestOption.nextA, bestOption.nextB)));

        for (let option of options) {
            const newApprox = div(option.nextA, option.nextB);
            const newK = mag(sub(y, newApprox));
            if (newK < minK) {
                minK = newK;
                bestOption = option;
            }
        }

        a = bestOption.nextA;
        b = bestOption.nextB;
        approx = div(a, b);
        k = mag(sub(y, approx));
    }

    let res = add(a,mul(floor(yy),b));
	return math.complex(mul(res.re,signum(math.complex(x).re)),mul(res.im,signum(math.complex(x).im)));
}
function approxfraction(x, epsilons = 1e-2) {
    let b = getdenom(x, epsilons);
    let a = getnom(x, epsilons);
    return [ a, b ];
}
function approxfractionvalue(x, epsilons = 1e-2) {
    let b = getdenom(x, epsilons);
    let a = getnom(x, epsilons);
    return div(a,b);
}

function fractionerror(x, epsilons = 1e-2) {
    return sub(x,approxfractionvalue(x,epsilons));
}
function dirichlet(x, epsilon = 1e-2,epsilons = 7e-3){
	if(mag(fractionerror(x,epsilon))<epsilons)return 1;return 0;
}




function getdenomeinstein(x,epsilons = 1e-2) {
	return getdenomangle(x,div(pi(),0.5,3),epsilons);}

//getdenom(3.1315926535)

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
		function mobius(n) {
    if (n === 1) return 1;
    let primeCount = 0;
    let factor = 2;
    while (factor * factor <= n) {
        if (n % factor === 0) {
            n /= factor;
            primeCount++;
			if (n % factor === 0) return 0;}
        factor++;}
if (n > 1) primeCount++;
return primeCount % 2 === 0 ? 1 : -1;
}
function popovici(k,n){
    let result = math.complex(1,0);
    for (let i = 1; nthprime(i) <= n; i++) {
		let jn=0;
        while(n % nthprime(i) === 0)
		{jn++;n=div(n,nthprime(i));}
	//console.log(jn);
           result = mul(result,mul(pow(-1,jn),ncr(k,jn)));       
    }
    return result;
}

function sumofdivisors(n){
   let sum = 0;
    for (let i=1;i*i<=n;i++) {
        if (n%i===0) {
            sum+=i;
            if (i!==n/i) {
                sum+=n/i;
            }}}
    return sum;
}
function sumofdivisorsk(n, k = 1) {
    let sum = 0;
    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            sum += Math.pow(i, k);
            if (i !== n / i) {
                sum += Math.pow(n / i, k);
            }
        }
    }
    return sum;
}
function jordantotient(n, k = 1) {
    let result = pow(n, k);
    let factor = 2;

    while (factor * factor <= n) {
        if (n % factor === 0) {
            result *= (1 - 1 / pow(factor, k));
            while (n % factor === 0) {
                n /= factor;
            }
        }
        factor++;
    }

    if (n > 1) result *= (1 - 1 / pow(n, k)); // Remaining prime factor

    return Math.round(result);
}
function carmichael(n) {
    if (n === 1) return 1;

    let result = 1;
    let factor = 2;

    while (factor * factor <= n) {
        if (n % factor === 0) {
            let power = 1;
            while (n % factor === 0) {
                n /= factor;
                power *= factor;
            }
            power /= factor;
            let lambda = (factor === 2 && power > 1) ? power / 2 : power;
            result = lcm(result, lambda);
        }
        factor++;
    }

    if (n > 1) result = lcm(result, n - 1); // Remaining prime factor

    return result;
}
function mangoldt(n) {
    if (n < 2) return 0;

    let factor = 2;
    while (factor * factor <= n) {
        if (n % factor === 0) {
            while (n % factor === 0) n /= factor;
            return n === 1 ? log(factor) : 0;
        }
        factor++;
    }

    return log(n); // n itself is prime
}
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
function sumofproperdivisors(n){
   let sum = 0;
    for (let i=1;i*i<=n;i++) {
        if (n%i===0) {
            sum+=i;
            if (i!==n/i) {
                sum+=n/i;
            }}}
    return sub(sum,n);
}
function countdivisors(n){
    let count = 0;
    for (let i=1;i*i<=n;i++) {
        if (n%i===0) {
            count++;
            if (i!==n/i) {
                count++;
            }}}
    return count;
}	
function liouville(n) {
    let factorCount = 0;
    let factor = 2;
    while (factor * factor <= n) {
        while (n % factor === 0) {
            n /= factor;
            factorCount++;
        }
        factor++;
    }
    if (n > 1) factorCount++;
    return factorCount % 2 === 0 ? 1 : -1;
}
function distinctprimefactors(n) {
    let count = 0;
    let factor = 2;
   while (factor * factor <= n) {
        if (n % factor === 0) {
            count++;
            while (n % factor === 0) {
                n /= factor;
            }
        }
        factor++;
    }
    if (n > 1) count++; 
    return count;
}
function totalprimefactors(n) {
    let count = 0;
    let factor = 2;
    while (factor * factor <= n) {
        while (n % factor === 0) {
            n /= factor;
            count++;
        }
        factor++;
    }
    if (n > 1) count++; 

    return count;
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

function lptransform(func,b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * math.evaluate(func,{x:ata,p:b,s:ss}),
        ss * math.evaluate(func,{x:sub(ata,div(pi(),2)),p:b,s:ss})
    );
}/*
function lptransformd(func,b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * math.evaluate(func,{x:ata,p:b,s:ss}),
        ss * )
    );
}*/
function lptransform2(func,func2,b) {
    const xf = b.re;
    const yf = b.im;
    const ss = Math.sqrt(xf * xf + yf * yf);
    const ata = Math.atan2(yf, xf);
    return math.complex(
        ss * math.evaluate(func,{x:ata,p:b,s:ss}),
        ss * math.evaluate(func2,{x:ata,p:b,s:ss})
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
function log2( b) {
    return  math.log(b, 2.0);
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
function ramp(b,a=1) {
    return mul(a, math.mod(b, 2 * math.pi) / math.pi - 1.0);
}


function inverselinear( a, b=0,y=0) {
    return div(sub(y, b), a);
}
function inversequadratic( a, b, c=0,y=0, parity = 0) {
	if(a==0)return inverselinear(b,c,y);
    const discriminant = sub(sqr(b), mul(4, a, sub(c, y)));
    const sqrtDiscriminant = sqrt(discriminant);
    if (parity === 0) {
        return div(sub(sub(0,b), sqrtDiscriminant), mul(2, a));
    } else {
        return div(add(sub(0,b), sqrtDiscriminant), mul(2, a));
    }
}
function inversecubic(a, b, c, d = 0, y = 0, parity = 0) {
    d = sub(d, y);
    if (a === 0) {
   return inversequadratic(b,c,d,y,parity)
    }

    const p = div(sub(mul(3, a, c), pow(b, 2)), mul(3, pow(a, 2)));
    const q = div(add(sub(mul(2, pow(b, 3)), mul(9, a, b, c)), mul(27, pow(a, 2), d)), mul(27, pow(a, 3)));
    const delta = add(pow(div(q, 2), 2), pow(div(p, 3), 3));

    const u = cbrt(add(div(sub(0, q), 2), pow(delta, 0.5)));
    const v = cbrt(sub(div(sub(0, q), 2), pow(delta, 0.5)));

    const sqrt3 = pow(3, 0.5);
    const omegaReal = sub(-0.5, 0); 
    const omegaImag = sqrt3 / 2;



    if (parity === 0) {
		const root1 = sub(add(u, v), div(b, mul(3, a)));
        return root1;
    } else if (parity === 1) {
		    const uOmega = sub(add(mul(omegaReal, u), mul(omegaImag, v)), 0);
    const vOmega = sub(add(mul(-omegaImag, u), mul(omegaReal, v)), 0);
    const root2 = sub(add(uOmega, vOmega), div(b, mul(3, a)));
        return root2;
    } else {
		    const uOmega2 = sub(add(mul(omegaImag, u), mul(omegaReal, v)), 0);
    const vOmega2 = sub(add(mul(-omegaReal, u), mul(omegaImag, v)), 0);
    const root3 = sub(add(uOmega2, vOmega2), div(b, mul(3, a)));
        return root3;
    }
}
0

function solvequartic(a, b, c, d, e = 0, y22 = 0, parity2=0,parity6=0,parity5=0,parity3=0,parity4=0) {
    e = sub(e, y22);

    if (a === 0) {
     return inversecubic(b,c,d,e,y22,parity);
    }

    //x^4+ax^3+bx^2+cx+d=0
    const a3 = div(b, a);
    const a2 = div(c, a);
    const a1 = div(d, a);
    const a0 = div(e, a);
	    //x^4+px^2+qx+r=0
	const p = sub(a2,div(mul(3,a3,a3),8));
	const q = add(a1,mul(-0.5,a2,a3),div(mul(a3,a3,a3),8));
	const r = add(a0,mul(-0.25,a1,a3),div(mul(a2,a3,a3),16),div(mul(3,a3,a3,a3,a3),-256));
	
	const y = inversecubic(1,sub(0,a2),sub(mul(a1,a3),mul(4,a0)),sub(mul(4,a2,a0),mul(a1,a1),mul(a3,a3,a0)),0,parity2);
	
	let R = sqrt(add(div(mul(a3,a3),4),mul(-1,a2),y));
	R = mul(R,pow(-1,parity6));
	let D = 0;
	if(R==0)
	D = sqrt(add(mul(3,0.25,a3,a3) , mul(-2,a2) , mul(pow(-1,parity4),2,sqrt(sub(mul(y,y),mul(4,a0)))) ));
	D = sqrt(add(mul(3,0.25,a3,a3) , mul(-1,R,R) , mul(-2,a2) , div(sub(mul(4,a3,a2),mul(8,a1),mul(a3,a3,a3)),-4,R) ));
	D = mul(D,pow(-1,parity3));
	let E = 0;
	if(R==0)
	E = sqrt(add(mul(3,0.25,a3,a3) , mul(-2,a2) , mul(pow(-1,parity4),-2,sqrt(sub(mul(y,y),mul(4,a0)))) ));
	E = sqrt(add(mul(3,0.25,a3,a3) , mul(-1,R,R) , mul(-2,a2) , div(sub(mul(4,a3,a2),mul(8,a1),mul(a3,a3,a3)),4,R) ));
	E = mul(E,pow(-1,parity5));
	return [add(mul(-0.25,a3),mul(0.5,R),mul(0.5,D)),
	 add(mul(-0.25,a3),mul(0.5,R),mul(-0.5,D)),
	 add(mul(-0.25,a3),mul(-0.5,R),mul(0.5,D)),
	add(mul(-0.25,a3),mul(-0.5,R),mul(-0.5,D))]

	
}

function solvequadratic(a, b, c=0, parity = 0) {
    const discriminant = sub(sqr(b), mul(4, a, c));
    const sqrtDiscriminant = sqrt(discriminant);
    if (parity === 0) {
        return [
            div(sub(sub(0,b), sqrtDiscriminant), mul(2, a)),
            div(add(sub(0,b), sqrtDiscriminant), mul(2, a))
        ];
    } else {
        return [
            div(add(sub(0,b), sqrtDiscriminant), mul(2, a)),
            div(sub(sub(0,b), sqrtDiscriminant), mul(2, a))
        ];
    }
}

function solvecubic(a, b, c, d=0,y=0) {
    d = sub(d, y);
    if (a === 0) {
   return inversequadratic(b,c,d,y,parity)
    }

    const p = div(sub(mul(3, a, c), pow(b, 2)), mul(3, pow(a, 2)));
    const q = div(add(sub(mul(2, pow(b, 3)), mul(9, a, b, c)), mul(27, pow(a, 2), d)), mul(27, pow(a, 3)));
    const delta = add(pow(div(q, 2), 2), pow(div(p, 3), 3));

    const u = cbrt(add(div(sub(0, q), 2), pow(delta, 0.5)));
    const v = cbrt(sub(div(sub(0, q), 2), pow(delta, 0.5)));

    const sqrt3 = pow(3, 0.5);
    const omegaReal = sub(-0.5, 0); 
    const omegaImag = sqrt3 / 2;

    const root1 = sub(add(u, v), div(b, mul(3, a)));



		    const uOmega = sub(add(mul(omegaReal, u), mul(omegaImag, v)), 0);
    const vOmega = sub(add(mul(-omegaImag, u), mul(omegaReal, v)), 0);
    const root2 = sub(add(uOmega, vOmega), div(b, mul(3, a)));

		    const uOmega2 = sub(add(mul(omegaImag, u), mul(omegaReal, v)), 0);
    const vOmega2 = sub(add(mul(-omegaReal, u), mul(omegaImag, v)), 0);
    const root3 = sub(add(uOmega2, vOmega2), div(b, mul(3, a)));

    return [root1, root2, root3];
}



















function xpsin(x){return add(x,sin(x));}
function xmsin(x){return sub(x,sin(x));}

function arcxmsin(x){return newtoninv("xmsin(x)",x,add(x,sawtoothwave(x))) }
function arcxpsin(x){return newtoninv("xpsin(x)",x,add(x,sawtoothwave(add(pi(),x),div(pi(),2)))) }
function arcxmdsin(x,d=1){return newtoninv("x-("+d+")*sin(x)",x,add(x,sawtoothwave(x))) }

function tcospcost(x,t=1){return add(mul(t,cos(x)),cos(mul(t,x)))}
function arctcospcost(x,d=1){return newtoninv("tcospcost(x,("+d+"))",x,div(acos(div(x,1)),d)) }
function tcosmcost(x,t=1){return sub(mul(t,cos(x)),cos(mul(t,x)))}
function arctcosmcost(x,d=1){return newtoninv("tcosmcost(x,("+d+"))",x,div(acos(div(x,1)),1)) }

function tcospdcost(x,d=1,t=1){return add(mul(t,cos(x)),mul(d,cos(mul(t,x))))}
function arctcospdcost(x,d=1,t=1){return newtoninv("tcospdcost(x,("+d+"),("+t+"))",x,div(acos(div(sub(x,t,-1),add(d,1))),t)) }

function arcwittgensteinsc(x,h=1,v=1,l=1){return newtoninv("wittgensteinsc(x,("+h+"),("+v+"),("+l+"))",x,acos(add(x,mul(l,l),mul(l,0.5)))) }
function wittgensteinsc(x,h=1,v=1,l=1){return sub(pow(cos(x),2),div(mul(pow(l,2),pow(sub(h,cos(x)),2)),add(pow(sub(v,sin(x)),2),pow(sub(h,cos(x)),2))))}
//newtoninv("wittgensteinsc(x,0,1,2)",x,x)
//

function dtanpi4pcos(x,d=1){return add(mul(d,tan(add(x,div(pi(),4)))),cos(x))}
function arcdtanpi4pcos(x,d=1){if(math.complex(d).re<0){ return newtoninv("dtanpi4pcos(x,("+d+"))",x,acos(x));}return newtoninv("dtanpi4pcos(x,("+d+"))",x,sub(0,acos(x))) }

function sin2tan(x){return div(pow(sin(x),3),cos(x));}
function arcsin2tan(x){if(math.complex(x).re>0)return newtoninv("sin(x)^3/cos(x)",x,atan(mul(1.6,pow(x,0.6))));return sub(0,newtoninv("sin(x)^3/cos(x)",sub(0,x),atan(mul(1.6,pow(sub(0,x),0.6)))));}

//arctcospdcost(x,2,3)

function circle(x,p=1,parity=0){
	return mul(p,pow(-1,parity),sqrt(sub(1,sqr(div(x,p)))))
}
function ellipse(x, px=1, py=1, parity=0) {
    return mul(py, pow(-1, parity), sqrt(sub(1, (div(x, px)))));
}
function superellipse(x, p=1, parity=0, n=2) {
    return mul(p, pow(-1, parity), pow(sub(1, pow(sqr(div(x, p)), n)), div(1, n)));
}

function cycloid(x,p=1){
	return div(sub(p,mul(p,cos(arcxmsin(div(mul(2,pi(),x),p))))),pi(),2)
}
function tautochrone(x,p=1){
	return div(sub(p,mul(p,cos(arcxpsin(div(mul(2,pi(),x),p))))),pi(),2)
}
function trochoid(x,d=1,p=1){
	return div(sub(p,mul(p,cos(arcxmdsin(div(mul(2,pi(),x),p),div(d,p))))),pi(),2)
}
function hypocycloid(x,k=1){
	let d=sub(k,1)
	let fi=arctcospcost(x,d)
	return sub(mul(d,sin(fi)),sin(mul(d,fi)))
}
function hypotrochoid(x,d=1,k=1){
	let kk=sub(k,1)
	let fi=arctcospdcost(x,d,kk)
	return sub(mul(kk,sin(fi)),mul(d,sin(mul(kk,fi))))
}
function epitrochoid(x,d=1,k=1){
	let kk=add(k,1)
	let fi=arctcospdcost(x,d,kk)
	return sub(mul(kk,sin(fi)),mul(d,sin(mul(kk,fi))))
}
function epicycloid(x,k=1){
	let d=add(k,1)
	let fi=arctcospcost(x,d)
	return sub(mul(d,sin(fi)),sin(mul(d,fi)))
}





function lissajous(x,wx=1,wy=1,dx=0,dy=0,ax=1,bx=1){
	return mul(bx,cos(sub(mul(add(div(acos(div(x,ax)),wx),dx),wy),dy)))
}
function lissajoussimple(x,wx=1,dx=0,ax=1,bx=1){
	return mul(bx,cos(sub(mul(add(div(acos(div(x,ax)),wx),dx),1),1)))
}
function wittgensteins(x,h=1,v=1,l=1){
	let xxx = add(wittgensteinsc(x,h,v,l),mul(x,acos(div(x,-2))),mul(x,x))
return add(div(mul(sub(v,sin(x)),sub(arcwittgensteinsc(x,h,v,l),cos(x))),sub(h,cos(x))),sin(x))
}
function cardioid(x,parity=1,parity2=0){
	let fi = add(parity2,mul(pow(-1,parity),sqrt(sub(0.25,x))),0.5);
	return mul(sub(1,fi),sin(acos(fi)));
}
function deltoid(x,parity=1){
	let fi = add(-1,mul(pow(-1,parity),sqrt(sub(0.25,x))),0.5);
	return mul(sub(1,fi),sin(acos(fi)));
}
function astroid(x,parity=1){
	let fi = mul(cbrt(x),pow(-1,div(mul(2,parity),3)));
	return pow(sin(acos(fi)),3);
}
function generalizedcardioid(x,parity=1,limach=1,parity2=0){
	let fi = add(parity2,mul(pow(-1,parity),sqrt(sub(mul(limach,limach,0.25),x))),mul(limach,0.5));
	return mul(sub(limach,fi),sin(acos(fi)));
}
function generalizedcardioid(x,parity=1,parity2=0){
	let fi = add(parity2,mul(pow(-1,parity),sqrt(sub(mul(2,2,0.25),x))),mul(2,0.5));
	return mul(sub(2,fi),sin(acos(fi)));
}
function nephroid(x,parity=2){ 
    let fii = mul(cbrt(sub(sqrt(sub(mul(x,x),8)),x)),-1,pow(-1,div(add(parity,parity),3)));
	let fi = mul(-0.5,add(fii,div(2,fii)));
return mul(4,pow(sin(acos(fi)),3));
}
function nephroidy(x,parity=2){ 
    let fii = mul(cbrt(div(x,4)),pow(-1,parity));
	let fi = mul(-0.5,add(fii,div(2,fii)));
	let fiii = asin(fi);
return sub(mul(6,cos(fii)),mul(4,pow(cos(fii),3)));
}




function conchoidsluze(x,a=1,parity=0){ 
    let fi = mul(acos(sqrt(div(sub(x,1),a))),pow(-1,parity))
return add(tan(fi),mul(a,0.5,sin(mul(2,x))))
}
function conchoiddurery(x,a=3,b=1,parity=0){ 
    let fi = asin(div(x,a))
return add(div(mul(b,cos(fi)),sub(cos(fi),sin(fi))),mul(a,cos(fi)))
}
function conchoiddurer(x,a=3,b=1,parity=0){ 
	let fi=sub(arcdtanpi4pcos(div(x,a),div(b,a,2)),div(b,a,2));
return mul(a,sin(fi));
}
function strophoid(x,a=1,parity=0){ 
	return mul(sqrt(mul(x,x,div(sub(a,x),add(a,x)))),pow(-1,parity))
}
function lemniscatebernouilli(x,a=1,parity=0,parity2=0){
	return mul(sqrt(sub(mul(sub(mul(sqrt(add(mul(8,x,x),mul(a,a))),pow(-1,parity2)),a),a,0.5),mul(x,x))),pow(-1,parity))
}
function cissoiddiocles(x,a=1,parity=0){
	let fi=asin(mul(pow(-1,parity),sqrt(div(x,2,a))));
	return div(mul(2,a,pow(fi,3)),cos(fi))
};
function cissoiddioclesy(x,a=1,parity=0){
  let fi=arcsin2tan(div(x,2,a));
  return mul(2,a,sin(fi),sin(fi));
}

function devilscurve(x,a=1,b=1,parity=0,parity2=0){
	let fi= mul(pow(-1,parity2),sqrt(add(mul(pow(-1,parity),add(x,mul(0.25,a,a,a,a))),div(mul(a,a),2))))
	return mul(fi,fi,sub(mul(fi,fi),mul(b,b)));
}
function devilscurvey(x,a=1,b=1,parity=0,parity2=0){
	let fi= mul(pow(-1,parity2),sqrt(add(mul(pow(-1,parity),add(x,mul(0.25,a,a,a,a))),div(mul(b,b),2))))
	return mul(fi,fi,sub(mul(fi,fi),mul(a,a)));
}

function electricmotor(x,parity=0,parity2=0){
	let fi= mul(pow(-1,parity2),sqrt(add(mul(pow(-1,parity),add(x,mul(0.25,a,a,a,a))),div(100,2))))
	return mul(fi,fi,sub(mul(fi,fi),96));
}
function electricmotory(x,a=1,b=1,parity=0,parity2=0){
	let fi= mul(pow(-1,parity2),sqrt(add(mul(pow(-1,parity),add(x,mul(0.25,a,a,a,a))),div(96,2))))
	return mul(fi,fi,sub(mul(fi,fi),100));
}

function lemnicategerono(x,parity=0,parity2=0){
	return mul(pow(-1,parity2),add(mul(pow(-1,parity),sqrt(sub(0.25,mul(x,x)))),0.5))
}
function lemnicategeronoy(x,parity=0){
	return mul(pow(-1,parity),sqrt(sub(mul(x,x),mul(x,x,x,x))))
}





function cislimacon(x,b=2,a=1){
	return add(mul(b,exp(mul(I,x))),mul(a,0.5,exp(mul(2,I,x))))
}
function ciscardioid(x,b=2,a=1){
	return mul(a,sub(mul(2,exp(mul(I,x))),1,exp(mul(2,x,I))))
}
function cisnephroid(x,a=1,n=3){
	 return mul(a,sub(mul(3,exp(mul(I,x))),exp(mul(n,I,x))))
}
function cisdeltoid(x,a=1){
	 return add(mul(2,exp(mul(I,x))),exp(mul(-2,I,x)))
}




function  conchoidsluzecurvature(x,a=1){return div(mul(2,a,sub(a,-4,mul(3,sec(x),sec(x)))),pow(sub(pow(sec(x),4),mul(2,a,sec(x),sec(x)),mul(-1,a,add(a,4))),div(3,2)))}
function  conchoidsluzetangentialangle(x,a=1){return sub(mul(2,x),atan(div(mul(2,sin(mul(2,x))),add(2,mul(add(2,a),cos(mul(2,x)))))))}
function  conchoidsluzeloopsarea(x,a=1){return mul(0.5,add(mul(sub(2,a),sqrt(sub(-1,a))),mul(a,add(4,a),asec(sqrt(sub(0,a))))))}
function  conchoidnicomedescurvature(x,a=1,b=3){return div(mul(b,sub(b,mul(-1,a,sec(x),mul(2,a,pow(sec(x),3))))),pow(add(mul(b,b),mul(2,a,b,sec(x)),mul(a,a,pow(sec(x),4))),div(3,2)))}
function  conchoidnicomedestangentialangle(x,a=1,b=3){return add(mul(-0.5,pi()),x,atan(div(mul(add(a,mul(b,cos(x))),cot(x)),a)))}
function  cissoiddioclesarc(x,a=1){return mul(2,a,sub(sqrt(add(mul(x,x),4)),2,mul(-1,sqrt(3),atan(div(2,sqrt(3)))),mul(sqrt(3),atan(sqrt(add(mul(x,x),4),3)))))}
function  cissoiddioclescurvature(x,a=1){return div(3,mul(a,abs(x),pow(add(mul(x,x),4),div(3,2))))}
function  cissoiddioclestangentialangle(x,a=1){return sub(mul(2,x),acot(mul(2,cot(x))))}
//function  ophiuridecurvature(x,a=1,b=1){return div(,pow(sub(mul(a,a),mul(3,b,b),mul(-1,b,b,sub(ü))),div(3,2)))}https://mathworld.wolfram.com/Ophiuride.html



function arctractrix(x,a=1){return sub(mul(a,acosh(div(1,div(x,a)))),sqrt(sub(mul(a,a),mul(x,x))));}

function tractrix(x,a=1){let x2=math.complex(mag(re(x)),math.mod(im(x)+3.1415926535,2*3.1415926535)-3.1415926535);return newtoninv("arctractrix(x)",x2,div(0.5,cosh(div(x2,a))))}
function negtractrix(x,a=1){let x2=math.complex(mag(re(x)),math.mod(im(x)+3.1415926535,2*3.1415926535)-3.1415926535);return newtoninv("arctractrix(x)",x2,div(0.5,cosh(div(x2,a))))}






// Function for 'squarewave'
function squarewave(b,a=1) {
//	let fi=0;
//	for(let k=1;k<bign;k++)
//	fi=add(fi,div(sin(mul(a,add(k,k,-1))),add(k,k,-1)))
//	return div(fi,0.25,pi())
    return mul(a, lessthan(modc(b, 2 * math.pi), math.pi) ? 1.0 : -1.0);
}
function squarefourier(a,m=bign,n=1) {
	let fi=0;
	for(let k=n;k<m;k++)
	fi=add(fi,div(sin(mul(a,add(k,k,-1))),add(k,k,-1)))
	return div(fi,0.25,pi())
    return mul(a, lessthan(modc(b, 2 * math.pi), math.pi) ? 1.0 : -1.0);
}

function lessthan(b,a=1){
	if (math.complex(a).re < math.complex(b).re)
		return 1;return 0;
}
// Function for 'trianglewave'
function trianglewave(b,a=1) {
    return mul(a, mul(2.0 / math.pi, math.asin(math.sin(b))));
}

// Function for 'sawtoothwave'
function sawtoothwave(b,a=1) {
    return mul(a, mul(2.0 / math.pi, sub(math.pi, modc(b, 2 * math.pi))));
}
function sawtooth(x){return sub(x,floor(x),0.5)}
function polydedekindsumd(A,c){
let fi=math.complex(0,0);
for(let n=1;n<=sub(c,1);n++){
	let nom=math.complex(1,0);
for(let k=0;k<leng(A);k++){
	nom=mul(nom,sawtooth(div(mul(g(A,k),n),c)))
}
fi=add(fi,nom);	
}
return fi;
}	
function dedekindsumd(a,b,c){
let fi=math.complex(0,0);
for(let n=1;n<=sub(todoub(c),1);n++)
fi=add(fi,mul(sawtooth(div(mul(a,n),c)),sawtooth(div(mul(b,n),c))));
return fi;
}	
function dedekindsum(b,c){
	return dedekindsumd(1,b,c);
}
function dedekindsuma(k,n){
let fi=math.complex(0,0);
for(let m=0;m<k;m++)
if(gcd(m,k)==1)	
fi=add(fi,exp(mul(pi(),math.complex(0,1),sub(dedekindsum(m,k),div(mul(2,n,m),k)))));
return fi;
}



function partition(n){
	if(Number.isInteger(n)){
	let fi=math.complex(0,0);
for(let k=0;k<=n;k++)
fi=add(fi,partitiontriangle(k,n))
return fi;
	}
	let h=1e-7;
	let fi=math.complex(0,0);
for(let k=1;k<bign;k++)
fi=add(fi,mul(dedekindsuma(k,n),pow(k,0.5), div(sub(  div(sinh(div(mul(pi(),sqrt(mul(2,div(1,3),sub(add(n,h),div(1,24))))),k)),sqrt(sub(add(n,h),div(1,24))))  ,  div(sinh(div(mul(pi(),sqrt(mul(2,div(1,3),sub(n,div(1,24))))),k)),sqrt(sub(n,div(1,24))))  ),h) ));
	return div(fi,pi(),sqrt(2.0));
}
function partitiontriangle(k,n){
		if(Number.isInteger(n) && Number.isInteger(k)){
	if(n==0 && k==0 )return 1;
	if(n<=0 || k<=0 )return 0;
	return add(partitiontriangle(k,sub(n,k)),partitiontriangle(sub(k,1),sub(n,1)))
	}
	//too lazy zz
	if(n==0 && k==0 )return 1;
	if(n<=0 || k<=0 )return 0;
	return add(partitiontriangle(k,sub(n,k)),partitiontriangle(sub(k,1),sub(n,1)))
//	return sub(partition(n),partition(sub(n)))
}
function generalpartition(d,x){
let fi=math.complex(1,0);
for(let i=1;i<bign;i++)
fi=mul(fi,div(sub(1,pow(x,mul(add(d,1),i))),sub(1,pow(x,i))));
return fi;
}
function generalpolypartition(D,x){
let fi=math.complex(1,0);
for(let i=1;i<bign;i++){
	let nom=math.complex(1,0);
for(let j=1;j<leng(D);j++)
	nom = add(nom,pow(x,mul(g(D,j),i)));
fi=mul(fi,nom);}
return fi;
}	
function fo(d,x){//generating functiın of pO/pD fO=fD
let fi=math.complex(1,0);
for(let i=1;i<bign;i++)
fi=mul(fi,add(1,pow(x,i)));
return fi;
}
function fdo(x)//fDO
{return qpoch(mul(-1,x),mul(x,x),bign);}
function modularpartitionf(z)//https://mathworld.wolfram.com/PartitionFunctionP.html
{return div(sub(einsteinseries(2,z),mul(-6,einsteinseries(2,mul(6,z))),mul(2,einsteinseries(2,mul(z,2))),mul(3,einsteinseries(2,mul(3,z)))),2,sqr(dedekindeta(z)),sqr(dedekindeta(mul(z,2))),sqr(dedekindeta(mul(z,3))),cum(dedekindeta(mul(z,6))))}
function modularpartitionr(z)//https://mathworld.wolfram.com/PartitionFunctionP.html
{return add(div(derv(modularpartitionf,z),-2,pi(),math.complex(0,-1)),div(modularpartitionf(z),-2,pi(),im(z)))}
// Function for 'pulse'

function genplanepartition(x){
	let fi=math.complex(1,0);
for(let i=1;i<bign;i++)
fi=mul(fi,div(1,pow(sub(1,pow(x,i)),i)));
return fi;
}
function planepartition(n){
	return gettaylor("genplanepartition(x)",n,0);
}
function delannoy(m,n){
let fi=math.complex(0,0);
for(let i=0;i<bign;i++)
fi=add(fi,mul(div(1,pow(2,add(i,1))),ncr(i,n),ncr(i,m)));
return fi;
}

function motzkind(x,n){return mul(sin(x),sin(x),pow(add(mul(2,cos(x)),1),n))}
function motzkin(x){return div(integral(motzkind,0,pi(),x),0.5,pi());}


function euleriannum(n,k){
	if(n==0)return ncr(1e-12,k);
if(n==round(math.complex(n).re))return add(mul(sub(n,k),euleriannum(sub(n,1),sub(k,1))),mul(add(k,1),euleriannum(sub(n,1),sub(k,1))));	
let fi=math.complex(0,0);
for(let i=0;i<=todoub(k);i++)
fi=add(fi,mul(pow(-1,i),ncr(add(n,1),i),pow(sub(k,i,-1),n)));
return fi;
}
function eulerianpoly(n,t){let fi=math.complex(0,0);for(let i=0;i<bign;i++)
fi=add(fi,mul(euleriannum(n,i),pow(t,i)));return fi;}

function alternatingpermutation(n){//A001250
	return mul(2,pow(sub(I,1),sub(1,n)),exp(mul(I,sub(n,1),pi(),0.5)),eulerianpoly(n,I))}
function updownnumbers(x){return div(alternatingpermutation(x),2)};//A000111
function altalternatingpermutation(n){//A001250
let x=div(add(1,n),2);	return mul(bernoulli(mul(2,x)),pow(-1,sub(x,1)),div(sub(pow(4,mul(2,x)),pow(2,mul(2,x))),mul(2,x)))}

function necklace(k,n){
	let fi=math.complex(0,0);
for(let i=1;i<=todoub(n);i++)
fi=add(fi,pow(k,gcd(i,n)));
return div(fi,n);
}
function necklacel(k,n){//A087854
let fi=math.complex(0,0);
for(let d=0;d<=todoub(n);d++)
if(gcd(d,k)==1)	
fi=add(fi,mul(totient(d),stirling2(div(n,d),k)));
return mul(fi,div(factorial(k),n));
}

function necklacelb(k,n){//A087854
let fi=math.complex(0,0);
for(let d=0;d<=todoub(n);d++)
if(gcd(d,k)==1)	
fi=add(fi,mul(mobius(d),pow(k,div(n,d))));
return div(fi,n);
}
function necklaceb(k,n){
return add(mul(0.5,necklace(k,n)),add(mul(pow(sin(mul(n,pi(),0.5)),2),div(pow(k,div(add(n,1),2)),2)),mul(pow(cos(mul(n,pi(),0.5)),2),div(mul(add(k,1),pow(k,div(n,2))),4))))
}
function euleriannum2(n,k){
if(n==0)return ncr(1e-12,k);
return add(mul(sub(add(n,n),k,1),euleriannum2(sub(n,1),sub(k,1))),mul(add(k,1),euleriannum2(sub(n,1),k)));
}
function schroderhipparchus(x){return hypg21(sub(1,x),sub(0,x),2,2);}
function generalizedschroderhipparchus(k,x){return hypg21(sub(1,x),sub(0,x),2,k);}
function iversonbracketeq0(t){
	if(t==0)return 1;return 0;
}
function diagentringernum(x){
	return add(mul(pow(mul(sin(mul(x,pi(),0.5))),2),div(mul(pow(mul(2,I),add(x,1)),sub(pow(2,add(x,1)),1),bernoulli(add(x,1))),sub(-1,x))),mul(pow(mul(cos(mul(x,pi(),0.5))),2),pow(I,x),eulernum(x)));
}
function numberofdebrujin(k,n){
	return div(pow(factorial(k),pow(k,sub(n,1))),pow(k,n))
}
function stirling2(a,b){
let c=a;
if(math.complex(c).im<0)a=conj(a);
let fi=math.complex(0,0);
for(let i=0;i<=todoub(b);i++)
fi=add(fi,mul(pow(-1,sub(b,1)),ncr(b,i),pow(i,a)));
if(math.complex(c).im<0)
return conj(div(fi,gamma(add(b,1))));
return div(fi,gamma(add(b,1)));
}
function stirling(x,y){
	let n = sub(x-y);
let fi=math.complex(0,0);
for(let i=0;i<=todoub(n);i++)
fi=add(fi,mul(euleriannum2(n,k),ncr(add(x,i),add(n,n))));
return div(fi,gamma(add(b,1)));
}
function unsignedstirling(x,y){
return mul(stirling(x,y),pow(-1,sub(x,y)));
}

function gregorycoefd(t,n){
return div(1,pow(add(1,t),n),add(sqr(log(t)),mul(pi(),pi())))	
}
function gregorycoef(n){
return mul(pow(-1,sub(n,1)),integral(gregorycoefd,0,bign,n));	
}
function nielsenramanujand(b,a){
return div(pow(log(b),a),sub(b,1))	
}
function nielsenramanujan(n){
return integral(nielsenramanujand,1,2,n);	
}
function stieltjes(b){
let fi=math.complex(0,0);
for(let i=1;i<=bign;i++)
fi=add(fi,sub(div(pow(log(bign),b),i),div(pow(log(bign),add(b,1)),add(b,1))));
return fi;
}
function worpitzkynum(a,b){
let fi=math.complex(0,0);
for(let i=0;i<=todoub(b);i++)
fi=add(fi,div(mul(pow(-1,add(b,i)),pow(add(i,1),a),factorial(b)),factorial(i),factorial(sub(b,i))));
return fi;
}
function lah(a,b){
	return div(mul(pow(-1,a),ncr(sub(a,1),sub(b,1)),factorial(a)),factorial(b));
}
function unsignedlah(a,b){
	return div(mul(ncr(sub(a,1),sub(b,1)),factorial(a)),factorial(b));
}

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
function sinh(b) {
    return math.sinh(b);
}
function tanh(b) {
    return math.tanh(b);
}
function cosh(b) {
    return math.cosh(b);
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

// Function for 'excsc'
function excsc(b) {
    return sub(math.csc(b), math.complex(1));
}
function exsecc(b) {
    return div(exsec(b),b);
}
function excscc(b) {
    return div(excsc(b),b);
}
function arcexsec(b) {
    return asec(add(1,b));
}

// Function for 'excsc'
function arcexcsc(b) {
     return acsc(add(1,b));
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

// Function for 'hacoverco'
function hacovercos(b) {
    return mul(add(math.complex(1), math.sin(b)), math.complex(0.5));
}
function versinc(b) {
    return div(versin(b),b);
}

// Function for 'vercosin'
function vercosinc(b) {
    return div(vercosin(b),b);
}

// Function for 'coversin'
function coversinc(b) {
    return div(coversin(b),b);
}

// Function for 'covercosine'
function covercosc(b) {
    return div(covercosine(b),b);
}

// Function for 'haversin'
function haversinc(b) {
    return div(haversin(b),b);
}

// Function for 'hacoverco'
function hacovercosc(b) {
    return div(hacoverco(b),b);
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
function tanp(b) {//tanp(x)=sinp(x)/cosp(x)/2 idk
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
	return div(1,tanp(b));
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

function atanp(x){if(math.complex(x).re<0)return newtoninv("tanp(x)",x,div(-.1,x));return sub(0,newtoninv("tanp(x)",sub(0.5,x),div(.05,add(x,0))));return newtoninv("tanp(x)",x,div(-1,-150));}
function acotp(x){return atanp(div(1,x));}


function sinph(x){return mul(-2,cosh(div(acosh(mul(3,0.5,x)),3)));}
function cosph(x){return add(3,mul(2,cosh(div(acosh(mul(3,0.5,x)),3,0.5))));}
function asinph(x){return div(cosh(mul(acosh(div(x,-2)),3)),3,0.5)};
function acosph(x){return div(cosh(mul(acosh(div(sub(x,3),2)),3,0.5)),3,0.5)}

function tanph(x){return div(sinph(x),cosph(x));}
function cotph(x){return div(cosph(x),sinph(x));}
function secph(x){return div(1,cosph(x));}
function cscph(x){return div(1,sinph(x));}

function asecph(x){return acosph(div(1,x));}
function acscph(x){return asinph(div(1,x));}

function atanph(x,parity=0,parity3=0,parity2=0){return div(cosh(mul(pow(-1,parity3),add(acosh(div(add(1,mul(pow(-1,parity),sqrt(sub(1,mul(4,x,x))))),-4,x)),mul(2,pi(),I,parity2)),3)),3,0.5);}
function acotph(x,parity=0,parity3=0,parity2=0){return atanph(div(1,x),parity,parity3,parity2);}

function parabolicip(x){return sqrt(add(pow(sinp(x),2),pow(cosp(x),2)))}
function parabolicep(x){return add(cosp(div(x,I)),mul(I,sqrt(sinp(div(x,I)))))}
function sqrparabolicip(x){return sqr(parabolicip(x));}
function parabolicgudermann(x){return add(1.129593349,integral(sqrparabolicip,sqrt(2),x));}//return integral(sqrparabolicip,0,x)}
function parabolictgp(x){return tan(parabolicgudermann(x));}

function paraboliccapdhat(x){return div(sub(pow(parabolicip(add(x,1e-5)),2),pow(parabolicip(add(x,-1e-5)),2)),2,1e-5);}
function paraboliccapc(b,a=1) {
    return div(mul(sec(b), mul(a, sub(3.0, mul(2.0, cosh(div(mul(2.0, asinh(div(sub(mul(3.0, b), 4.0), 2.0))), 3.0)))))),
               sqrt(add(pow(mul(a, sub(3.0, mul(2.0, cosh(div(mul(2.0, asinh(div(sub(mul(3.0, b), 4.0), 2.0))), 3.0))))), 2),
                         pow(mul(a, mul(2.0, sinh(div(asinh(div(sub(mul(3.0, b), 4.0), 2.0)), 3.0)))), 2))));
}

function parabolicc(b,a=1) {
    return div(mul(sec(b), mul(a, mul(2.0, sinh(div(asinh(div(sub(mul(3.0, b), 4.0), 2.0)), 3.0))))),
               sqrt(add(pow(mul(a, sub(3.0, mul(2.0, cosh(div(mul(2.0, asinh(div(sub(mul(3.0, b), 4.0), 2.0))), 3.0))))), 2),
                         pow(mul(a, mul(2.0, sinh(div(asinh(div(sub(mul(3.0, b), 4.0), 2.0)), 3.0)))), 2))));
}

function parabolicsp(b,a=1) {//cscp
    return div(mul(a, mul(2.0, sinh(div(asinh(div(sub(mul(3.0, b), 4.0), 2.0)), 3.0)))),
               sqrt(add(pow(mul(a, sub(3.0, mul(2.0, cosh(div(mul(2.0, asinh(div(sub(mul(3.0, b), 4.0), 2.0))), 3.0))))), 2),
                         pow(mul(a, mul(2.0, sinh(div(asinh(div(sub(mul(3.0, b), 4.0), 2.0)), 3.0)))), 2))));
}

function paraboliccp(b,a=1) {
    return div(mul(a, sub(3.0, mul(2.0, cosh(div(mul(2.0, asinh(div(sub(mul(3.0, b), 4.0), 2.0))), 3.0))))),
               sqrt(add(pow(mul(a, sub(3.0, mul(2.0, cosh(div(mul(2.0, asinh(div(sub(mul(3.0, b), 4.0), 2.0))), 3.0))))), 2),
                         pow(mul(a, mul(2.0, sinh(div(asinh(div(sub(mul(3.0, b), 4.0), 2.0)), 3.0)))), 2))));
}

function parabolicyp(b) {//sinp
    return sub(div(pow(sub(sqrt(sub(mul(9.0, pow(b, 2)), add(mul(24.0, b), -20.0))), add(mul(-3.0, b), 4.0)), div(1.0, 3.0)), pow(2.0, div(1.0, 3.0))),
               div(pow(2.0, div(1.0, 3.0)), pow(sub(sqrt(sub(mul(9.0, pow(b, 2)), add(mul(24.0, b), -20.0))), add(mul(-3.0, b), 4.0)), div(1.0, 3.0))));
}





function generalizedpid(b,a,c){return div(1,pow(sub(1,pow(b,c)),div(1,a)))}
function generalizedpida(b,A){return generalizedpid(b,g(A,0),g(A,1))}//aux
function generalizedpi(p,q){return div(beta(div(1,div(p,sub(p,1))),div(1,q)),0.5,q)}//return integral(generalizedpida,0,0.99999,[a,b])}
function generalizedasin(b,p=2,q=p){return mul(b,hypg21(div(1,p),div(1,q),add(1,div(1,q)),pow(b,q)))}//return integral(generalizedpida,0,b,[a,c])}
function generalizedsin(b,p=2,q=p){return math.evaluate("newtoninv('generalizedasin(x,"+p+","+q+")',x,x)",{x:b});}





    function isprime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }
function nthprime(x) {
 
    let n = parseInt(math.complex(x).re);

    if (isNaN(n) || n < 1) {
        throw new Error("Input must be a positive integer.");
    }

    let count = 0;
    let candidate = 1;

    while (count < n) {
        candidate++;
        if (isprime(candidate)) {
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
	if(absValue==0)return 0;
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

function rconj(x){
return math.complex(-re(x),im(x));
}

function repeat(func,x,n){
	let fi=x;
	for(let i=0;i<n;i++)fi=func(fi);
	return fi;
}
function repeate(func,x,n){
	let fi=x;
	for(let i=0;i<n;i++)fi=math.evaluate(func,{x:fi,c:x,n:n,i:i});
	return fi;
}

function mandelbrot(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(mul(z, z), c);}
	return z;
}
function multibrot(a, b=a,m=2,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(pow(z,m), c);}
	return z;
}
function perpendicularmandelbrot(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(pow(conj(rabs(z)),2), c);}
	return z;
}
function alphamandel(a, b=a,n=1) {/////////////
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(pow(add(pow(z,2), c),2), c);}
	return z;
}
function tricorn(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(rconj(mul(z, z)), c);}
	return z;
}
function celtic(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(rabs(mul(z, z)), c);}
	return z;
}
function perpendicularceltic(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(conj(rabs(mul(z, z))), c);}
	return z;
}
function burningship(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(iabs(mul(z, z)), c);}
	return z;
}
function perpendicularburningship(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(sqr(iabs(z)), c);}
	return z;
}
function buffalo(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(cabs(mul(z, z)), c);}
	return z;
}
function perpendicularbuffalo(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(rabs(sqr(iabs(z))), c);}
	return z;
}
function simonbrot(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(sqr(mul(z,mag(z))),c);}
	return z;
}
function perpendicularsimonbrot(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=add(mul(sqr(z),mag(sqr(z))),c);}
	return z;
}
function duckfractal(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=log(add(iabs(z),c));}
	return z;
}
function lambdafractal(a, b=a,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=mul(c,z,sub(1,z));}
	return z;
}
function multilambdafractal(a, b=a,m=2,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=mul(c,z,sub(1,pow(z,m)));}
	return z;
}

function cczcpaczcp(a, b=a,al=1,be=2,g=1,d=-2,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=mul(c,add(mul(al,pow(z,be)),mul(g,pow(z,d))));}
	return z;
}

function zliteral(a, b=a , as=1,n=1) {
    let c = math.complex(b);
    let z = math.complex(a);
    for(let i=0;i<=n;i++){ z=sub(c,sqr(sub(rabs(add(z,as)),as)));}
	return z;
}

function escapetime(func,z,p=z,limit=10,itlim=5){
	let x=z;
	for(let i=0;i<itlim;i++)
		{
			 x = func(x,p);
			 if(mag(x)>limit)
			return sub(mul(i,2),1,div(log(log(mag(x))),log(2)))
		}
		return sub(itlim,-1,div(log(log(mag(x))),log(2)))
		return 0;
}
function escapetimee(func,z,p=z,limit=10,itlim=5){
	let x=z;
	for(let i=0;i<itlim;i++)
		{
			 x = math.evaluate(func,{z:x,c:p,x:x,p:p,n:i});
			 if(mag(x)>limit)
			return sub(mul(i,1),1,div(log(log(mag(x))),log(2)))
		}
		return sub(itlim,-1,div(log(log(mag(x))),log(2)))
		return 0;
}

function im(b) {
    return math.complex(b).im;
}

function re(b) {
    return math.complex(b).re;
}
function IM(b) {
    return math.complex(b).im;
}

function RE(b) {
    return math.complex(math.complex(b).re);
}
function purere(b,t=1e-5) {
	if(mag(math.complex(b).im)<t)
    return math.complex(math.complex(b).re);
return 0;}

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

function bringquintic(x,a){return add(pow(x,5),x,a)}
function br(x)				{
	if(math.complex(x).re<0)
	return mul(-1,newtonzero("x^5+x+"+x,pow(pow(add(mul(-3,rabs(x)),1),5),div(1,25))))
	return sub(0,br(sub(0,x)));
}

function brhypgeo(x){
	return mul(hypergeometric([div(1,5),div(2,5),div(3,5),div(4,5)],[div(1,2),div(3,4),div(5,4)],mul(-5,pow(div(mul(5,x),4),4))),-1,x)
}

function bringjerrad1(x){return mul(hypergeometric([div(-1,20),div(3,20),div(7,20),div(11,20)],[div(1,4),div(1,2),div(3,4)],div(mul(3125,pow(x,4)),256)),-1,x)}
function bringjerrad2(x){return mul(hypergeometric([div(1,5),div(2,5),div(3,5),div(4,5)],[div(1,2),div(3,4),div(5,4)],div(mul(3125,pow(x,4)),256)),-1,x)}
function bringjerrad3(x){return mul(hypergeometric([div(9,20),div(13,20),div(17,20),div(21,20)],[div(3,4),div(5,4),div(3,2)],div(mul(3125,pow(x,4)),256)),-1,x)}
function bringjerrad4(x){return mul(hypergeometric([div(7,10),div(9,10),div(11,10),div(13,10)],[div(5,4),div(3,2),div(7,4)],div(mul(3125,pow(x,4)),256)),-1,x)}

function rootbringjerrad1(x){return mul(-1,x,bringjerrad2(x))}
function rootbringjerrad2(x){return add(mul(-1,bringjerrad1(x)),mul(div(1,4),x,bringjerrad2(x)),mul(div(5,32),pow(x,2),bringjerrad3(x)),mul(div(5,32),pow(x,3),bringjerrad4(x)))}
function rootbringjerrad3(x){return add(mul(1,bringjerrad1(x)),mul(div(1,4),x,bringjerrad2(x)),mul(div(-5,32),pow(x,2),bringjerrad3(x)),mul(div(5,32),pow(x,3),bringjerrad4(x)))}
function rootbringjerrad4(x){return add(mul(sub(0,I),bringjerrad1(x)),mul(div(1,4),x,bringjerrad2(x)),mul(I,div(-5,32),pow(x,2),bringjerrad3(x)),mul(div(-5,32),pow(x,3),bringjerrad4(x)))}
function rootbringjerrad5(x){return add(mul(I,bringjerrad1(x)),mul(div(1,4),x,bringjerrad2(x)),mul(I,div(5,32),pow(x,2),bringjerrad3(x)),mul(div(-5,32),pow(x,3),bringjerrad4(x)))}


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

function signumop(a, b) {
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
function todoub(value) {
    return math.complex(x).re;
}

function tocomplex(value) {
    return math.complex(value);
}

function rand() {
    return Math.random(); // Generates a random float between 0 and 1
}
function randcomp() {
    return math.complex(Math.random(),Math.random()) // Generates a random float between 0 and 1
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

function regularinteriorangle(b) {
    return mul(sub(b, 2.0), 180.0 / b);
}

function regularexteriorangle(b) {
    return 360.0 / b;
}

function regularapothem(a, b) {
    return div(a, mul(2.0, math.tan(math.pi / b)));
}

function regulararea(a, b) {
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

function sqrt( b) {
    return  math.sqrt(b);
}

function ceiling(b) {
    return math.ceil(b);
}
function ceil(b) {
    return math.ceil(b);
}
function round(b) {
    return math.round(b);
}

function absolute(b) {
    return math.abs(b);
}
function abs(b) {
    return math.abs(b);
}
function floor(b) {
    return math.floor(b);
}

function randominteger(a, b) {
    return math.round(add(math.mod(mul(rand(), math.round(b - a + 1)), math.round(b - a + 1)), math.round(a)));
}
function randombool() {
    return math.round(rand());
}
function randomsign() {
    return math.round(rand())*2-1;
}

function randomfloat(a, b) {
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
	function genocchi(x){return mul(2,sub(1,pow(2,x)),bernoulli(x));}
	function eulerzigzag(x){return mul(pow(-1,div(sub(x,1),2)),div(mul(pow(2,add(x,1)),sub(pow(2,add(x,1)),1),bernoulli(add(x,1))),add(x,1)))}
	function eulernum(x){return div(eulerzigzag(x),pow(-1,div(x,2)))}
	//eulernums are wrongly coded go fix 
	function bernoulliz(x){
		if(x==math.complex(1,0))return 0.5;
		return mul(-1,x,zeta(sub(1,x)));
	}
	function bernoulliz2(x){
		if(x==math.complex(1,0))return 0.5;
		return mul(2,pow(-1,add(div(x,2),1)),factorial(x),zeta(x),pow(add(pi(),pi()),sub(0,x)));
	}
	function bernoullitriangle(n,k){
		return div(mul(factorial(n),hypg21(1,sub(k,n,-1),add(k,2),-1)),gamma(add(k,2)),gamma(sub(n,k)));
	}
	function lazycaterer(n){return div(add(mul(n,n),n,2),2)}
	function cakenum(n){return add(ncr(n,3),ncr(n,2),ncr(n,1),ncr(n,0))}
	function divcircleintoareas(n){return add(ncr(n,3),ncr(n,2),ncr(n,1),ncr(n,0),ncr(n,4))}
	
	function riesz(x){
		let fi=math.complex(0,0);
		for(let k=0;k<bign;k++)
			fi=add(fi,div(mul(pow(-1,sub(k,1)),pow(x,k)),mul(factorial(sub(k,1)),zeta(mul(k,2)))));
		return fi;
	}
	function mriesz(x){//M(Riesz(z)) mellin translform
		return div(gamma(add(x,1)),zeta(mul(-2,x)))
	}
	
// Main operations
function cullen(b) {
    return add(mul(b, pow(math.complex(2.0), b)), math.complex(1.0));
}

function mersenne(b) {
    return sub(pow(math.complex(2.0), b), math.complex(1.0));
}

function doublemersenne(b) {
    return sub(pow(math.complex(2.0), sub(pow(math.complex(2.0), b), math.complex(1.0))), math.complex(1.0));
}

function doubleprimemersenne(b) {
    return sub(pow(math.complex(2.0), sub(pow(math.complex(2.0), nthprime(b)), math.complex(1.0)))), math.complex(1.0);
}

function fermat(b) {
    return add(pow(math.complex(2.0), pow(math.complex(2.0), b)), math.complex(1.0));
}

function fermatprime(b) {
    return fermatprimeList[Math.max(parseInt(toDouble(b)), 4)]; // Example, update with actual list
}

function proth(a, b) {
    return add(mul(a, pow(math.complex(2.0), b)), math.complex(1.0));
}

function isprothprime(a, b) {
    return isprime(add(mul(a, pow(math.complex(2.0), b)), math.complex(1.0)));
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

function genwoodall(a, b) {
    return sub(mul(b, pow(a, b)), math.complex(1.0));
}

function isgenwoodallprime(a, b) {
    return isprime(sub(mul(b, pow(a, b)), math.complex(1.0)));
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

function irregulartriangle(n,k){//A180184
return ncr(sub(n,k,k,k,1),sub(k-1));
}

function pell(b) {
    return div(sub(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), b), mul(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), sub(0,b)), math.cos(mul(math.pi, b)))), mul(math.sqrt(math.complex(2.0)), math.complex(2.0)));
}

function pelllucas(b) {
    return div(sub(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), b), mul(pow(add(math.complex(1.0), math.sqrt(math.complex(2.0))), sub(0,b)), math.cos(mul(math.pi, b)))), mul(math.sqrt(math.complex(2.0)), math.complex(2.0)));
}


function centralbinomial(x){return ncr(add(x,x),x);}

function fibonacci(b) {
    return div(sub(pow(math.complex(1.61803399), b), mul(pow(math.complex(1.61803399), sub(0,b)), math.cos(mul(math.pi, b)))), math.sqrt(math.complex(5.0)));
}
function fib(x){return fibonacci(x);}
function leonardo(b) {
    return  sub(mul(2,fib(add(1,b))),1);
}
function naryana(b) {
    return generalizedtribonacci(b,1,1,1,1,0,1);
}
function tribonacci(b) {
    return generalizedtribonacci(b,0,1,1,1,1,1);
}
function tetrabonacci(b) {
    return add(mul(-0.19291,pow(-0.7748,b)),mul(0.29381,pow(1.9276,b)),mul(math.complex(-0.05045,-0.16968),pow(math.complex(-0.07638,0.8147),b)),mul(math.complex(-0.05045,0.16968),pow(math.complex(-0.07638,-0.8147),b)));
}
function tribonaccialt(b) {
    return generalizedtribonacci(b,0,0,1,1,1,1);
}
function necklacecover3(b) {//A001609
    return add(naryana(b),mul(2,naryana(sub(b,3))));
}
function necklacecover4(b) {//A014097
    return add(pow(-0.81917,b),pow(1.3803,b),pow(math.complex(0.21945,0.91447),b),pow(math.complex(0.21945,-0.91447),b));
}
function necklacecover5(b) {//A058368
    return add(pow(1.3247,b),pow(math.complex(0.5,0.86603),b),pow(math.complex(-0.66236,0.56228),b),pow(math.complex(0.5,-0.86603),b),pow(math.complex(-0.66236,-0.56228),b));
}
function necklacecover6(b) {//A058367
    return add(pow(1.2852,b),pow(-0.881271,b),pow(math.complex(-0.37333,0.82964),b),pow(math.complex(0.67137,0.78485),b),pow(math.complex(-0.37333,0.82964),b),pow(math.complex(0.67137,0.78485),b));
}
function necklacecover7(b) {//A058366
    return add(pow(1.25542,b),pow(math.complex(-0.79855,0.42110),b),pow(math.complex(-0.10935,-0.93358),b),pow(math.complex(0.78019,0.70533),b),pow(math.complex(-0.79855,-0.42110),b),pow(math.complex(-0.10935,0.93358),b),pow(math.complex(0.78019,-0.70533),b));
}
function necklacecover8(b) {//A058365
    return add(pow(1.23205,b),pow(-0.911592,b),pow(math.complex(0.85224,0.95648),b),pow(math.complex(0.10331,0.95648),b),pow(math.complex(-0.61578,0.68720),b),pow(math.complex(0.85224,-0.95648),b),pow(math.complex(0.10331,-0.95648),b),pow(math.complex(-0.61578,-0.68720),b));
}
function necklacecover9(b) {//A058364
    return add(pow(1.21315,b),pow(math.complex(-0.86082,0.33435),b),pow(math.complex(-0.41683,0.84192),b),pow(math.complex(0.26935,0.94058),b),pow(math.complex(0.90173,0.57531),b),pow(math.complex(-0.86082,-0.33435),b),pow(math.complex(-0.41683,-0.84192),b),pow(math.complex(0.26935,-0.94058),b),pow(math.complex(0.90173,-0.57531),b));
}

function naryanatriangle(n,k) {
    return div(mul(ncr(n,k),ncr(n,sub(k,1))),n);
}
function padovan(b) {
    const r1=0.754877666246693;
	const r2=math.complex(-0.87744,0.74486);
	const r3=math.complex(-0.87744,-0.74486);
	return add( div(add(1,r1),pow(r1,add(b,2)),add(2,mul(3,r1))) ,  div(add(1,r2),pow(r2,add(b,2)),add(2,mul(3,r2))) ,  div(add(1,r3),pow(r3,add(b,2)),add(2,mul(3,r3))) )
}
function perrin(b) {
    return add(padovan(add(b,1)),padovan(sub(b,10)));
}

function generalizedtribonacci(x,a=1,b=0,c=1,r=1,s=1,t=1){
const w=exp(div(mul(I,2,pi()),3));
const det=add(div(mul(r,r,r,t),27),div(mul(r,r,s,s),-108),div(mul(r,s,t),6),div(mul(s,s,s),-27),div(mul(t,t),4));
const aa=pow(add(div(mul(r,r,r),27),div(mul(r,s),6),div(t,2),sqrt(det)),div(1,3))
const bb=pow(add(div(mul(r,r,r),27),div(mul(r,s),6),div(t,2),mul(sqrt(det),-1)),div(1,3))
const aaa=add(div(r,3),aa,bb);
const bbb=add(div(r,3),mul(w,aa),mul(w,w,bb));
const ccc=add(div(r,3),mul(w,w,aa),mul(w,bb));
const b1=add(c,mul(-1,add(bbb,ccc),b),mul(a,bbb,ccc));
const b2=add(c,mul(-1,add(aaa,ccc),b),mul(a,aaa,ccc));
const b3=add(c,mul(-1,add(bbb,aaa),b),mul(a,bbb,aaa));
return add(
div(mul(b1,pow(aaa,x)),sub(aaa,bbb),sub(aaa,ccc)),
div(mul(b2,pow(bbb,x)),sub(bbb,aaa),sub(bbb,ccc)),
div(mul(b3,pow(ccc,x)),sub(ccc,aaa),sub(ccc,bbb)));
}	


//function tribonacci(x){
//7/	let r1=0.33623;let r2=math.complex(-0.16811,0.19832);let r3=conj(r2);
//	let a=1.8393;let b=math.complex(-9.41964,-0.60629);let c=conj(b);
//	return add(div(pow(a,x)),sub(mul(a,4),mul(a,a),1),div(pow(b,x)),sub(mul(b,4),mul(b,b),1),div(pow(c,x)),sub(mul(c,4),mul(c,c),1))
//	return add(mul(r1,pow(a,x)),mul(r2,pow(b,x)),mul(r3,pow(c,x)))
//}

function lucas(b) {
    return sub(pow(math.complex(1.61803399), b), mul(pow(math.complex(1.61803399), sub(0,b)), math.cos(mul(math.pi, b))));
}


function orientedTree(b) {
    return math.round(mul(math.complex(0.22571615379282714232305), div(pow(math.complex(5.64654261623294971289271351621), b), pow(b, div(math.complex(5.0), math.complex(2.0))))));
}

function magic(b) {
    return mul(math.complex(2.0), add(ncr(b, math.complex(1.0)), add(ncr(b, math.complex(2.0)), ncr(b, math.complex(3.0)))));
}

function magicconst(b) {
    return div(mul(b, add(pow(b, math.complex(2.0)), math.complex(1.0))), math.complex(2.0));
}

function alucin(b) {
    return div(div(pow(b, math.complex(3.0))), mul(sub(math.complex(1.0), pow(b, math.complex(2.0))), mul(sub(math.complex(1.0), pow(b, math.complex(3.0))), sub(math.complex(1.0), pow(b, math.complex(4.0))))));
}

function metallicratio(b) {
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

function symmetricaljoukowsky(b, a) {
    return mul(math.exp(mul(math.complex(0,1), globalc)), add(sub(b, a), add(div(math.complex(1.0), sub(b, a)), div(mul(math.complex(2.0), pow(a, math.complex(2.0))), add(a, globalc)))));
}

function cayley(b) {
    return div(sub(b, math.complex(0.0, 1.0)), add(b, math.complex(1.0, 0.0)));
}

function bilinear(b) {
    return div(sub(b, math.complex(1.0)), add(b, math.complex(1.0)));
}

function poincarediscmetric(a, b) {
    return mul(math.complex(2.0), math.atanh(div(sub(a, b), sub(math.complex(1.0), mul(a, math.conj(b))))));
}

function poincaremetric(a, b) {
    return mul(math.complex(2.0), math.atanh(div(sub(a, b), sub(a, math.conj(b)))));
}



function pow(base, exponent) {
    return math.pow(base, exponent);
}

function sigm(x) {
    return div(1.0, add(1.0, math.exp(mul(-1.0, x))));
}

// Main operations
function evenodd(a,b,x){return add(mul(a,pow(sin(mul(0.5,pi,x)),2)),mul(b,pow(cos(mul(0.5,pi,x)),2)))}

function collatz(b) {
    return add(
        mul(div(b, math.complex(2.0)), pow(math.cos(mul(math.pi, div(b, math.complex(2.0)))), math.complex(2.0))),
        mul(
            add(mul(math.complex(3.0), b), math.complex(1.0)),
            pow(math.sin(mul(math.pi, div(b, math.complex(2.0)))), math.complex(2.0))
        )
    );
}
/*
function zeromosaic(b, a) {
    const quotient = math.round(div(b, a));
    return mul(
        pow(sub(b, mul(a, quotient)), a),
        pow(div(a, math.complex(2.0)), mul(sub(0,a), quotient))
    );
}*/
function zeromosaic(z,w=1) {
	const wr = mul(w,round(div(z,w)));
    return mul(pow(sub(z,wr),wr),pow(div(w,2),sub(0,wr)));
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

function logisticregression(b,m,s) {
    return div(math.complex(1.0), add(math.complex(1.0), math.exp(div(sub(b,m),s,-1))));
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

function loglogistic(a, b) {
    return div(math.complex(1.0), add(math.complex(1.0), pow(div(b, a), math.complex(-1.0))));
}

function logisticexponential(a, b) {
    return div(mul(a, math.exp(b)), add(math.complex(1.0), math.exp(b)));
}

function logodds(b) {
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
            mul(add(b, fortySeven), math.sin(math.sqrt(math.abs(add(b,div(a, math.complex(2.0)), fortySeven))))),
            mul(a,math.sin(math.sqrt(math.abs(sub(a, add(b, fortySeven))))))
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

function shekel(X,C,A){
	let fi=math.complex(0,0);
	for(let i=0;i<leng(C);i++){
		let fid=math.complex(0,0);
		for(let j=0;j<leng(X);j++)
			fid=add(fid,sqr(sub(g(X,j),g(A,add(mul(i,leng(X)),j)))))
		fi=add(fi,g(C,i));
	}
return div(1,fi);
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
    


    for (let id = 1; id < bign; id++) {
        const qi = pow(q, math.complex(id));
        p = mul(p, sub(math.complex(1.0), qi));
    }

    return p;
}
function dedekindetadisc(z) {
 
    const q = z;
    let p = pow(q, div(math.complex(1.0), math.complex(24.0)));
    


    for (let id = 1; id < bign; id++) {
        const qi = pow(q, math.complex(id));
        p = mul(p, sub(math.complex(1.0), qi));
    }

    return p;
}
function eulerfunc(x){
	let fi=math.complex(1,0);
	for(let n=1;n<bign;n++)
	fi=mul(fi,sub(1,pow(x,n)));
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
    return mul(einsteinseries(a, b), math.complex(2.0), zeta(a));
}


function casin(x){return div(asin(x),x);}
function cacos(x){return div(acos(x),x);}
function catan(x){return div(atan(x),x);}
function casec(x){return div(asec(x),x);}
function cacsc(x){return div(acsc(x),x);}
function cacot(x){return div(acot(x),x);}


// Define zeta function based on your actual implementation
function zeta(x) {
        return mul(div(math.complex(1.0), sub(math.complex(1.0), pow(math.complex(2.0), sub(math.complex(1.0), x)))),dirichleteta(x));
}
function completezeta(x){return mul(gammar(x),zeta(x))}
function fastzeta(x,jj=bign){
	    let fi = math.complex(0);
    for (let i = 1; i < jj; i++) {
        fi = add(fi,div(1,pow(i,x)));
    }
return fi;

}

function debruijnnewmand(u,LZ){
	const l=g(LZ,0);const z=g(LZ,1);
	return mul(exp(mul(l,u,u)),debruijnnewmanphi(u),cos(mul(z,u)));
}
function debruijnnewman(l,z){
	return integral(debruijnnewmand,0,sqrt(bign),[l,z],bign*bign/2);
}
function debruijnnewmanphi(u){
	   let fi = math.complex(0);
    for (let i = 1; i < sqrt(bign); i++) {
        fi = add(fi,mul(sub(mul(2,pi(),pi(),i,i,i,i,exp(mul(9,u))),mul(3,pi(),i,i,exp(mul(5,u)))),exp(mul(-1,pi(),i,i,exp(mul(4,u))))));
    }
	return fi;
}

function lerchtranscendentd(t,A){
	let z=g(A,0);let s=g(A,1);let a=g(A,2);
	if(math.complex(z).re<0)
	return div(sub(mul(cos(t,log(sub(0,z))),sin(mul(s,atan(div(t,a))))),mul(sin(mul(t,log(sub(0,z)))),cos(mul(s,atan(div(t,a)))))),pow(add(mul(a,a),mul(t,t)),div(s,2)),sinh(mul(pi(),t)));
	return div(sub(mul(cos(t,log(z)),sin(mul(s,atan(div(t,a))))),mul(sin(mul(t,log(z))),cos(mul(s,atan(div(t,a)))))),pow(add(mul(a,a),mul(t,t)),div(s,2)),tanh(mul(pi(),t)));
}
function lerchtranscendentpd(t,A){
	let z=g(A,0);let s=g(A,1);let a=g(A,2);let p=div(log(z),math.complex(0,1));
	return div(mul(pow(t,sub(s,1)),exp(mul(-1,a,t)),sub(z,exp(sub(0,t)))),sub(cosh(t),cos(p)))
}
function lerchtranscendent(z,s,a){
//	return add(div(1,mul(2,pow(a,s))),integral(lerchtranscendentd,0,bign/2,[z,s,a]));
return add(div(1,mul(pow(a,s))),div(integral(lerchtranscendentpd,0,bign/5,[z,s,a],bign*4),2,gamma(s)));
	if(mag(z)<1){
	    let fi = math.complex(0);
    for (let i = 0; i < bign; i++) {
        fi =  add(fi,div(pow(z,i),pow(add(i,a),s)));
    }
	return fi;}else
		if (math.complex(z).re<0.5){
			let fi = math.complex(0);
		 for (let n = 0; n < bign; n++) {
		let gi = math.complex(0);
		for (let i = 0; i < n; i++) 
		 gi=add(gi,mul(pow(-1,i),ncr(n,i),pow(add(a,i),sub(0,s))))
		 fi=add(fi,mul(pow(div(sub(0,z),sub(1,z)),n),gi));}
return div(fi,sub(1,z));		
	}else{
		return add(div(1,mul(pow(a,s))),div(integral(lerchtranscendentpd,0,bign/2,[z,s,a]),2,gamma(s)));
//		return add(div(1,mul(2,pow(a,s))),integral(lerchtranscendentd,0,bign,[z,s,a]));
	}
}
function lerchzeta(l,s,a){
	let z = exp(mul(2,pi(),l,math.complex(0,1)));
	 return lerchtranscendent(z,s,a);
}



function fermidiracd(t,X){
	let x=g(X,0);let j=g(X,1);
	return div(pow(t,j),add(1,exp(sub(t,x))))
}
function fermidirac(j,x){
	return div(integral(fermidiracd,0,bign,[x,j]),factorial(j))
}
function boseeinsteind(t,X){
	let x=g(X,0);let j=g(X,1);
	return div(pow(t,j),sub(exp(sub(t,x)),1))
}
function boseeinstein(j,x){
	return div(integral(boseeinsteind,0,bign,[x,j]),factorial(j))
}
function polylogarithm(i,xx){
	
	if(math.complex(i).re>0)
		return add(mul(0.5,xx),mul(xx,integral(polylogarithmd,0,sqrt(bign),[i,xx])))
	//return sub(0,fermidirac(sub(i,1),log(sub(0,xx))));
	let x=xx;
//	if(mag(xx)<1.2 && mag(xx)>0.8 )return arithmeticmean(polylogarithm(i,div(xx,1.5)),polylogarithm(i,mul(xx,1.5)));
	if(mag(xx)>1)x=div(1,xx);
	let fi=math.complex(0,0)
	for (let k=1;k<bign*5;k++)
		fi=add(fi,div(pow(x,k),pow(k,i)))
	if(mag(xx)>1)
	return mul(pow(-1,sub(1,i)),fi);
	return fi;
		
	//return sub(0,fermidirac(sub(i,1),log(sub(0,x))));
}

function polylogarithmdalt(t,A){
	let s=g(A,0);let z=g(A,1);
	return div(pow(log(t),s),sub(1,mul(t,z)))
}
function polylogarithmdalt2(t,A){
	let s=g(A,0);let z=g(A,1);
	return div(sin(sub(mul(s,atan(t)),mul(t,log(z)))),mul(pow(add(1,mul(t,t)),div(s,2)),sub(exp(mul(2,pi(),t)),1)))
}
function polylogarithmd(t,A){
	let s=g(A,0);let z=g(A,1);
	return div(sin(sub(mul(s,atan(t)),mul(t,log(sub(0,z))))),mul(pow(add(1,mul(t,t)),div(s,2)),sinh(mul(pi(),t))))
}
function polylogarithmalt3(ss,z){
	//polylogarithm(-1,x)

	return add(mul(0.5,z),mul(z,integral(polylogarithmd,0,sqrt(bign),[ss,z])))
	return add(mul(0.5,z),div(incgamma(sub(1,ss),sub(0,log(z))),pow(sub(0,log(z)),sub(1,ss))), mul(z,2,integral(polylogarithmdalt2,0,bign/2,[ss,z])) )
	/*
				let fi=math.complex(0,0);
		for(let i=-bign;i<=bign;i++){
			let sss=sub(mul(2,i,pi(),I),log(z));
		fi=add(fi,div(incgamma(sub(1,ss),sss),pow(sss,sub(1,ss))))}
		return fi;
	if(2>1){
		let fi=math.complex(0,0);
		for(let i=1;i<bign;i++)
			fi=add(fi,div(mul(pow(z,i),jordantotient(sub(0,ss),i)),sub(1,pow(z,i))))
		return fi;
	}
	
	let s=add(ss,1);
	return mul(div(mul(z,pow(-1,s)),factorial(s)),integral(polylogarithmd,0,1,[s,z]));*/
}
function dilog(x){
	return polylogarithm(2,x)
	//return mul(2,lerchtranscendent(x,2,1));
	//return polylogarithm(2,x)
	}
	function trilog(x){
	return polylogarithm(3,x)

	}

function golombdickmand(t){
	return exp(li(x));
}
function golombdickman(t){
	return integral(golombdickman,0,t);
}
function dickman(u){
	return add(sub(1,mul(sub(1,log(sub(u,1))),log(u))),dilog(sub(1,u),div(mul(pi(),pi()),12)));
}

function harmonicnum(n){
//return div(stirling(add(n,1),2),factorial(n));
return add(digamma(add(n,1)),0.5772156649);
}
function wolstenholmenum(n){
return sub(div(mul(pi(),pi()),6),trigamma(add(n,1)));
}
function couponcollector(n,t){
	return div(mul(stirling2(sub(t,1),sub(n,1)),factorial(n)),pow(n,t))
}
function couponcollectorexpected(n){
	return mul(harmonicnum(n),n);
}
function jeep(n){
return sub(harmonicnum(sub(mul(n,2),1)),div(harmonicnum(sub(n,1),2)));
}	
function hundredprisoners(n){
return sub(1,sub(harmonicnum(mul(2,n)),harmonicnum(n)))
}

function generalizedharmonicnum(n,m){
	return sub(hurwitzzeta(m,1),hurwitzzeta(m,add(n,1)));
}
function incgeneralizedharmonicnum(n,q,s){
 let fi = math.complex(0);
    for (let i = 1; i < bign; i++) {
		fi=add(fi,div(1,pow(add(i,q),s)));
	}return fi;
}

function laurentexpansion(a,c,z) {
    let fi = math.complex(0);
    for (let i = 1; i < bign; i++) {
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
function radical(n) {
    let result = math.complex(1,0);
    for (let i = 1; nthprime(i) <= n; i++) {
        if (n % nthprime(i) === 0) {
           result = mul(result,nthprime(i));
        }
    }

    return result;
}
function generalizedradical(t,n) {
    let result = math.complex(1,0);
    for (let i = 1; nthprime(i) <= n; i++) {
        if (n % nthprime(i) === 0 &&  (result % pow(nthprime(i),sub(t,1))) !== 0) {
           result = mul(result,nthprime(i));
		   n=div(n,nthprime(i));i--;
        }
    }

    return result;
}
function cycleindex(Xa,Ya,A=[1,1,1,1,1,1,1,1,1,1]){//identity
   let N = leng(Xa);    
    let X = new Array(N); 
    let Y = new Array(N);
    for (let i = 0; i < N; i++) {
        X[i] = g(Xa, i);
        Y[i] = g(Ya, i);
    }
    
    let J = [];         
    let H = new Array(N).fill(false);

    for (let i = 0; i < N; i++) {
        if (!H[i]) {
            let K = [];
            let start = i;
            let current = start;
            let count = 0;
            while (!H[current] && count < N) {
                H[current] = true; 
                K.push(current); 
                count++;

                let next = X.indexOf(Y[current]);
                if (next === -1) break; 
                current = next; 
                if (current === start) break;
            }
            if (current === start && K.length > 0) {
                J.push(K.length);
            }
        }
    }

    let JJ = new Array(N).fill(0);
    for (let i = 0; i < J.length; i++) {
        JJ[J[i] - 1]++;
    }

    let fi = math.complex(1, 0);
    for (let i = 0; i < math.min(leng(A), leng(JJ)); i++) {
        fi = mul(fi, pow(g(A, i), g(JJ, i)));
    }

    return fi;
}
function cycleindexsimp(Ya,A=[1,1,1,1,1,1,1,1,1,1]){//identity
   let N = leng(Ya);    
     let X = Array.from({ length: N }, (_, i) => i + 1);
    let Y = new Array(N);
    for (let i = 0; i < N; i++) {
        Y[i] = g(Ya, i);
    }
    
    let J = [];         
    let H = new Array(N).fill(false);

    for (let i = 0; i < N; i++) {
        if (!H[i]) {
            let K = [];
            let start = i;
            let current = start;
            let count = 0;
            while (!H[current] && count < N) {
                H[current] = true; 
                K.push(current); 
                count++;

                let next = X.indexOf(Y[current]);
                if (next === -1) break; 
                current = next; 
                if (current === start) break;
            }
            if (current === start && K.length > 0) {
                J.push(K.length);
            }
        }
    }

    let JJ = new Array(N).fill(0);
    for (let i = 0; i < J.length; i++) {
        JJ[J[i] - 1]++;
    }

    let fi = math.complex(1, 0);
    for (let i = 0; i < math.min(leng(A), leng(JJ)); i++) {
        fi = mul(fi, pow(g(A, i), g(JJ, i)));
    }

    return fi;
}
/*X -> Y is a function
X = [1,2,3] and Y = [2,1,3] for example

we start by 0th index [setting nth entry on a non-permenetnt array K]
we search X try to find Y[0] lets say we found Y[0] in index 1
we search Y[1] in x and continue this until we got where we started or done N many searches.
if we go back to start flag the positions that are used in such loop on H
and add J the length of loop*/


function cycleindexen(n,a){//identity
	return pow(a,n);
}
function cycleindexcn(n,A=[1,1,1,1,1,1,1,1,1,1]){//cyclic
	let fi = math.complex(1, 0);
    for (let d = 1; d <= minc(leng(A),add(n)); d++) {
       if (gcd(n,d)==n)
	fi= add(di,mul(totient(d),pow(g(A,div(n,d)))))	   
    }
	return div(fi,n);
}
function cycleindexdn(n,A=[1,1,1,1,1,1,1,1,1,1]){//dihedral
	return add(div(cycleindexcn(n,A),2),add(mul(mul(0.5,g(A,0),pow(g(A,1),div(sub(n,1),2))),pow(sin(mul(n,pi(),0.5)),2)),mul(div(add(mul(g(A,0),g(A,0),pow(g(A,1),div(sub(n,2),2))),pow(g(A,1),div(n,2))),4),pow(cos(mul(n,pi(),0.5)),2))))
}
function gencycleindexsn(x,n,A=[1,1,1,1,1,1,1,1,1,1]){//symettric generating function
//	console.log(A);
	let fi=math.complex(0,0);
	for(let i=1;i<=n;i++)
	fi=add(div(mul(g(A,sub(i,1)),pow(x,i)),i));
	return fi;
}
function cycleindexsn( n,A=[1,1,1,1,1,1,1,1,1,1]) {//symetric group
   return completenexponentialbellpoly(n,A);
   
   // const func = (x) => gencycleindexsn(x, n, A);
    // return gettaylorff(func, n);
}


function multifactorial(a,x){
return mul(pow(a,div(sub(x,1),a)),div(factorial(div(x,a)),factorial(div(1,a))))	
}
function doublefactorial(x){
	return multifactorial(2,x)
}
function limdoublefactorial(x){
	return add( mul ( cos(mul(x,pi(),0.5)),cos(mul(x,pi(),0.5)), mul(pow(2,div(x,2)),factorial(div(x,2)))), mul( sin(mul(x,pi(),0.5)),sin(mul(x,pi(),0.5)), doublefactorial(x)));
}
function altdoublefactorial(x){
	//return mul(pow(2,add(div(x,2),div(haversin(mul(pi(),x)),2))),pow(pi(),div(haversin(mul(pi(),x)),-2)),factorial(div(x,2)));
return mul(pow(2,add(div(x,2),div(haversin(mul(pi(),x)),2))),pow(pi(),div(haversin(mul(pi(),x)),-2)),factorial(div(x,2)))
}

//
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
	if(Number.isInteger(n) && Number.isInteger(r)){return facti(n) / (facti(r) * facti(n - r))}; 

    return div(factorial(n) , mul(factorial(r) , factorial(sub(n , r)))); 
} 

function fusscatalan(m,p,r)
{return mul(div(r,add(mul(m,p),r)),ncr(add(mul(m,p),r),m))}
function catalan(n)
{return div(ncr(mul(2,n),n),add(n,1))};
function supercatalan(m,n)
{return div(mul(factorial(add(m,m)),factorial(add(n,n))),factorial(add(m,n),factorial(m),factorial(n)))};
function lobb(m,n)
{return mul(div(add(m,m,1),add(m,n,1)),ncr(add(n,n),add(m,n)))};

function mncr(m, n, r) 
{ 
    return div(multifactorial(m,n) , mul(multifactorial(m,r) , multifactorial(m,sub(n , r)))); 
} 
function mnpr(m, n, r) 
{ 
    return div(multifactorial(m,n), multifactorial(m,sub(n, r)));
}
function npr(n, r) 
{ 
    if(Number.isInteger(n) &&  Number.isInteger(r)){ 
        return facti(n) / facti(n - r);
    }

    return div(factorial(n), factorial(sub(n, r)));
}

function fallingfactorial(n, r) 
{
    if(Number.isInteger(n) &&  Number.isInteger(r)) {
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
	if(Number.isInteger(n) && Number.isInteger(x)){
		let fi=1;
		 for(let i=0;i<n;i++)fi=mul(fi,add(x,i))
			 return fi;
	}
	 return div(gamma(add(n, x)),gamma(x));
}
function generalizedpochhammer(x,a,K){
	 let fi=math.complex(1,0);
	 for(let i=1;i<=leng(K);i++)
		 for(let j=1;j<=g(K,i);j++)
			 fi=mul(fi,add(a,j,-1,mul(-1,div(sub(i,1),a))));
return fi;
}

function hankelsymbol(v,n){
	 return div(mul(pow(-1,n),math.cos(mul(pi(),v)),gamma(sub(add(0.5,n), v)),gamma(add(m, v,0.5))),mul(gamma(n),pi()));
}
function krampsymbol(a,b,c){
	 return div(mul(pow(b,a),gamma(add(a,div(c,b)))),gamma(div(c,b)));
}
function parkingfunction(n){
	return pow(add(n,1),sub(n,1));
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
	/*	if(math.complex(z).re<0)return div(sub(0,pi()),mul(z,math.sin(mul(pi(),z)), integral(gammad,0,bign/4,sub(0,z))));

	if(math.complex(z).re<1)return div(sub(pi(),0),mul(z,math.sin(mul(pi(),z)),gamma(sub(1,z))));
return integral(gammad,0,bign/4,z);

    const complexZ = math.complex(z);

    let fi = div(math.exp(mul(-0.577216, complexZ)), complexZ);

    for (let i = 1; i < bign; i++) {
        let term = div(complexZ, i);
        fi = mul(fi, div(math.exp(term), add(1, term)));
    }

    return fi;*/
}

function hadamardgamma(x){
	return div(sub(digamma(sub(1,mul(0.5,x))),digamma(0.5,mul(0.5,x))),2,gamma(sub(1,x)));
}
function luschnyfactorial(x){
	return inftozero( mul(gamma(add(x,1)),sub(1,div(mul(sin(mul(pi(),x)),sub(mul(0.5,x,sub(digamma(mul(add(x,1),0.5)),digamma(mul(x,0.5)))),0.5)),pi(),x))));
}



function ellipticgamma(z,p,q){
	let fi = math.complex(1, 0); 
	for(let m=0;m<bign;m++)
		for(let n=0;n<bign;n++)
			fi=mul(fi,div(sub(1,div(mul(pow(p,add(m,1)),pow(q,add(1,n))),z)),sub(1,mul(pow(p,m),pow(q,n),z))))
	return fi;
}


function jacobitheta1(z, q) {
    let fi = math.complex(0, 0);
    
    for (let n = -bign; n <= bign; n++) {
  
    fi=add(fi,mul(pow(-1,sub(n,0.5)),pow(q,sqr(add(n,0.5))),exp(mul(I,z,add(n,n,1)))))
    }
    
    return mul(fi, -1);
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

function qtheta(z,q){
	let fi = math.complex(1, 0);
	for(let n=0;n<bign;n++)
		fi=mul(fi,sub(1,mul(z,pow(q,n))),sub(1,div(pow(q,add(1,n)),z)));
return fi;
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
        if (isprime(add(mul(math.complex(6.0), mul(i, sub(i, math.complex(1.0)))), math.complex(1.0)))) {
            i = add(i, math.complex(1.0));
        }
    }
    return i;
}

function superstarprime(b) {
    let i = math.complex(0.0);
    while (math.larger(math.abs(i), math.abs(b))) {
        if (isprime(add(mul(math.complex(6.0), mul(nthprime(i), sub(nthprime(i), math.complex(1.0)))), math.complex(1.0)))) {
            i = add(i, math.complex(1.0));
        }
    }
    return i;
}

function reversesuperstar(b) {
    return add(
        mul(math.complex(6.0), mul(nthprime(b), sub(nthprime(b), math.complex(1.0)))),
        math.complex(1.0)
    );
}

function superballot(b) {
    return div(
        mul(math.complex(60.0), gamma(add(mul(math.complex(2.0), b), math.complex(1.0)))),
        mul(gamma(add(b, math.complex(1.0))), gamma(add(b, math.complex(4.0))))
    );
}

function bertrandsballot(p,q){
	return div(sub(p,q),add(p,q))
}
function bertrandsballottie(p,q){
	return div(sub(p,q,-1),add(p,q))
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
    return pow(b, nthprime(a + 2.0));
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
function weakfactorial(n){
	if (n<=1)return 1;
	return lcm(n,weakfactorial(sub(n,1)));
}
function romanfactorial(x){
	return add(div(pow(-1,sub(-1,x)),factorial(sub(-1,x))),mul(div(sub(mag(add(x,0)),mag(sub(x,2)),-2),4),factorial(x)));
return add(div(pow(-1,sub(-1,x)),factorial(sub(-1,x))),luschnyfactorial(x));
return div(pow(-1,sub(-1,x)),factorial(sub(-1,x)));
return factorial(x);	
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
function  touchardpolyd(t,X){
	const n=g(X,0);const x=g(X,1);
	return div(exp(mul(x,sub(exp(t),1))),pow(t,add(n,1)));
}
function  touchardpoly(n,x){
	if(Number.isInteger(n)){
	let fi=math.complex(0,0);
	for(let k=0;k<=n;k++)
		fi=add(fi,mul(stirling2(n,k),pow(x,k)))
	return fi;}
//	return div(mul(cintegralf(touchardpolyd,Ccircle(1),[n,x]),factorial(n)),2,pi(),I);
		let fi=math.complex(0,0);
	for(let k=0;k<=bign;k++)
		fi=add(fi,div(mul(pow(x,k),pow(k,n)),factorial(k)))
	return mul(exp(sub(0,x)),fi);
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
    return div(mul(gamma(a), gamma(b)), gamma(add(a , b)));
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
function ellipticmodulus(a, b) {
    return pow(div(jacobitheta2(a, b) , jacobitheta1(a, b)), math.complex(2));
}

function compellipticmodulus(a, b) {
    return pow(div(jacobitheta4(a, sub(0,b)) , jacobitheta3(a, b)), math.complex(2));
}

function ellipticlambda(a, b) {
    return pow(div(jacobitheta2(a, b) , jacobitheta3(a, b)), math.complex(4));
}

function ellipticlambda1(q) {
    return pow(div(jacobitheta2(0,q) , jacobitheta3(0,q)), math.complex(4));
}
function g2(b) {
    return mul(60.0, einsteinseries(math.complex(4), b));
}

function g3(b) {
    return mul(140.0, einsteinseries(math.complex(6), b));
}

function picardfuchsj(b) {
    const g2Val = g2(b);
    const g3Val = g3(b);
    return div(pow(g2Val, math.complex(3)), (pow(g2Val, math.complex(3)) - mul(27.0, pow(g3Val, math.complex(2)))));
}

function ellipticdiscriminant(b) {
    const g2Val = g2(b);
    const g3Val = g3(b);
    return sub(pow(g2Val, math.complex(3)), mul(27.0, pow(g3Val, math.complex(2))));
}

function ellipticlambdastar(a, b) {
    return pow(div(jacobitheta2(a, b), jacobitheta3(a, b )), math.complex(2));
}
function ellipticlambdastar1(q) {
    return pow(div(jacobitheta2(0, q), jacobitheta3(0, q )), math.complex(2));
}

function jacobixi(a, b) {
    return div(jacobitheta1(a, b), jacobitheta4(a, b ));
}
function ci(b) {
    return mul(-1.0, integral(cosc, b, bign));
}
function mcosc(x){return div(sub(1,cos(x)),x);}
function cin(b) {
    return mul(-1.0, integral(mcosc, 0, b));
}
function msinc(x){return div(sub(1,sin(x)),x);}
function cin(b) {
    return mul(-1.0, integral(msinc, 0, b));
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
    return mul(-1.0, integral(shid, 0, b));
}
function rec(b){return div(1,b);}
function coshmc(x){return div(sub(cosh(x),1),x)}
function chi(b) {
    return add(
        0.5772156649,
        log(b),
		integral(coshmc,0,b)
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
	return mul(pow(b,sub(n,1)),incgamma(sub(1,n),b));
	//return integral(expcp, 1, bign, [n,b]);
}
function misra(n,b){
	return en(sub(0,n),b);
}
function esj(s,j,z){
	return integral(esjd,1,bign,[s,j,z]);
}
function esjd(t,nx){
	let s=g(nx,0);
	let j=g(nx,1);	let z=g(nx,2);
	return div(mul(pow(log(t),j),exp(mul(-1,z,t))),pow(t,s))
}

function ei(b) {
    return integral(expc, sub(0,bign), b);
}
function inveip(n){
	if(n==0)return [0,1];
	return mulp([0,1],subp(dervep(inveip(sub(n,1))),mulp(inveip(sub(n,1)),[n])))
}
function invei(x){
	let fi=math.complex(0);
	for(let n=0;n<bign/2;n++)
		fi=add(fi,div(mul(pow(x,n),polynomial(inveip(n),log(1.45136923))),factorial(n),pow(1.45136923,n)))
return fi;
}
function logarithmicintegrald(t){
	return div(1,log(t));
}
function lli(b) {
    return integral(logarithmicintegrald, 2, b);
}
function li(b) {
    return integral(logarithmicintegrald, 0, b);
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

function gudermann(b) {
    return integral(sech, 0, b);
}

function invgudermann(b) {
    return integral(sec, 0, b);
}

function compellint1d(a,gcei1d=0) {
return div(1.0,math.sqrt(mul(sub(1.0,mul(a,a)),sub(1.0,mul(mul(a,a),mul(gcei1d,gcei1d)))))) ;
}
function compellint1(a) {
 return integral(compellint1d, 0, 1,a);
}
function ellint1(p,a) {
 return integral(compellint1d, 0, p,a);
}


function compellint2d(a,t) {
return div(sqrt(sub(1,mul(a,a,t,t))),sqrt(sub(1,mul(a,a))))
}
function compellint2(a) {
 return integral(compellint2d, 0, 1,a);
}
function ellint2(p,a) {
 return integral(compellint2d, 0, p,a);
}
function compellint3d(a,T) {
	let n=g(T,0);let t=g(T,1);
return div(1,sub(1,mul(n,t,t)),sqrt(mul(sub(1,mul(t,t)),sub(1,mul(a,a,t,t)))));
}
function compellint3(n,a) {
 return integral(compellint3d, 0, 1,[n,a]);
}
function ellint3(n,p,a) {
 return integral(compellint3d, 0, p,[n,a]);
}

function htau(x){
return	mul(math.complex(0,1),div(hypg21(0.5,0.5,1,sub(1,x)),hypg21(0.5,0.5,1,x)));
}

function incompletebeta(x,p,q){
	return mul(div(pow(x,p),p),hypg21(p,sub(1,q),add(p,1),x))
}
function gausscontinuedfraction(a,b,c,z){
	return div(hypg21(add(a,1),b,add(c,1),z),hypg21(a,b,c,z))
}

function jacobizeta(p,k){
	return sub(ellint2(p,k),mul(ellint1(p,k),div(compellint2(k),compellint1(k))))
}
function zn(a,b){
	return sub(jacobiepsilon(a,b),div(mul(compellint2(b),a),compellint1(b)))
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
function cc(z, k) {
    return nevthetc(z, k);
}
function cs(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(div(mul(jacobitheta1(a,q),jacobitheta3(0,q)),jacobitheta2(a,q),jacobitheta4(0,q)))
//    return div(nevthetc(a, b), nevthets(a, b));
}
function cn(z, k) {
		const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(mul(jacobitheta4(0,q),jacobitheta2(a,q)),jacobitheta2(0,q),jacobitheta4(a,q))
   // return div(nevthetc(a, b), nevthetn(a, b));
}
function cd(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(mul(jacobitheta3(0,q),jacobitheta2(a,q)),jacobitheta2(0,q),jacobitheta3(a,q))
  //  return div(nevthetc(a, b), nevthetd(a, b));
}
function sc(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(mul(jacobitheta1(a,q),jacobitheta3(0,q)),jacobitheta2(a,q),jacobitheta4(0,q))
	//return div(nevthets(a, b), nevthetc(a, b));
}
function ss(z, k) {
    return nevthets(z, k);
}
function sn(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(mul(jacobitheta1(a,q),jacobitheta3(0,q)),jacobitheta2(0,q),jacobitheta4(a,q))
  //  return div(nevthets(a, b), nevthetn(a, b));
}
function sd(z, k) {
		const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(mul(sqr(jacobitheta3(0,q)),jacobitheta1(a,q)),jacobitheta2(0,q),jacobitheta4(0,q),jacobitheta3(a,q))
  //  return div(nevthets(a, b), nevthetd(a, b));
}
function nc(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(mul(jacobitheta4(a,q),jacobitheta2(0,q)),jacobitheta2(a,q),jacobitheta4(0,q))
   // return div(nevthetn(a, b), nevthetc(a, b));
}
function ns(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(1,div(mul(jacobitheta1(a,q),jacobitheta3(0,q)),jacobitheta2(0,q),jacobitheta4(a,q)))
    //return div(nevthetn(a, b), nevthets(a, b));
}
function nn(z, k) {
    return nevthetn(z, k)
}
function nd(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(1,div(1,div(mul(jacobitheta4(0,q),jacobitheta3(a,q)),jacobitheta3(0,q),jacobitheta4(a,q))))
  //  return div(nevthetn(a, b), nevthetd(a, b));
}
function dc(z, k) {
		const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(1,div(mul(jacobitheta3(0,q),jacobitheta2(a,q)),jacobitheta2(0,q),jacobitheta3(a,q)))
  //  return div(nevthetd(a, b), nevthetc(a, b));
}
function ds(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return div(1,div(mul(sqr(jacobitheta3(0,q)),jacobitheta1(a,q)),jacobitheta2(0,q),jacobitheta4(0,q),jacobitheta3(a,q)))
   // return div(nevthetd(a, b), nevthets(a, b));
}
function dn(z, k) {
	const kk=compellint1(k);const ck=compellint1(math.sqrt(sub(1, pow(k, 2))));const q=exp(div(mul(pi(),ck),kk,-1));const a=div(mul(pi(),z),2,kk)
    return mul(1,div(mul(jacobitheta4(0,q),jacobitheta3(a,q)),jacobitheta3(0,q),jacobitheta4(a,q)))
    //return div(nevthetd(a, b), nevthetn(a, b));
}
function dd(z, k) {
    return nevthetd(z, k);
}

function am(z, k) {
	return asin(sn(z,k));
    return integral(dn,0,z,k);
}
function jacobiepsilon(z, k){
	return ellint2(am(z,k),k)
}
	
	
function asm(x) {
	return mul(hypg21(div(1,3),div(2,3),div(4,3),mul(x,x,x)),x)
}		

smtc=[1];
cmtc=[1];
function cmtay(x){
	if(x<cmtc.length)return cmtc[x];
	let fi=0;
	for(let k=0;k<x;k++)fi=add(fi,mul(smtay(k),smtay(sub(x,1,k))));
	cmtc.push(div(fi,-3,x));
return cmtc[x];}
function smtay(x){
	if(x<smtc.length)return smtc[x];
	let fi=0;
	for(let k=0;k<=x;k++)fi=add(fi,mul(cmtay(k),cmtay(sub(x,k))));
	smtc.push(div(fi,add(x,x,x,1)));
return smtc[x];}
function hexmod(x,l=2.62205755){
	const w=exp(div(mul(2,pi(),I),3));
	let fi=sub(div(l),modc(add(x,div(l)),mul(l,2)));
	fi=mul(fi,w);
	fi=sub(l,modc(add(fi,l),mul(l,2)));
	fi=mul(fi,w);
	fi=sub(l,modc(add(fi,l),mul(l,2)));
	fi=mul(fi,w);
	fi=sub(l,modc(add(fi,l),mul(l,2)));
	fi=mul(fi,w);
	fi=sub(l,modc(add(fi,l),mul(l,2)));
	fi=mul(fi,w);
	fi=sub(l,modc(add(fi,l),mul(l,2)));
	fi=mul(fi,w);
	fi=sub(l,modc(add(fi,l),mul(l,2)));
	return sub(0,fi);
}
function smin(x,y){
if(mag(x)<mag(y))return x;return y;	
}
/*
function smt(x){
	let fi=0;
	for(k=0;k<bign/2;k++){
		fi=add(fi,mul(smtay(k),pow(hexmod(x,2.62205755),k*3+1)));
	}
	return fi;
}
function cmt(x){
	let fi=0;
	for(k=0;k<bign/2;k++){
		fi=add(fi,mul(smtay(k),pow(hexmod(x,2.62205755),k*3)));
	}
	return fi;
}
*//*
function sm(x){
	const w=exp(div(mul(2,pi(),I),3))
	return smin(smin(smt(x),cmt(sub(div(2.62205755,2),x))),smin(mul(w,cmt(sub(div(2.62205755,2),mul(x,w,w)))),mul(w,w,cmt(sub(div(2.62205755,2),mul(x,w))))));
}*/
function sm(x){
	return 0;
}
function cmm(x){
	const lemn=2.62205755;
	const w=exp(div(mul(2,pi(),I),3))//pow(I,div(4,3));
	let fi=div(1,x,x);
	for(let x0=-bign;x0<=bign;x0++)
	for(let y0=-bign;y0<=bign;y0++)
	if(x0!=0||y0!=0)
	{let l=add(mul(x0,lemn),mul(y0,w,lemn))
	fi=add(fi,sub(div(1,pow(sub(x,l),2)),div(1,l,l)))}
	let fip=sqrt(sub(mul(4,fi,fi,fi),div(1,27)));
	return div(add(mul(fip,3),1),sub(mul(fip,3),1))
}
function dixonxi(x) {
	const k = (exp(div(mul(5,I,pi()),6)));
	const t = mul(pow(3,div(1,4)),exp(div(mul(5,I,pi()),12)))
	const tscd = mul(t,sn(x,k),cn(x,k),dn(x,k));
	//const tscd = div(mul(t,nevthets(x,k),nevthetc(x,k),nevthetd(x,k)),pow(nevthetn(x,k),3)) ;
//	return tscd;
	return div(add(-1,tscd),add(1,tscd));
}		
function dixoneta(x) {
	const k = exp(div(mul(5,I,pi()),6));
	const t = mul(pow(3,div(1,4)),exp(div(mul(5,I,pi()),12)))
	const s = nevthets(x,k);
	const tscd = div(mul(t,s,nevthetc(x,k),nevthetd(x,k)),pow(nevthetn(x,k),3)) ;
	return div(mul(pow(2,div(1,3),add(1,mul(t,t,s,s)))),add(1,tscd));
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

function qnum(a, q) {
    if (math.equal(q, math.complex(1.0, 0))) return a;
    return div(
        sub(math.complex(1.0, 0), pow(q, a)),
        sub(math.complex(1.0, 0), q)
    );
}
function qpocinf(a, q=a) {
    let fi = math.complex(1.0, 0);
    for (let i = 0; i < bign; i++) {
        fi = mul(fi, sub(math.complex(1.0, 0), mul(a, pow(q, i))));
    }
    return fi;
}
function qpochinf(a, q=a) {//same thing 
    let fi = math.complex(1.0, 0);
    for (let i = 0; i < bign; i++) {
        fi = mul(fi, sub(math.complex(1.0, 0), mul(a, pow(q, i))));
    }
    return fi;
}
function qgamma(x,q) {
  return div(mul(qpocinf(q,q),pow(sub(1,q),sub(1,x))),qpocinf(pow(q,x),q))
}
function qbeta(a,b,q) {
  return div(mul(qgamma(a,q),qgamma(b,q)),qgamma(add(a,b)));
}

function qfac(n, q) {
    let fi = math.complex(1.0, 0);
    for (let i = 1; i <= todoub(n); i++) {
        fi = mul(fi, qnum(math.complex(i, 0), q));
    }
    return fi;
}


function qexp(n,q) {
    let fi = math.complex(0, 0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, div(pow(n, i), qfac(i, q)));
    }
    return fi;
}
function qexpalt(n,q) {//different
    let fi = math.complex(0, 0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, div(mul(pow(q,div(mul(n,sub(n,1)),2)),pow(n, i)), qfac(i, q)));
    }
    return fi;
}

function qsingosper(zz,q){
	let z=div(zz,pi());
	return div(mul(pow(q,sqr(sub(z,0.5))),qpocinf(pow(q,mul(2,z)),sqr(q)),qpocinf(pow(q,sub(2,mul(2,z))),sqr(q))),sqr(qpocinf(q,sqr(q))))
}


function qsin(z,q){return div(sub(qexp(mul(I,z),q),qexp(mul(I,z,-1),q)),math.complex(0,2))}
function qcos(z,q){return div(add(qexp(mul(I,z),q),qexp(mul(I,z,-1),q)),2)}
function qtan(z,q){return div(qsin(z,q),qcos(z,q))}
function qcot(z,q){return div(qcos(z,q),qsin(z,q))}
function qsec(z,q){return div(1,qcos(z,q))}
function qcsc(z,q){return div(1,qsin(z,q))}

function qsinalt(z,q){return div(sub(qexpalt(mul(I,z),q),qexpalt(mul(I,z,-1),q)),math.complex(0,2))}
function qcosalt(z,q){return div(add(qexpalt(mul(I,z),q),qexpalt(mul(I,z,-1),q)),2)}
function qtanalt(z,q){return div(qsinalt(z,q),qcosalt(z,q))}
function qcotalt(z,q){return div(qcosalt(z,q),qsinalt(z,q))}
function qsecalt(z,q){return div(1,qcosalt(z,q))}
function qcscalt(z,q){return div(1,qsinalt(z,q))}

function qpi(q){return mul(pow(q,0.25),sqr(qfac(0.5,mul(q,q))))}








function dqexp(n,q) {
    let fi = math.complex(0, 0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, div(pow(n, i), qfac(i, q)));
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

function qncr(n, r, q){
return div(qfac(n,q),qfac(r,q),qfac(sub(n,r),q))	
}
function qbinomial(n, r, q){
return mul(pow(q,mul(-1,k,sub(n,k))),qncr(n,k,mul(q,q)));
}
function qnpr(n, r, q){
return div(qfac(n,q),qfac(sub(n,r),q))	
}
function qgaussianv(q){
return div(1,sqrt(sub(1,q)));
}	
//function qgaussianc(q){
	//let fi=math.complex(0,0);
	//for(let i=0;i<bign;i++)fi=add(fi,div(,))
//}
	
	
	
	
	
//d analogues
function dnum(s, d) {
    return sub(1,pow(div(2,s),d))
}
function dfac(s,d){
	let fi = math.complex(1.0, 0);
    for (let i = 1; i < bign; i++) {
        fi = mul(fi, pow(div(add(i,2),add(i,s)),d));
    }
    return fi;
}
function dncr(n, r, q){
return div(dfac(n,q),dfac(r,q),dfac(sub(n,r),q))	
}
function dnpr(n, r, q){
return div(dfac(n,q),dfac(sub(n,r),q))	
}	
function dpolygamma(s,d){
	let fi = math.complex(0.0, 0);
    for (let m = 1; m < bign; m++) {
        fi = add(fi,div(1,add(m,s),sub(pow(add(m,s),d),pow(2,d))))
    }
    return mul(fi,-1,d,pow(2,d));
}
function deulermascheroni(d){
	let fi = math.complex(0.0, 0);
    for (let m = 3; m < bign; m++) {
        fi = add(fi,div(1,m,sub(pow(m,d),pow(2,d))));
    }
    return mul(fi,1,d,pow(2,d));
}
function dharmonic(s,d){
	return add(dpolygamma(add(s,1),d),deulermascheroni(d))
}
function dfacinf(d){//inf ! _d 
	let fi = math.complex(1, 0);
    for (let n = 3; n < bign; n++) {
        fi = mul(sub(1,pow(div(2,n),d)),fi);
    }
    return fi;
}
function dexp(n,q) {
    let fi = math.complex(0, 0);
    for (let i = 0; i < bign; i++) {
        fi = add(fi, div(pow(n, i), dfac(i, q)));
    }
    return fi;
}
function dsin(z,q){return div(sub(dexp(mul(I,z),q),dexp(mul(I,z,-1),q)),math.complex(0,2))}
function dcos(z,q){return div(add(dexp(mul(I,z),q),dexp(mul(I,z,-1),q)),2)}
function dtan(z,q){return div(dsin(z,q),dcos(z,q))}
function dcot(z,q){return div(dcos(z,q),dsin(z,q))}
function dsec(z,q){return div(1,dcos(z,q))}
function dcsc(z,q){return div(1,dsin(z,q))}

/*
*/
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
    for (let n = 0; n < bign; n++) {
        const sign = pow(math.complex(-1.0, 0), n);
        const numerator = mul(sign, pow(div(b, math.complex(2.0, 0)), add(1e-7,a, mul(2.0, n))));
        const denominator = mul(gamma(add(n, math.complex(1.0, 0))), gamma(add(1e-7,a, n, math.complex(1.0, 0))));
        fi = add(fi, div(numerator, denominator));
    }
    return fi;
}

function jinc(x){return div(besselj(1,x),x);}
function somb(x,y=0){let p = mul(sqrt(add(mul(x,x),mul(y,y))),pi()); return div(besselj(1,p),p,0.5);}

function besselk(a, b) {
    const term1 = besseli(mul(math.complex(-1.0, 0), a), b);
    const term2 = besseli(a, b);
    const numerator = sub(term1, term2);
    const denominator = math.sin(mul(pi(), add(1e-7,a)));
    return mul(div(numerator, denominator), div(pi(), math.complex(2.0, 0)));
}

function besseli(a, b) {
    let fi = math.complex(0, 0);
    for (let n = 0; n < bign; n++) {
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
    for (let n = 0; n < bign; n++) {
        const sign = pow(math.complex(-1.0, 0), n);
        const numerator = mul(sign, pow(div(b, math.complex(2.0, 0)), mul(2.0, n)));
        const denominator = mul(gamma(add(n, math.complex(1.5, 0))), gamma(add(a, n, math.complex(1.5, 0))));
        fi = add(fi, div(numerator, denominator));
    }
    return mul(pow(div(b, math.complex(2.0, 0)), add(a, math.complex(1.0, 0))), fi);
}
function struvel(a, b) {
    let fi = math.complex(0, 0);
    for (let n = 0; n < bign; n++) {
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
	if (b.re == 0 && b.im == 0){
	return a;}
	if(b.re == 0){
		return  math.complex(ac.re, math.mod(ac.im, bc.im));
	}
	if(b.im == 0){
		return  math.complex(math.mod(ac.re, bc.re),ac.im);
	}
    return math.complex(math.mod(ac.re, bc.re), math.mod(ac.im, bc.im));
}
function smodc(aa, b) {
	let a = add(aa,div(b,2));
	let bb=div(b,2);
	let ac = math.complex(a);
	let bc = math.complex(b);
	if (b.re == 0 && b.im == 0){
	return sub(a,bb);}
	if(b.re == 0){
		return sub( math.complex(ac.re, math.mod(ac.im, bc.im)),bb);
	}
	if(b.im == 0){
		return  sub(math.complex(math.mod(ac.re, bc.re),ac.im),bb);
	}
    return sub(math.complex(math.mod(ac.re, bc.re), math.mod(ac.im, bc.im)),bb);
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
function hilberttransformsub(b){return math.multiply(2/math.sqrt(pi()),dawsondplus(math.sqrt(b)));}//hilberttransormofthe x^2n e^-x^2
	
function auxerfz(x){return div(exp(div(mul(x,x),-2)),sqrt(mul(2,pi())))}	
function auxerfq(x){return div(erfc(div(x,sqrt(2))),2)}	
function tetrachoric(n,x){return div(mul(pow(-1,sub(n,1)),fractionalderiv("auxerfz(x)",x,n)),sqrt(factorial(n)))}
function erfhh(n,x){
	if(n==0)return mul(erfc(div(x,sqrt(2))),sqrt(div(pi(),2)))
	if(math.complex(n).re<=0)
	return mul(pow(-1,sub(-1,n)),sqrt(mul(2,pi())),fractionalderiv("auxerfz(x)",x,sub(-1,n)))
	return div(mul(pow(-1,n),erfhh(-1,x),fractionalderiv("auxerfq(x)/auxerfz(x)",x,n)),factorial(n))
}

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

function zex(x){return mul(x,exp(x));}
function zexb(b,x){return mul(x,pow(b,x));}

function lambertwd(a,b){return log(add(1,mul(b,sinc(a),exp(div(a,tan(a))))));}
function lambertw(b){return div(integral(lambertwd,math.complex(0.0001),math.complex(3.1415925),b,50),pi());}
function lambertwf(b,n=bign){return div(integral(lambertwd,math.complex(0.0001),math.complex(3.1415925),b,n),pi());}
function lambertwb(b,a){return div(lambertw(mul(a,log(b))),log(b));}

function lambertwbr(b,a){
//let fi=b;
//if (b==0)return lambertw(a);
if (b==0)return newtoninv("zex(x)",a,lambertwf(a,3));
let fi=add(mul(I,pi(),2,b),log(add(0,a)))
//for(let i=0;i<bign;i++)fi=sub(fi,div(sub(zex(fi),a),add(fi,zex(fi))))
fi=newtoninv("zex(x)",a,fi);
return fi;
}
function lambertwbrb(bb,b,a){

if (b==0)return newtoninv("zexb("+bb+",x)",a,div(lambertwf(mul(a,log(bb)),3),log(bb)));
let fi=add(mul(I,pi(),2,b,div(1,log(bb))),div(log(add(0,a)),log(bb)))
fi=newtoninv("zexb("+bb+",x)",a,fi);
return fi;
}
function lambertt(x){return sub(0,lambertw(sub(0,x)))}
function lambertu(x){let t=lambertt(x);return sub(t,div(mul(t,t),2))}
function lambertv(x){return div(log(div(1,sub(1,lambertt(x)))),2)}



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
function ramanujanphi1(a){
		let fi = math.complex(0,0);
	for(let k=1;k<bign;k++)fi=add(fi,div(1,sub(pow(mul(a,k),3),mul(a,k))));
	return add(1,mul(2,fi));
}
function ramanujanphi(a,n){
	 return sub(1, div(sub(add(harmonicnum(div(-1, a)), harmonicnum(div(1, a))), add(harmonicnum(div(sub(n, 1), a)), harmonicnum(div(add(n, 1), a)))), a));
}
	
function ramanujantau(x){
	return pow(dedekindeta(x),24);
}
function ramanujantheta1(a){return ramanujantautheta(a,a);}
function ramanujantheta(a,b){
			let fi = math.complex(0,0);
	for(let k=-bign;k<=bign;k++)fi=add(fi,mul(pow(a,div(mul(k,add(k,1)),2)),pow(b,div(mul(k,sub(k,1)),2))));
	return fi;
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
                const term = mul(math.complex(0, 1), b, pi() * 2.0 * i);
                fi = add(fi, mul(knthetaa[i], math.exp(term)));

}return fi;}
   function tetr(b) {
            const N = bign; // bign is set to 10000 for this example

            let fi = math.complex(b.re, Math.abs(b.im));
            const bi = math.complex(math.mod(math.re(b), 1.0), math.im(fi));

            for (let i = 0; i < 18; i++) {
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
		
		
		   function tetrf(b) {
            const N = bign; // bign is set to 10000 for this example
            let fi = math.complex(b.re, Math.abs(b.im));
            const bi = math.complex(math.mod(math.re(b), 1.0), math.im(fi));
         /*   for (let i = 0; i < 58; i++) {
                const term = mul(math.complex(0, 1), bi, pi() * 2.0 * i);
                fi = add(fi, mul(knthetaa[i], math.exp(term)));
            }*/
		fi=add(fi,math.complex(-0.4766,-1.110645));

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
		if(n < -2)return add(-1.85035452902718141848345,math.exp(mul(1.86573322813586677933545,add(x,2.2481745))));
		let y = pentts(math.complex(math.mod(x.re,1)-2,x.im));
		for(let i=0;i<n && i<bign/2+2;i++){y = tetr(y);}
		for(let i=0;i<-n && i<5;i++){y = sloge(math.complex(re(y),(-3.367676/2+math.mod(y.im+3.367676/2,3.367676)) ));}
		return y;
	}
	function sloge(x){
		let k=slog(x);
		if(k.re>0)return slogm(x);return k;
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
//	if(b==0)return 1;
	if(Number.isInteger(b))return facti(b);
    return gamma(add(b,1));
}
function ffactorial(b) {
	if(b==0)return 1;
	if(Number.isInteger(b))return facti(b);
    return gamma(add(b,1));
}
function nfactorial(b) {
	//console.log(b);
	if(math.complex(b).re<=0)return 0;
	if(b==math.Infinity)return 0;
    return gamma(add(b,1));
}


function jacobitrippleproduct(x,y){
	let fi=math.complex(0,0);
	for(let i=-bign;i<=bign;i++)
		fi=add(fi,mul(pow(x,mul(n,n)),pow(y,mul(2,i))))
return fi;
}
function durfeesquaregeneratingfuncdenom(x,k){
let fi=math.complex(1,0);
	for(let i=1;i<=k;i++)
		fi=mul(fi,sqr(sub(1,pow(x,i))))
return fi;
}
function durfeesquaregeneratingfunc(x){
	let fi=math.complex(0,0);
	for(let i=0;i<=bign;i++)
		fi=add(fi,div(pow(x,mul(i,i)),durfeesquaregeneratingfuncdenom(x,i)));
return fi;
}
function durfeesquare(A){
	let i=0;
	for(;i<mag(g(A,i));i++);
	return i;	
}
function leastdurfeepartition(n,d){
	return partition(sub(n,sqr(d)));
}
function durfeepartition(n,d){
	return sub(leastdurfeepartition(n,d),leastdurfeepartition(n,add(d,1)));
}
function durfeepoly(n,y){
		let fi=math.complex(0,0);
	for(let i=0;i<=mag(sqrt(n));i++)
		fi=add(fi,mul(pow(y,i),durfeepartition(n,i)));
return fi;
}


function incgammad(t,a){
	return mul(pow(t,sub(a,1)),pow(eulerc(),sub(0,t)));
}
function pearsonincgamma(r,l){
			let fi=math.complex(0,0);
	for(let i=r;i<bign;i++)
		fi=add(fi,div(mul(exp(sub(0,l)),pow(l,i)),factorial(i)));
return fi;
}
function incgamma(a,x){return integral(incgammad,x,bign,a,bign*2);}
function lincgamma(a,x){return integral(incgammad,0,x,a,bign*2);}
function linggammalimit(a,x){return div(lincgamma(a,x),gamma(a),pow(x,a))}
function reglincgamma(a,x){return div(lincgamma(a,x),gamma(a))}
function regincgamma(a,x){return div(incgamma(a,x),gamma(a))}
function gincgamma(a,y,x){return integral(incgammad,y,x,a,bign*2);}
function gammaq(a,x){return div(incgamma(a,x),gamma(a));}
function gammap(a,x){return div(lincgamma(a,x),gamma(a));}
function et(t,v,a){return div(mul(pow(a,sub(0,v)),math.exp(mul(a,t)),lincgamma(v,mul(a,t))),gamma(v));}
function gammar(x){return mul(pow(3.14159265,div(x,-2)),gamma(div(x,2)))}
function gammac(x){return mul(2,pow(mul(2,pi()),sub(0,x)),gamma(x))}
function gammareg(a,z){return div(incgamma(a,z),gamma(a));}
function lgammareg(a,z){return div(lincgamma(a,z),gamma(a));}
function ggammareg(a,x,z){return div(gincgamma(a,x,z),gamma(a));}

function incbetad(t,A){
	const a=g(A,0);const b=g(A,1);
	return mul(pow(t,sub(a,1)),pow(sub(1,t),sub(b,1)));
}
function incbeta(x,a,b){return integral(incbetad,0,x,[a,b]);}
function regincbeta(x,a,b){return div(incbeta(x,a,b),beta(a,b));}
function uincbeta(x,a,b){return sub(beta(a,b),incbeta(x,a,b));}
function reguincbeta(x,a,b){return div(uincbeta(x,a,b),beta(a,b));}


function selbergzetamodular(x){return mul(pow(pi(),0.5),div(mul(gamma(sub(x,0.5)),zeta(add(x,x,-1))),gamma(x),zeta(add(x,x))))}

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
function splite(func,input="x"){

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

//lyapexp("x^2+c",x,5)
function lyapexp(func,x,bignc=bign){
	let fi=math.complex(0);let xi=x;
	for(let i=0;i<bignc;i++)
	{	
	fi=add(fi,inftozero(log(mag(derve1(func,xi,x)))));
	xi = math.evaluate(func,{x:xi,c:x});
	}
	return div(fi,bignc);
}
function qlyapexp(func,x,q,bignc=bign){
	let fi=math.complex(0);let xi=x;
	for(let i=0;i<bignc;i++)
	{	
	fi=add(fi,inftozero(log(mag(qderve1(func,xi,q,x)))));
	xi = math.evaluate(func,{x:xi,c:x,q:q});
	}
	return div(fi,bignc);
}
function generalizedlyapexp(func,x,q,bignc=bign){
	let fi=math.complex(0);let xi=x;
	for(let i=0;i<bignc;i++)
	{	
	fi=add(fi,inftozero(log(mag(pow(derve1(func,xi,x),q)))));
	xi = math.evaluate(func,{x:xi,c:x});
	}
	return div(fi,bignc);
}
function lyapdim(func,x,bignc=bign){
	let rre=lyapexpre(func,x,bignc);
	let iim=lyapexpim(func,x,bignc);
	if(rre<iim){let temp=iim;iim=rre;ree=temp;}
	//console.log(1+iim/mag(rre))
	if(iim<0)return 0;
	if(rre+iim<0)return add(1,iim/mag(rre));
	return add(2,add(iim,rre)/rre);
	return 999;
}
function lyapexpc(func,x,bignc=bign){
	let fi=math.complex(0);let xi=x;
	for(let i=0;i<bignc;i++)
	{	
	fi=add(fi,inftozero(log(derve1(func,xi,x))));
	xi = math.evaluate(func,{x:xi,c:x});
	}
	return div(fi,bignc);
}
function lyapexpim(func,x,bignc=bign){
	let fi=math.complex(0);let xi=x;
	for(let i=0;i<bignc;i++)
	{	
	fi=add(fi,inftozero(log(mag(im(derve1(func,xi,x))))));
	xi = math.evaluate(func,{x:xi,c:x});
	}
	return div(fi,bignc);
}
function lyapexpre(func,x,bignc=bign){
	let fi=math.complex(0);let xi=x;
	for(let i=0;i<bignc;i++)
	{	
	fi=add(fi,inftozero(log(mag(re(derve1(func,xi,x))))));
	xi = math.evaluate(func,{x:xi,c:x});
	}
	return div(fi,bignc);
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
function newtoninvf(func, y, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess; // Initial guess for the inverse
    for (let i = 0; i < maxIter; i++) {
        let f_x = func(x); // Evaluate the function at x
        let f_prime_x = derv(func, x); // Derivative of the function at x
        x = math.subtract(x, math.divide(math.subtract(f_x, y), f_prime_x));
        if (Math.abs(math.subtract(f_x, y)) < tolerance) {
            return x; } }
   return x;
}
function newtoninvff(func,funca, y, guess, tolerance = 1e-7, maxIter = bign) {
    let x = guess; // Initial guess for the inverse
    for (let i = 0; i < 3; i++) {
        let f_x = funca(x); // Evaluate the function at x
       let f_prime_x = derv(funca, x); // Derivative of the function at x
        x = math.subtract(x, math.divide(math.subtract(f_x, y), f_prime_x));
        if (Math.abs(math.subtract(f_x, y)) < tolerance) {
            return x; } }
for (let i = 0; i < maxIter/3; i++) {
        let f_x = func(x); // Evaluate the function at x
        let f_prime_x = derv(func, x); // Derivative of the function at x
        x = math.subtract(x, math.divide(math.subtract(f_x, y), f_prime_x));
        if (Math.abs(math.subtract(f_x, y)) < tolerance) {
            return x; } }
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






function getcontinuedfraction(x,n){
	let k=sub(x,floor(x))
	if(re(n)<=0)return floor(x);
	return getcontinuedfraction(div(1,k),sub(n,1))
}

function cutcontinuedfraction(x,n){
	let k=sub(x,floor(x))
	if(re(n)<=0)return x;
	return cutcontinuedfraction(div(1,k),sub(n,1))
}
function cutcontinuedfractionll(x,n){
	if(re(n)<=0)return x;
	return cutcontinuedfractionll(sub(div(1,k),floor(div(1,k))),sub(n,1))
}
function cutcontinuedfractionl(x,n){
	let k=sub(x,floor(x))
	if(re(n)<=0)return k;
	return cutcontinuedfractionl(div(1,k),sub(n,1))
}

function abelconj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
return math.evaluate(funcStr, {x:math.subtract(newtoninv(funcStr, bf, initialGuess, bignc), 1)});
}

function inverseabelconj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.add(1, newtoninv(funcStr, bf, initialGuess, bignc))});
}

function schroderconj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.divide(newtoninv(funcStr, bf, initialGuess, bignc), a)});
}

function inverseschroderconj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.multiply(a, newtoninv(funcStr, bf, initialGuess, bignc))});
}

function bottcherconj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.pow(newtoninv(funcStr, bf, initialGuess, bignc), math.divide(1, a))});
}

function inversebottcherconj(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    return math.evaluate(funcStr, {x:math.pow(newtoninv(funcStr, bf, initialGuess, bignc), a)});
}
function abeleq(funcStr, a, bf, initialGuess, globalc=2, bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return math.divide(math.log(schroder(funcStr, a, bf, globalc, bignc)), math.log(globalcd));
}

function inverseabeleq(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return invschroder(funcStr, a, math.pow(globalcd, bf), globalc, bignc);
}

function bottchereq(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return math.pow(globalcd, math.log(schroder(funcStr, a, bf, globalc, bignc)));
}

function inversebottchereq(funcStr, a, bf, initialGuess, globalc=2, bignc=bign) {
    const globalcd = numericalDerivative(funcStr, fix, 0.00001);
    return invschroder(funcStr, a, math.divide(math.log(bf), initialGuess, math.log(globalcd)), globalc, bignc);
}
function inverseschrodereq(funcStr, a, bf, initialGuess, globalc=2, bignc=bign, ffgh = 1) {
    let bs = bf;

    try {
        let fi = (bs);
        if (ffgh) {
            fi = (bs);
        } else {
            fi = bs;
        }
let fix = newtonfix(funcStr, add(bf,math.complex(0.2,0.2)));
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

function fastsuperfunction(funcStr, a, bf, globalc=2, bignc=bign, ffgh = 1) {
    let bs = bf;

    try {
        let fi = (bs);
        if (ffgh) {
            fi = (bs);
        } else {
            fi = (a);
        }
let fix = newtonfix(funcStr, add(bf,math.complex(0.2,0.2)));
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
function superfunction(funcStr, a, bf, initialGuess=1,globalc=2, bignc=bign, startq=-12341234, ffgh = 1) {
    let bs = bf;

    try {
        let fi = (bs);
        if (ffgh) {
            fi = (bs);
        } else {
            fi = (a);
        }
       let fix = 12;
if(startq!==-12341234)fix=add(startq,math.complex(1e-7,1e-7));else  fix = newtonfix(funcStr, add(bf,math.complex(0.2,0.2)));
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
function superfunctionqsp(funcStr, af, bf, globalc=2, bignc=bign, startq=-12341234) {
    let bp = math.complex(af);
    let ap = math.complex(bf);
    ap = math.subtract(ap, bignc);

    let fix = 12;
if(startq!==-12341234)fix=add(startq,math.complex(1e-7,1e-7));else fix = newtonfix(funcStr,add(bp,math.complex(0.2,0.2)));
    const d = derve(funcStr, fix);
    const dd = nthderiv(funcStr, fix, 2);

    let o = math.complex(af);
//superfunctionqsp("tetr(x)",1,x,i,1,-1.89)
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
function superfunctionosp(funcStr, af, bf, globalc=2, bignc=bign) {
    let bp = math.complex(af);
    let ap = math.complex(bf);
    ap = math.subtract(ap, bignc);

    let fix = newtonfix(funcStr, add(bp,math.complex(0.2,0.2)));

    const d = derve(funcStr, fix);

    let o = math.add(fix, math.multiply(math.subtract(bp, fix), math.pow(d, ap)));

    for (let i = 0; i < bignc; i++) {
        o = math.evaluate(funcStr, { x: o });
    }

    return o;
}

function kummerd(t,n){
	return div(pow(log(t),sub(n,1)),add(1,t));
}
function kummer(n,z){
	return integral(kummerd,0,z,n);
}
function kummerabsd(t,n){
	return div(pow(log(mag(t)),sub(n,1)),add(1,t));
}
function kummerabs(n,z){
	return integral(kummerabsd,0,z,n);
}
function kummersabsd(t,n){
	return div(pow(log(sabs(t)),sub(n,1)),add(1,t));
}
function kummersabs(n,z){
	return integral(kummersabsd,0,z,n);
}
function kummerrabsd(t,n){
	return div(pow(log(rabs(t)),sub(n,1)),add(1,t));
}
function kummerrabs(n,z){
	return integral(kummerrabsd,0,z,n);
}
function kummercabsd(t,n){
	return div(pow(log(cabs(t)),sub(n,1)),add(1,t));
}
function kummercabs(n,z){
	return integral(kummercabsd,0,z,n);
}

function maxcc(a,b){
	if(re(math.abs(a))>re(math.abs(b)))return a;
	return b;
}
function mincc(a,b){
	if(re(math.abs(a))<re(math.abs(b)))return a;
	return b;
}
function customexp1(func,x){
	let fi=math.complex(0,0)
	for(let i=1;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,div(pow(x,ii),factorial(ii)));}
	return fi;
}
function customexp(func,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,div(pow(x,ii),factorial(ii)));}
	return fi;
}


function primeexp(x){
	let fi=math.complex(0,0);for(let i=1;i<bign;i++){let ii=nthprime(i);
	fi=add(fi,div(pow(x,ii),factorial(ii)));}return fi;}
	
function compositeprime(x){
	return sub(1,primeexp(x));
}

function customsin(func,x){return div(sub(customexp(func,mul(math.complex(0,1),x)),customexp(func,mul(-1,math.complex(0,1),x))),math.complex(0,1),2)}
function customcos(func,x){return div(add(customexp(func,mul(math.complex(0,1),x)),customexp(func,mul(-1,math.complex(0,1),x))),2)}
function customtan(func,x){return div(customsin(func,x),customcos(func,x))}
function customcsc(func,x){return div(1,customsin(func,x))}
function customcot(func,x){return div(1,customtan(func,x))}
function customsec(func,x){return div(1,customcos(func,x))}

function customsinh(func,x){return div(sub(customexp(func,x),customexp(func,sub(0,x))),2)}
function customcosh(func,x){return div(add(customexp(func,x),customexp(func,sub(0,x))),2)}
function customtanh(func,x){let t=customexp(mul(2,x));return div(sub(t,1),add(t,1))}
function customcsch(func,x){return div(1,customsinh(func,x))}
function customcoth(func,x){return div(1,customtanh(func,x))}
function customsech(func,x){return div(1,customcosh(func,x))}

function generatingfunc(func,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,mul(pow(x,i),ii));}
	return fi;
}
function kapteynfunc(func,x,v=0){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,mul(besselj(add(v,i),mul(add(v,i),z)),ii));}
	return fi;
}
function generatingfunclist(A,x){
	let fi=math.complex(0,0)
	for(let i=0;i<leng(A);i++)
	{let ii=g(A,i);
	fi= add(fi,mul(pow(x,i),ii));}
	return fi;
}
function dirichletgeneratingfunc(func,x){
	let fi=math.complex(0,0)
	for(let i=1;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,div(ii,pow(i,x)));}
	return fi;
}
function lambertgeneratingfunc(func,x){
	let fi=math.complex(0,0)
	for(let i=1;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,mul(ii,div(pow(x,i),sub(1,pow(x,i)))));}
	return fi;
}
function hadamardproduct(func,gunc,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	let iii=math.evaluate(gunc,{x:x,n:i});
	fi= add(fi,mul(pow(x,i),ii,iii));}
	return fi;
}
function expgeneratingfunc(func,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,div(mul(pow(x,i),ii),factorial(i)));}
	return fi;
}
function poissongeneratingfunc(func,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,div(mul(pow(x,i),ii),factorial(i)));}
	return mul(fi,exp(sub(0,x)));
}
function geometricgeneratingfunc(func,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(fi,mul(ii,pow(x,i)));}
	return fi;
}
function bellgeneratingfunc(p,func,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:pow(p,n)});
	fi= add(fi,mul(ii,pow(x,i)));}
	return fi;
}

function bilateralztransform(func,x){
	let fi=math.complex(0,0)
	for(let i=-bign;i<=bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(mul(ii,pow(x,sub(0,i))));}
	return fi;
}
function unilateralztransform(func,x){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:i});
	fi= add(mul(ii,pow(x,sub(0,i))));}
	return fi;
}
function modifiedztransform(func,t,z,m){
	let fi=math.complex(0,0)
	for(let i=0;i<bign;i++)
	{let ii=math.evaluate(func,{x:x,n:add(mul(i,t),m)});
	fi= add(mul(ii,pow(x,sub(0,i))));}
	return fi;
}
function zaktransform(func,a,t,w){
	let fi=math.complex(0,0)
	for(let i=-bign;i<=bign;i++)
	{let ii=math.evaluate(func,{x:x,n:add(mul(a,t),mul(a,i))});
	fi= add(fi,mul(ii,exp(mul(-2,pi(),k,w,math.complex(0,1)))));}
	return mul(sqrt(a),fi);
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
function dervee(func,input){
return math.complex(re(((div(sub(math.evaluate(func, { x: add(input,1e-7) }),math.evaluate(func, { x: input })),1e-7)))),im((((div(sub(math.evaluate(func, { x: add(input,mul(I,1e-7)) }),math.evaluate(func, { x: input })),mul(I,1e-7)))))));
}
function qderve(func,input,q){
return ((div(sub(math.evaluate(func, { x: mul(input,q),q:q  }),math.evaluate(func, { x: input,q:q  })),sub(mul(q,input),input))));
}
function pqderve(func,input,q,p){
return ((div(sub(math.evaluate(func, { x: mul(input,p),q:q,p:p  }),math.evaluate(func, { x: mul(input,q) ,q:q,p:p  })),mul(sub(p,q),input))));
}
function qwderve(func,input,q,w){
return ((div(sub(math.evaluate(func, { x: add(mul(input,q),w),q:q,w:w  }),math.evaluate(func, { x: input,q:q,w:w  })),add(mul(sub(q,1),input),w))));
}
function derve1(func,input,c){
return ((div(sub(math.evaluate(func, { x: add(input,1e-7),c:c }),math.evaluate(func, { x: input,c:c })),1e-7)));
}
function qderve1(func,input,q,c){
return ((div(sub(math.evaluate(func, { x: mul(input,q),c:c,q:q }),math.evaluate(func, { x: input,c:c,q:q  })),sub(mul(q,input),input))));
}
function hderve(func,input,h){
return div(sub(math.evaluate(func, { x:add(input,h),h:h }),math.evaluate(func, { x:input,h:h })),h);
}
function qhderve(func,input,h,q){
return div(sub(math.evaluate(func, { x: mul(q,add(input,h)),h:h,q:q  }),math.evaluate(func, { x: input,h:h,q:q  })),add(mul(sub(q,1),input),mul(q,h)));
}

function qdiffe(func,input,q){return sub(math.evaluate(func, { x: mul(input,q),q:q  }),math.evaluate(func, { x: input,q:q  }))}
function hdiffe(func,input,h){return sub(math.evaluate(func, { x: add(input,h),h:h  }),math.evaluate(func, { x: input,h:h  }))}
function qhdiffe(func,input,q,h){return sub(math.evaluate(func, { x: mul(q,add(input,h)),h:h,q:q  }),math.evaluate(func, { x: input,h:h,q:q  }))}


function qintegral(func,q,b,a=0,N=bign){
	let fi=math.complex(0,0);
	for(let i=0;i<N;i++)
	{
	let xx=add(mul(pow(q,i),a),mul(sub(1,pow(q,i)),b));
	fi=add(fi,mul(pow(q,i),math.evaluate(func,{x:xx,q:q})))
	}
	return mul(sub(1,q),sub(b,a),fi);
}
function hintegral(func,h,a,b,x,N=bign){
	let fi=math.complex(0,0);
	let g = div(sub(b,a),N);
	for(let i=0;i<N;i++)
	{
	let xx=add(a,mul(g,i));

	fi=add(fi,mul(hdiffe(func,xx,h),math.evaluate(func,{x:xx,h:h})))
	}
return fi;	
}
function qhintegral(func,q,h,b,a=0,N=bign){
	let fi=math.complex(0,0);
	for(let i=0;i<N;i++)
	{
	let xx=add(mul(pow(q,i),a),mul(sub(1,pow(q,i)),b),mul(i,pow(q,i),h));
	fi=add(fi,mul(pow(q,i),math.evaluate(func,{x:xx,q:q})))
	}
	return mul(add(mul(sub(1,q),sub(b,a)),mul(q,h)),fi);
}


function zconj(func,input){
if (math.complex(input).im<0)return conj(func(conj(input)));return func(input);
}
function yconj(func,input){
if (math.complex(input).im>0)return conj(func(conj(input)));return func(input);
}
function conjz(func,input){
if (math.complex(input).im<0)return conj(math.evaluate(func, { x: conj(input) }));return math.evaluate(func, { x: input });
}
function conjy(func,input){
if (math.complex(input).im>0)return conj(math.evaluate(func, { x: conj(input) }));return math.evaluate(func, { x: input });
}
function intg(func,input){
return integral(func,0,input);

}
function intg(func,input,input2){
return integral(func,0,input,input2);

}
function nthderiv(func,input,n){
	if(n==0)return math.evaluate(func,{x:input});
	const h=pow(10,add(-7,div(n,1.2)));
let fi=math.complex(0,0);
for(let i=0;i<=n;i++)
//fi = add(fi,mul(pow(-1,i),ncr(n,i),math.evaluate(func,{x:sub(add(input,div(n,2)),mul(h,i))})));	
fi=add(fi,mul(pow(-1,i),ncr(n,i),math.evaluate(func,{x:add(input,mul(sub(div(n,2),i),h))})))
return div(fi,pow(h,n));
return fi;
}
function nthderivf(func,input,n){
	const h=pow(10,add(-7,div(n,1.2)));
let fi=math.complex(0,0);
for(let i=0;i<=n;i++)
//fi = add(fi,mul(pow(-1,i),ncr(n,i),math.evaluate(func,{x:sub(add(input,div(n,2)),mul(h,i))})));	
fi=add(fi,mul(pow(-1,i),ncr(n,i),func(add(input,mul(sub(div(n,2),i),h)))))
return div(fi,pow(h,n));
return fi;
}
function evaltaylor(func, z, z0=0, terms = bign/2) {
      let result = math.complex(0, 0);
    let diff = math.subtract(z, z0);
    
    for (let n = 0; n < terms; n++) {
        // Calculate the n-th derivative at z0
        let nth_derivative = nthderiv(func, z0, n);
        
        // Calculate the term: (nth_derivative / n!) * (diff ^ n)
        let term = math.divide(nth_derivative, factorial(n));
        term = math.multiply(term, math.pow(diff, n));
        
        // Add the term to the result
        result = math.add(result, term);
    }
    
    return result;
}function getcoef(func, n, z0=0 ) {
        let nth_derivative = nthderiv(func, z0, n);
        return  math.divide(nth_derivative, factorial(n));
}
function getcoefff(func, n, z0=0 ,a=0,chur=4) {
        let nth_derivative = fractionalderiv(func, z0, n,a,chur);
        return  math.divide(nth_derivative, factorial(n));
}
function getcoeff(func, n, z0=0 ) {
        let nth_derivative = nthderivf(func, z0, n);
        return  math.divide(nth_derivative, 1);
}
function gettaylor(func, n, z0=0 ) {
        let nth_derivative = nthderiv(func, z0, n);
        return  nth_derivative;
}
function gettaylorseries(func, z0=0 ) {
	let res = [0,0,0,0,0,0,0,0,0]
    for (let i=0;i<9;i++) res[i]=nthderiv(func, z0, i);
        return  res ;
}
function getcoefseries(func, z0=0 ) {
	let res = [0,0,0,0,0,0,0,0,0]
    for (let i=0;i<9;i++) res[i]=div(nthderiv(func, z0, i),factorial(i));
        return  res ;
}
function gettaylorff(func, n, z0=0 ,a=0,chur=4) {
        let nth_derivative = fractionalderiv(func, z0, n,a,chur);
        return  nth_derivative;
}
function gettaylorf(func, n, z0=0 ) {
        let nth_derivative = nthderivf(func, z0, n);
        return  nth_derivative;
}
function evalanalytic(func, z, z0=0,terms = bign/2) {
    let steps = terms;
    let delta = math.divide(math.subtract(z, z0), steps);
    let points = Array.from({ length: steps + 2 }, (_, i) =>
        math.add(z0, math.multiply(i, delta) )
    );

    // Start with the initial point
    let result = z0;

    // Successively apply evaltaylor along each intermediate point
    for (let i = 0; i <= steps; i++) {
        result = evaltaylor(func, points[i+1], points[i], terms);
    }

    return result;
}
function rmod(x,n){return math.complex(math.mod(x.re,n),x.im);}
function rfloor(x,n){return math.complex(math.floor(x.re,n),x.im);}

function fractionalderiv(func,input,n,a=0,chur=4){
//let chur = math.max(1,math.ceil(math.complex(n).re));
if(Number.isInteger(n) && n>=0)return nthderiv(func,input,n);
	let nn = math.complex(chur-math.complex(n).re,-math.complex(n).im);
let s="fractionalintg(\""+func+"\",x,"+nn+","+a+")";
//console.log(s);
//console.log(math.ceil(math.complex(n).re));
return nthderiv(s,input,chur);
}
function fractionalintg(func,input,mk,a=0){
	if(mk==0)return math.evaluate(func,{x:input});
	let m=mk;
	       function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);let sum = math.complex(0,0);      for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0),pow(sub(input,add(a, mul(math.complex(i,0), h))),sub(m,1)),math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));} for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0),pow(sub(input,add(a, mul(math.complex(i,0), h))),sub(m,1)) , math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));}      
        return mul(div(h, math.complex(3,0)), sum);}
 //   return div(simpsonsRule(0,input,bign),1);
	return div(simpsonsRule(a,input,bign),factorial(sub(m,1)));
}
/*function fractionalintg(func,input,mk){
	let m=sub(0.01,mk);
	 let fi=math.complex(0,0);
	 for(let i=0;i<bign;i++){
		let h=div(1,bign);
	let xi = mul(h,i,input);		
		 fi=add(fi,mul(mul(pow(sub(input,xi),sub(m,1)),math.evaluate(func,{x:xi})),h))
	 }
	 return fi;
	 return div(fi,gamma(m))
}*//*
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
}*/
	   function intge(func,input){
    function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);let sum = math.complex(0,0);      for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0), math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));} for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0), math.evaluate(func, { x:add(a, mul(math.complex(i,0), h))})));}      
        return mul(div(h, math.complex(3,0)), sum);}
          return simpsonsRule(math.complex(0,0),input, bign);
       }
	   function qintegral(func,x,q){
		   let fi=math.complex(0);
		   for(let i=0;i<bign;i++)fi=add(fi,mul(x,pow(q,i),math.evaluate(func,{x:mul(x,pow(q,i))})));
		   return mul(sub(1,q),fi)
	   }
function ramanujansum(func,input)
{
	    function simpsonsRule(a, b, n) {
        const h = div(sub(b, a), n);let sum = math.complex(0,0);      for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0), math.evaluate(func, { n:add(a, mul(math.complex(i,0), h)),x:input})));} for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0), math.evaluate(func, { n:add(a, mul(math.complex(i,0), h)),x:input})));}      
        return mul(div(h, math.complex(3,0)), sum);}
		
	let fi= sub(0,simpsonsRule(math.complex(1,0),bign, bign*bign));
	
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



function tau(x){return disctau(mul(2,x))}
function TAU(x){return disctau(mul(2,x))}
function tauu(x){return disctau(mul(2,x))}
function atu(x){return div(log(x),2,I,pi())}
function disctau(x){return exp(mul(I,pi(),x))}
function discatu(x){return div(log(x),I,pi())}

function dedekindtheta(func,z,even0odd1=0){
	let fi=math.complex(0,0);for(let i=1;i<bign;i++)fi=add(fi,mul(math.evaluate(func,{x:i,z:z}),pow(i,even0odd1),pow(z,pow(i,2))));return fi;
}
function dedekindepsilon(a,b,c,d,z=I){return div(dedekindeta(div(add(mul(a,z),b),add(mul(c,z),d))),dedekindeta(z),pow(add(mul(c,z),d),0.5))}









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
	function scorergi(x){return div(integral(scorergid,0,sqrt(bign),x,mul(bign,2)),sub(0,pi()));}
	function scorerhi(x){return div(integral(scorerhid,0,sqrt(bign),x,mul(bign,2)),pi());}
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

function airyfockv(x){return div(mul(sqrt(pi()),ai(x)),2)}
function airyfockw1(x){return mul(exp(mul(I,pi(),div(1,6))),2,airyfockv(mul(x,pow(2,mul(I,eulerc(),pi(),div(1,3))))))}
function airyfockw2(x){return mul(exp(mul(I,pi(),div(-1,6))),2,airyfockv(div(x,pow(2,mul(I,eulerc(),pi(),div(1,3))))))}

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
	fi=mul(fi,qpochhammer(g(A,i),q,n));	
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
	fi=mul(fi,modifiedjacobitheta(g(X,i),p));
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



function askeywilsonpolyt(n,x,a,b,c,d,q){
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
function gsum(A) {
   	let fi=math.complex(0,0);
	for(let i=0;i<leng(A);i++){
	fi = add(fi,g(A,i));}
return fi;
}
function glogfactorialsum(A) {
   	let fi=math.complex(0,0);
	for(let i=0;i<leng(A);i++){
	fi = add(fi,log(factorial(g(A,i))));}
return fi;
}

function glogsum(A) {
   	let fi=math.complex(0,0);
	for(let i=0;i<leng(A);i++){
	fi = add(fi,log(g(A,i)));}
return fi;
}
function gmul(A) {
   	let fi=math.complex(1,0);
	for(let i=0;i<leng(A);i++){
	fi = mul(fi,g(A,i));}
return fi;
}
function g(A, n ,w=0) {
	if(leng(A)<=n)return 0;
    try {
        if (A._data !== undefined) {
			if(A._data[n]!== undefined)
				return A._data[n];
			return w;
		}
        if(A[n]!== undefined)
				return A[n];
			return w;
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
function mulp(A, B) {
    let result = Array(leng(A) + leng(B) - 1).fill(math.complex(0, 0));
    for (let i = 0; i < leng(A); i++) {
        for (let j = 0; j < leng(B); j++) {
            result[i + j] = add(result[i + j], mul(g(A, i), g(B, j)));
        }
    }
    return result;
}

// Adds two polynomials represented as arrays
function addp(A, B) {
    let maxLength = Math.max(leng(A), leng(B));
    let result = Array(maxLength).fill(math.complex(0, 0));
    for (let i = 0; i < maxLength; i++) {
        result[i] = add(g(A, i), g(B, i));
    }
    return result;
}

// Subtracts polynomial B from polynomial A
function subp(A, B) {
    let maxLength = Math.max(leng(A), leng(B));
    let result = Array(maxLength).fill(math.complex(0, 0));
    for (let i = 0; i < maxLength; i++) {
        result[i] = sub(g(A, i), g(B, i));
    }
    return result;
}

function divp(A, B) {
    let quotient = [];
    let remainder = [...A];
    while (leng(remainder) >= leng(B)) {
        let coeff = div(g(remainder, leng(remainder) - 1), g(B, leng(B) - 1));
        let degreeDiff = leng(remainder) - leng(B);
        let term = Array(degreeDiff + 1).fill(math.complex(0, 0));
        term[degreeDiff] = coeff;
        quotient = addp(quotient, term);
        remainder = subp(remainder, mulp(term, B));
    }
    return  quotient;
}

function remp(A, B) {
    let quotient = [];
    let remainder = [...A];
    while (leng(remainder) >= leng(B)) {
        let coeff = div(g(remainder, leng(remainder) - 1), g(B, leng(B) - 1));
        let degreeDiff = leng(remainder) - leng(B);
        let term = Array(degreeDiff + 1).fill(math.complex(0, 0));
        term[degreeDiff] = coeff;
        quotient = addp(quotient, term);
        remainder = subp(remainder, mulp(term, B));
    }
    return  remainder;
}


function dervep(A) {
    if (leng(A) <= 1) return [math.complex(0, 0)];
    let result = [];
    for (let i = 1; i < leng(A); i++) {
        result.push(mul(math.complex(i, 0), g(A, i)));
   // console.log(g(A, i));
	}
	
    return result;
}

function intgep(A) {
    let result = [math.complex(0, 0)];
    for (let i = 0; i < leng(A); i++) {
        result.push(div(g(A, i), math.complex(i + 1, 0)));
    }
    return result;
}
function smallestnegativeinteger(A, fail) {
  if (A.length === 0) {
    return fail; // Handle empty array case
  }

  let smallestMagnitude = Infinity;
  let smallestNumber = fail; // Initialize with fail value

  for (let i = 0; i < A.length; i++) {
    if (Number.isInteger(A[i]) && A[i] < 0 && Math.abs(A[i]) < smallestMagnitude) {
      smallestMagnitude = Math.abs(A[i]);
      smallestNumber = A[i];
    }
  }

  return smallestNumber;
}
function hypergeometric(A,B,x){
	
	if(leng(A)==2 && leng(B)==1 && (mag(x)>1) )return hypg21(g(A,0),g(A,1),g(B,0),x);
	const lim = minc(bign,-smallestnegativeinteger(A,-bign));
	let fi=math.complex(0,0);
	for(let n=0;n<=lim;n++){
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
function hypergeometricqpqw(A,B,x,ww=0){
	//hypergeometricqpqw([0.2,2,2],[0.3,5],x,2/x^2)
	let w=ww;if (w==0){w=ceiling(mag(w))+1;}const z=div(x,w)
	let fi=math.complex(0,0);const a1=g(A,0);
	for(let k=0;k<bign;k++){
	let hyg=math.complex(0,0);
	
	for(let n=0;n<bign;n++){
	let nom=pow(w,n);

	nom=mul(nom,pochhammer(-k,n));
//		console.log(nom);
		for(let i=1;i<leng(A);i++)
			nom=mul(nom,pochhammer(g(A,i),n));
	let denom=facti(n);
	
		for(let i=0;i<leng(B);i++)
			denom=mul(denom,pochhammer(g(B,i),n));
	hyg=add(hyg,div(nom,denom));
	}
	
	fi=add(fi,mul(div(pochhammer(a1,k),factorial(k)),hyg,pow(div(z,sub(z,1)),k)));
	}
	return div(fi,pow(1,z))
}
function hypg00(c=1){return hypergeometric([],[],c);}
function hypg10(a,c=1){return hypergeometric([a],[],c);}
function hypg01(b,c=1){return hypergeometric([],[b],c);}
function hypg02(b,bb,c=1){return hypergeometric([],[b,bb],c);}
function hypg03(b,bb,bbb,c=1){return hypergeometric([],[b,bb,bbb],c);}
function hypg11(a,b,c=1){return hypergeometric([a],[b],c);}
function hypg21(a,b,c,z=1){
b = add(b,1e-7);
c = add(b,-1e-7);
	if (mag(z)<1)return hypergeometric([a,b],[c],z);
	let fi=math.complex(0,0);
	for(let k=0;k<bign;k++)
	fi=add(fi,div(mul(pochhammer(a,k),pochhammer(sub(a,c,-1),k),pow(z,sub(0,k))),factorial(k),pochhammer(sub(a,b,-1),k)))
	fi=div(mul(fi,gamma(sub(b,a)),gamma(c),pow(sub(0,z),sub(0,a))),gamma(b),gamma(sub(c,a)));
	let gi=math.complex(0,0);
	for(let k=0;k<bign;k++)
	gi=add(gi,div(mul(pochhammer(b,k),pochhammer(sub(b,c,-1),k),pow(z,sub(0,k))),factorial(k),pochhammer(sub(b,a,-1),k)))
	gi=div(mul(gi,gamma(sub(a,b)),gamma(c),pow(sub(0,z),sub(0,b))),gamma(a),gamma(sub(c,b)));
	return add(fi,gi);
}
function hypg12(a,b,bb,c=1){return hypergeometric([a],[b,bb],c);}

function hypg20(a,aa,c=1){return hypergeometric([a,aa],[],c);}
function hypg22(a,aa,b,bb,c=1){return hypergeometric([a,aa],[b,b],c);}
function hypg30(a,aa,aaa,c=1){return hypergeometric([a,aa,aaa],[],c);}
function hypg32(a,aa,aaa,b,bb,bbb,c=1){return hypergeometric([a,aa,aaa],[b,bb,bbb],c);}

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

function rogersramanujang(q){return div(1,mul(infqpochhammer(q,pow(q,5)),infqpochhammer(pow(q,4),pow(q,5))))}
function rogersramanujanh(q){return div(1,mul(infqpochhammer(pow(q,2),pow(q,5)),infqpochhammer(pow(q,3),pow(q,5))))}
function rogersramanujanr(q){return div(mul(pow(q,div(11,66)),rogersramanujanh(q)),pow(q,div(-1,60)),rogersramanujang(q))}
function rogersramanujans(q){return div(rogersramanujanr(pow(q,4)),rogersramanujanr(pow(q,2)),rogersramanujanr(q))}

function tangentialsum(a,b){return div(add(a,b),sub(1,mul(a,b)))}
function tangentialsub(a,b){return div(sub(a,b),add(1,mul(a,b)))}
function tangentialmul(a,b){return tan(mul(atan(a),atan(b)))}
function tangentialdiv(a,b){return tan(div(atan(a),atan(b)))}
function tangentialpow(a,b){return tan(pow(atan(a),atan(b)))}

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
}/*
function qhypg21d(s,A){
	const a = g(A,0); 
	const b = g(A,1); 
	const c = g(A,2); 
	const q = g(A,3); 
	const z = g(A,4); 
	return div(mul(qpocinf(mul(q,pow(q,s)),q),qpocinf(mul(c,pow(q,s)),q),pi(),pow(sub(0,z),s)),qpocinf(mul(a,pow(q,s)),q),qpocinf(mul(b,pow(q,s)),q),sin(mul(pi(),s)))
}
function qhypg21(a,b,c,q,z){
	return div(mul(integral(qhypg21d,mul(-1,I,sqrt(bign)),mul(1.01,I,sqrt(bign)),[a,b,c,q,z]),-1,qpochinf(a,q),qpocinf(b,q)),qpochinf(q,q),qpocinf(c,q),2,pi(),I)
}*/
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
function meijergalt(z,A,B,m,n,p=leng(A),q=leng(B),r=1){
	let E = [];let F = [];let G = [];let H = [];
	for(let i=0;i<n;i++)E.push(g(A,i));
	for(let i=n;i<p;i++)F.push(g(A,i));
	for(let i=0;i<m;i++)G.push(g(B,i));
	for(let i=m;i<q;i++)H.push(g(B,i));
	return meijerg(E,F,G,H,z,r);
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
function generalizedfoxi(z,iA,iB,m=0,n=0){// I-Function in triplets
//generalizedfoxi(x,[[0.1,0.2,0.4],[0.7,1.1,1.6]],[[2.2,2.9,3.7],[4.6,5.6,6.7]],1,1)

	const p = leng(g(iA,0));
    const q = leng(g(iB,0));

    let Al = Array.from({ length: p }, () => Array(n).fill(0));
    let Bl = Array.from({ length: p }, () => Array(leng(iA) - n).fill(0));
    let Cl = Array.from({ length: q }, () => Array(m).fill(0));
    let Dl = Array.from({ length: q }, () => Array(leng(iB) - m).fill(0));
    
    
      for (let j = 0; j < p; j++) {for (let i = 0; i < n; i++) {Al[j][i] = g(g(iA, i), j);}}
    for (let j = 0; j < p; j++) {for (let i = n; i < leng(iA); i++) {Bl[j][i - n] = g(g(iA, i), j);}}
    for (let j = 0; j < q; j++) {for (let i = 0; i < m; i++) {Cl[j][i] = g(g(iB, i), j);}}
    for (let j = 0; j < q; j++) {for (let i = m; i < leng(iB); i++) {Dl[j][i - m] = g(g(iB, i), j);}}
			
let fi = math.complex(0,0);
let A = g(Al,0);let Ag = g(Al,1,1);let Ac = g(Al,2,1);
let B = g(Bl,0);let Bg = g(Bl,1,1);let Bc = g(Bl,2,1);
let C = g(Cl,0);let Cg = g(Cl,1,1);let Cc = g(Cl,2,1);
let D = g(Dl,0);let Dg = g(Dl,1,1);let Dc = g(Dl,2,1);


//console.log(Cl);

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
/*
function generalizedfoxhi(A,AA,B,BB,z){// I-Function alt
// in triplets 
//[[,,],[,,]],[[,,],[,,]],[[,,],[,,]],[[,,],[,,]]
//[],[],[[,,]],[]
let fi = math.complex(0,0);
for(let r=0;r<bign;r++)
for(let h=0;h<leng(B);h++){
	let Bh =div(add(r,g(g(B,h),)),g(B,h,1))
	let num = 1;//div(mul(pow(z,Bh),pow(-1,r)),mul(factorial(r),g(Cg,h)));
	for(let i=0;i<leng(A);i++)         num=mul(num,pow(gamma(sub(g(g(A,i),1),div(,),-1)),g(g(A,i),2,1)));
	for(let i=0;i<leng(AA);i++)        num=div(num,);
	for(let i=0;i<leng(B);i++)if(i!=h) num=mul(num,);
	for(let i=0;i<leng(BB);i++)        num=div(num,);
	fi=math.add(fi,inftozero(num));
}
return fi;
}*/


function barneszeta(s,w,A){//barneszeta(x,2,[1,2,3])
	let N = leng(A);
	let G = new Array(N);
	let fi=math.complex(0,0);
	for(let k=0;k<pow(bign,N);k++){
		let GGG=k;
		for(let i=0;i<N;i++){
		G[i]=math.mod(GGG,bign);
		GGG=floor(GGG/bign);
		}
	//	console.log(G);
		
	let den=math.complex(0,0);
		for(let i=0;i<N;i++){
			den=add(den,mul(g(A,i),g(G,i)));
		}
		fi=add(fi,div(1,pow(add(w,den),s)));
	}
	return fi;
}

function barneszetao(s,w,A){//barneszeta(x,2,[1,2,3])
	let N = leng(A);
	let G = new Array(N);
	let fi=math.complex(0,0);
	for(let k=0;k<pow(bign,N);k++){
		let GGG=k;
		for(let i=0;i<N;i++){
		G[i]=add(math.mod(GGG,bign),1);
		GGG=floor(GGG/bign);
		}
	//	console.log(G);
		
	let den=math.complex(0,0);
		for(let i=0;i<N;i++){
			den=add(den,mul(g(A,i),g(G,i)));
		}
		fi=add(fi,div(1,pow(add(w,den),s)));
	}
	return fi;
}

function multiplegamma(w,A){
	bign /=3;
	const fi= exp(div(sub(barneszeta(0.01,w,A),pow(bign,leng(A))),0.01));
	bign*=3;
	return fi;
}


function doublegammad(t,A){
	const b=g(A,0);
	const w=g(A,1);
	const q=add(b,div(1,b));
	return div(sub(div(sub(exp(mul(-1,w,t)),exp(mul(-0.5,q,t))),sub(1,exp(mul(-1,b,t))),sub(1,exp(mul(-1,t,pow(b,-1))))),div(div(sqr(sub(div(q,2),w)),2),exp(t)),div(sub(div(q,2),w),t)),t);
}
function doubleloggamma(b,w){
	return integral(doublegammad,0.01/bign,sqrt(bign)*1.5,[b,w]);
}

/*function doublegammamove(b,w,a){
	let m = div(a,b);
	return mul(doublegamma(b,w),pow(div(pow(b,sub(mul(b,w),0.5)),gamma(mul(b,w))),m));
}*/

function doublegamma(b,w,n=5){//doublegammamove
	if(n==0 || re(w)>0)return doublegammaa(b,w);
let fi=add(w,b);
	fi= div(mul(pow(b,sub(mul(b,w),0.5)),sqrt(mul(2,pi()))),gamma(mul(b,w)));
return div(doublegamma(b,add(w,b),n-1),fi);
}
function singlegamma(w,a){return div(mul(pow(a,sub(div(w,a),0.5)),gamma(div(w,a))),sqrt(mul(2,pi())))}
function doublegammaa(b,w){return exp(doubleloggamma(b,w));}
function doublesin(b,w){const q=add(b,div(1,b));return div(doublegamma(b,w),doublegamma(b,sub(q,w)))}
function doubleupsilon(b,w){const q=add(b,div(1,b));return div(1,doublegamma(b,w),doublegamma(b,sub(q,w)))}

function shintanizeta(s,w,A){//shintanizeta(x,2,[[1,2],[2,3],[4,5]])
	let N = leng(A);
	let G = new Array(N);
	let fi=math.complex(0,0);
	for(let k=0;k<pow(bign,N);k++){
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
	for(let k=0;k<pow(bign,N);k++){
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
	let gsm = math.complex(0,0);
	for(let GG=0;GG<pow(bign,v);GG++){
		let GGG=GG;
		for(let mm=0;mm<v;mm++){
		G[mm]=math.mod(GGG,bign);
		gsm=add(gsm,g(G,mm));
		GGG=floor(GGG/bign);
	}
	//console.log(getm(0));
	for(let gg=0;gg<=R;gg++){
		let ggg=gg;
	for(let mm=0;mm<v;mm++){
		qg[mm]=math.mod(ggg,getm(mm));
		eta[mm]=div(add(g(g(g(D,mm),0),g(qg,mm)),g(G,mm)),g(g(g(D,mm),1),g(qg,mm)));
		ggg=floor(ggg/getm(ggg));
	}
	
	

		let nom=pow(-1,gsm);
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
		//console.log(xitop);
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
function exponentialbellpoly(n,k,X){

	let N = leng(X);
	let G = new Array(N);
	let fi=math.complex(0,0);
	for(let kk=0;kk<pow(k+1,N);kk++){
		let GGG=kk;
		let sum=0;let summ=0;
		for(let i=0;i<N;i++){
		G[i]=math.mod(GGG,k+1);
		GGG=floor(GGG/(k+1));
		sum=add(sum,G[i]);
		summ=add(summ,mul(add(i,1),G[i]));
		}
	
	//console.log(G);
	
	if(sum==k && summ==n){
		let den=math.complex(1,0);
		for(let i=0;i<N;i++){
			den=mul(den,div(pow(g(X,i),G[i]),pow(factorial(add(i,1)),G[i]),factorial(G[i])));
		}
		fi=add(fi,den);
	}}
	return mul(factorial(n),fi);
}
function ordinarybellpoly(n,k,X){
//let n = leng(X);
	let N = leng(X);
	let G = new Array(sub(n,k,-1));
	let fi=math.complex(0,0);
	for(let kk=0;kk<(mul(sub(n,k,-2),sub(n,k,-2)));kk++){
		let GGG=kk;
		let sum=0;let summ=0;
		for(let i=0;i<sub(n,k,-1);i++){
		G[i]=math.mod(GGG,sub(n,k,-2));
		GGG=floor(GGG/sub(n,k,-2));
		if(i<sub(n,k,-1)){
		sum=add(sum,G[i]);
		summ=add(summ,mul(add(i,1),G[i]));}
		}
	//	console.log(G);
	//	if(sum==k && summ==n)
	let den=math.complex(1,0);
	if(sum==k && summ==n){
		for(let i=0;i<sub(n,k,-1);i++){
			den=mul(den,div(pow(g(X,i),G[i]),factorial(G[i])));
		}
		fi=add(fi,den);
}}
	return mul(factorial(k),fi);
}

function multinomial(n,R){
	fi=factorial(n);
	for(let i=0;i<leng(R);i++)
	fi=div(fi,factorial(g(R,i)));
return fi;
}
function rcomplexion(n,p){//https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)
	return div(factorial(add(n,p,-1)),factorial(p),factorial(sub(n,1)));
}
function weakcomposition(n,k)
{return ncr(add(n,k,-1),n)}

function completeexponentialbellpoly(X){
let fi=math.complex(0,0);
for(let i=1;i<=leng(X);i++)
fi=add(fi,exponentialbellpoly(i,X));
return fi
}
function completenexponentialbellpoly(n,X){
let fi=math.complex(0,0);
for(let i=1;i<=n;i++)
fi=add(fi,exponentialbellpoly(i,X));
return fi
}

function repeatedselectrion(n,r){
	return ncr(add(n,r,-1),r);
}
function orderedbellcc(n){
let fi=math.complex(0,0);
for(let i=0;i<=bign;i++)
fi=add(fi,div(pow(i,n),pow(2,i)));
return div(fi,2);	
}
function orderedbell(n){
return gettaylorff("1/(2-e^x)",n);
}
function bellnum(n){
	let m=n;
	if(math.complex(m).im<0)n=conj(n);
	let fi=math.complex(0,0);
	for(let k=0;k<bign;k++)
	fi=add(fi,div(pow(k,n),factorial(k)));
	if(math.complex(m).im<0)
	return conj(div(fi,eulerc()));
	return div(fi,eulerc());
}

function dobinski(n,l){
	let m=n;
	if(math.complex(m).im<0)n=conj(n);
	let fi=math.complex(0,0);
	for(let k=0;k<bign;k++)
	fi=add(fi,div(mul(pow(k,n),pow(l,k)),factorial(k)));
	if(math.complex(m).im<0)
	return conj(div(fi,pow(eulerc(),l)));
	return div(fi,eulerc());
}

function belllambda(x){
	return div(x,lambertw(x));
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



function saalschutz(a,b,c,n){
	return div(mul(pochhammer(sub(c,a),n),pochhammer(sub(c,b),n)),pochhammer(c,n),pochhammer(sub(c,a,b),n))
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
function apellf1d(t,A){
const a=g(A,0);	
	const b1=g(A,1);
	const b2=g(A,2);
	const c=g(A,3);
	const x=g(A,4);
	const y=g(A,5);
	return mul(pow(t,sub(a,1)),pow(sub(1,t),sub(c,a,1)),pow(sub(1,mul(x,t)),sub(0,b1)),pow(sub(1,mul(y,t)),sub(0,b2)))
}
function apellf1i(a,b,bb,c,x,y){
	return mul(div(gamma(c),gamma(a),gamma(sub(c,a))),integral(apellf1d,0,1,[a,b,bb,c,x,y]));
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


 

function lauricellad(a,b,bb,bbb,c,x,y,z){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)for(let k=0;k<bign;k++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,add(m,n,k)),pochhammer(b,m),pochhammer(bb,n),pochhammer(bbb,k)),mul(pochhammer(c,add(m,n,k)),factorial(m),factorial(n),factorial(k))),mul(pow(x,m),pow(y,n),pow(z,k)))));
return fi;
}
function lauricellaa(a,b,bb,bbv,c,cc,ccc,x,y,z){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)for(let k=0;k<bign;k++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,add(m,n,k)),pochhammer(b,m),pochhammer(bb,n),pochhammer(bbb,k)),mul(pochhammer(c,m),pochhammer(cc,n),pochhammer(ccc,k),factorial(m),factorial(n),factorial(k))),mul(pow(x,m),pow(y,n),pow(z,k)))));
return fi;
}
function lauricellab(a,aa,aaa,b,bb,bbb,c,x,y,z){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)for(let k=0;k<bign;k++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,m),pochhammer(aa,n),pochhammer(aaa,k),pochhammer(b,m),pochhammer(bb,n),pochhammer(bbb,k)),mul(pochhammer(c,add(m,n)),factorial(m),factorial(n),factorial(k))),mul(pow(x,m),pow(y,n),pow(z,k)))));
return fi;
}
function lauricellac(a,b,c,ccc,x,y,z){
	fi=math.complex(0);
	for(let m=0;m<bign;m++)for(let n=0;n<bign;n++)for(let k=0;k<bign;k++)
	fi=add(fi,inftozero(mul(div(mul(pochhammer(a,add(m,n,k)),pochhammer(b,add(m,n,k))),mul(pochhammer(c,m),pochhammer(cc,n),pochhammer(ccc,k),factorial(m),factorial(n),factorial(k))),mul(pow(x,m),pow(y,n),pow(z,k)))));
return fi;
}

//ADD GENERALZİE LAURİCALLE

 



function hahnrho(x,a,b,n){
	return div(mul(ncr(add(a,x),x),ncr(sub(add(b,n),1,x),sub(n,1,x))),ncr(add(n,a,b),sub(n,1)));
}

function hahnpi(nn,a,b,n){
	return div(mul(ncr(sub(nn,1),n),div(add(n,n,a,b,1),add(a,b,1)),div(mul(factorial(b),factorial(add(n,a)),factorial(add(n,a,b))),factorial(a),factorial(add(a,b)),factorial(add(b,n)),factorial(n))),ncr(add(nn,a,b,n),n));
}

function hanhpoly(n,a,b,x,m){
	return divide(mul(pow(-1,n),pochhammer(sub(m,x,n),n),pochhammer(add(b,x,1),n),hypergeometric([sub(0,n),sub(0,x),sub(add(a,m),x)],[sub(m,x,n),sub(0,n,x,b)],1)),factorial(m))
}
function hanhqpoly(n,a,b,x,m){
	return hypergeometric([sub(0,x),add(a,b,n,1),sub(0,x)],[add(a,1),sub(0,m)],1) 
}
function dualhanhpoly(n,x,g,d,m){
	let s = div(add(g,d,1),2);
	let l = sub(sqrt(add(x,s)),sqrt(s));
	return hypergeometric([sub(0,n),sub(0,l),add(l,g,d,1)],[add(g,1),sub(0,m)],1)	
}
function dualhanh2poly(n,x,g,d,m){
	let s = div(add(g,d,1),2);
	let l = sub(0,sqrt(s),sqrt(add(x,s)));
	return hypergeometric([sub(0,n),sub(0,l),add(l,g,d,1)],[add(g,1),sub(0,m)],1)	
}
function continuoushahnpoly(n,x,a,b,c,d){
	return div(mul(pow(I,n),pochhammer(add(a,c),n),pochhammer(add(a,d),n),hypergeometric([sub(0,n),add(n,a,b,c,d,-1),add(a,mul(x,I))],[add(a,c),add(a,d)],1)),factorial(n))
}
function continuoushahnspoly(n,x,a,b,c){
	return mul(pochhammer(add(a,b),n),pochhammer(add(a,c),n),hypergeometric([sub(0,n),add(a,mul(I,sqrt(x))),sub(a,mul(I,sqrt(x)))],[add(a,b),add(a,c)],1))
}
function qhahnpoly(n,qx,a,b,nn,q){
	return qhypergeometric([pow(q,sub(0,n)),mul(a,b,pow(q,add(n,1))),qx],[mul(a,q),pow(q,sub(0,nn))],q,q)
}
function expaexp(x,q,a){return add(pow(q,sub(0,x)),mul(a,pow(q,x)))}
function arcexpaexp(x,q,a){return newtoninv("expaexp(x,"+q+","+a+")",x,acosh(x)/log(q));}

function qdualhahnpoly(n,qx,g,d,nn,q){
	//qx -> q^-x+gdq^(x+1 but i am lazy so input x for now
	let x=arcexpaexp(qx,q,mul(g,d));
	return qhypergeometric([pow(q,sub(0,n)),pow(q,sub(0,x)),mul(g,d,pow(q,add(x,1)))],[mul(g,q),pow(q,sub(0,nn))],q,q)
}

function qcontinuoushahnpoly(n,t,u,a,b,c,d,q){
	//x=cos(t+u)
	return mul(pow(a,sub(0,n)),exp(mul(-1,I,n,u)),qhypergeometric([pow(q,sub(0,n)),mul(a,b,c,d,pow(q,sub(n,1))),mul(a,exp(mul(I,add(t,u,u)))),mul(a,exp(mul(-1,I,t)))],[mul(a,b,exp(mul(2,I,u))),mul(a,c),mul(a,d)],q,q))
}
function qcontinuousdualhahnpoly(n,x,a,b,c,q){
	let t=acos(x);
	return mul(div(mul(qpochhammer(mul(a,b),q,n),qpochhammer(mul(a,c),q,n)),pow(a,n)),qhypergeometric([pow(q,sub(0,n)),mul(a,exp(mul(I,t))),mul(a,exp(mul(I,-1,t)))],[mul(a,b),mul(a,c)],q,q));
}
function qlaguerrepoly(n,a,x,q){
	return div(mul(qpoch(pow(q,add(a,1)),q,n),qhypergeometric([pow(q,sub(0,n))],[pow(q,add(a,1))],q,mul(-1,x,pow(q,add(n,a,1))))),qpoch(q,q,n))
}
function bigqlaguerrepoly(n,x,a,b,q){
	return div(qhypergeometric([pow(q,sub(0,n)),mul(a,q,pow(x,-1))],[mul(a,q)],q,div(x,b)),qpoch(mul(pow(b,-1),pow(q,sub(0,n))),q,n))
}
function littleqlaguerrepoly(n,x,a,q){
	return qhypergeometric([pow(q,sub(0,n)),0],[mul(a,q)],q,mul(q,x));
}
function continuouslaguerrepoly(n,a,x,q){
	const t = acos(x);
	return div(mul(qpoch(pow(q,add(a,1),q,n)),qhypergeometric([pow(q,sub(0,n)),mul(pow(q,add(0.25,div(a,2))),exp(mul(I,t))),mul(pow(q,add(0.25,div(a,2))),exp(mul(-1,I,t)))],[pow(q,add(a,1)),0],q,q)),qpoch(q,q,n))
}
function qmeixnerpoly(n,qx,b,c,q){
	return qhypergeometric([pow(q,sub(0,n)),pow(q,sub(0,x))],[mul(b,q)],q,div(pow(q,add(n,1)),-1,c));
}
function qmeixnerpollaczekpoly(n,t,u,a,q){
	return mul(pow(a,sub(0,n)),exp(mul(i,n,u)),div(qpoch(mul(a,a),q,n),qpoch(q,q,n)),qhypergeometric([pow(q,sub(0,n)),mul(a,exp(mul(I,add(t,u,u)))),mul(a,exp(mul(-1,I,t)))],[mul(a,a),0],q,q));
}
function qracahpoly(n,x,a,b,c,nn,q){
	return qhypergeometric([pow(q,sub(0,n)),mul(a,b,pow(q,add(n,1))),pow(q,sub(0,x)),mul(c,pow(q,sub(x,n)))],[mul(a,q),mul(b,c,q),pow(q,sub(0,nn))],q,q)
}

function ramanujana(z,q){
	let fi=math.complex(0,0);
	for(let i=0;i<bign;i++)fi=add(fi,mul(pow(-1,n),pow(z,add(n,n)),pow(q,mul(n,n))));
	return fi;
}//unsure


function qbesselpoly(n,x,a,q){
return qhypergeometric([pow(q,sub(0,n)),mul(-1,a,pow(q,n))],[0],q,mul(q,x))
}
function jacksonqbesselj1(v,x,q){return div(mul(qhypergeometric([0,0],[pow(q,add(v,1))],q,div(mul(x,x),-4)),pow(div(x,2),v),qpochinf(pow(q,add(v,1),q)),qpochinf(q,q)))}
function jacksonqbesselj2(v,x,q){return div(mul(qhypergeometric([],[pow(q,add(v,1))],q,div(mul(x,x,pow(q,add(v,1))),-4)),pow(div(x,2),v),qpochinf(pow(q,add(v,1),q)),qpochinf(q,q)))}
function jacksonqbesselj3(v,x,q){return div(mul(qhypergeometric([0],[pow(q,add(v,1))],q,div(mul(x,x,q),4)),pow(div(x,2),v),qpochinf(pow(q,add(v,1),q)),qpochinf(q,q)))}
function hahnextonqbessel/*real j3*/(v,x,q){return div(mul(qhypergeometric([0],[pow(q,add(v,1))],q,mul(q,x,x))),pow(div(x,2),v),qpochinf(pow(q,add(v,1),q)),qpochinf(q,q))}

function jacksonqbesseli1(v,x,q){return mul(exp(mul(I,v,pi(),0.5)),jacksonqbesselj1(v,x,q))};
function jacksonqbesseli2(v,x,q){return mul(exp(mul(I,v,pi(),0.5)),jacksonqbesselj2(v,x,q))};
function jacksonqbesseli3(v,x,q){return mul(exp(mul(I,v,pi(),0.5)),jacksonqbesselj3(v,x,q))};
	
function jacksonqbesselk1(vv,x,q){const v=add(vv,0.00001);return div(mul(sub(jacksonqbesseli1(sub(0,v),x,q),jacksonqbesseli1(v,x,q)),pi()),2,sin(mul(pi(),v)))};
function jacksonqbesselk2(vv,x,q){const v=add(vv,0.00001);return div(mul(sub(jacksonqbesseli2(sub(0,v),x,q),jacksonqbesseli2(v,x,q)),pi()),2,sin(mul(pi(),v)))};
function jacksonqbesselk3(vv,x,q){const v=add(vv,0.00001);return div(mul(sub(jacksonqbesseli3(sub(0,v),x,q),jacksonqbesseli3(v,x,q)),pi()),2,sin(mul(pi(),v)))};

function jacksonqbessely1(vv,x,q){const v=add(vv,0.00001);return div(mul(sub(mul(jacksonqbesselj1(v,x,q),cos(mul(pi(),v))),jacksonqbesselj1(sub(0,v),x,q))),sin(mul(pi(),v)))};
function jacksonqbessely2(vv,x,q){const v=add(vv,0.00001);return div(mul(sub(mul(jacksonqbesselj2(v,x,q),cos(mul(pi(),v))),jacksonqbesselj2(sub(0,v),x,q))),sin(mul(pi(),v)))};
function jacksonqbessely3(vv,x,q){const v=add(vv,0.00001);return div(mul(sub(mul(jacksonqbesselj3(v,x,q),cos(mul(pi(),v))),jacksonqbesselj3(sub(0,v),x,q))),sin(mul(pi(),v)))};

function jacksonqhankel11(vv,x,q){const v=add(vv,0.00001);return add(jacksonqbesselj1(v,x,q),mul(jacksonqbessely1(v,x,q),I))};
function jacksonqhankel21(vv,x,q){const v=add(vv,0.00001);return sub(jacksonqbesselj1(v,x,q),mul(jacksonqbessely1(v,x,q),I))};
function jacksonqhankel12(vv,x,q){const v=add(vv,0.00001);return add(jacksonqbesselj2(v,x,q),mul(jacksonqbessely2(v,x,q),I))};
function jacksonqhankel22(vv,x,q){const v=add(vv,0.00001);return sub(jacksonqbesselj2(v,x,q),mul(jacksonqbessely2(v,x,q),I))};
function jacksonqhankel13(vv,x,q){const v=add(vv,0.00001);return add(jacksonqbesselj3(v,x,q),mul(jacksonqbessely3(v,x,q),I))};
function jacksonqhankel23(vv,x,q){const v=add(vv,0.00001);return sub(jacksonqbesselj3(v,x,q),mul(jacksonqbessely3(v,x,q),I))};

function jacksonsphericalqbesselj1(vv,x,q){return mul(jacksonqbesselj1(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbesselj2(vv,x,q){return mul(jacksonqbesselj2(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbesselj3(vv,x,q){return mul(jacksonqbesselj3(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}

function jacksonsphericalqbessely1(vv,x,q){return mul(jacksonqbessely1(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbessely2(vv,x,q){return mul(jacksonqbessely2(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbessely3(vv,x,q){return mul(jacksonqbessely3(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}

function jacksonsphericalqbesselk1(vv,x,q){return mul(jacksonqbesselk1(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbesselk2(vv,x,q){return mul(jacksonqbesselk2(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbesselk3(vv,x,q){return mul(jacksonqbesselk3(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}

function jacksonsphericalqbesseli1(vv,x,q){return mul(jacksonqbesseli1(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbesseli2(vv,x,q){return mul(jacksonqbesseli2(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}
function jacksonsphericalqbesseli3(vv,x,q){return mul(jacksonqbesseli3(add(vv,0.5),x,q),sqrt(div(pi(),2,x)))}

function jacksonsphericalqhankel11(vv,x,q){const v=add(vv,0.00001);return add(jacksonsphericalqbesselj1(v,x,q),mul(jacksonsphericalqbessely1(v,x,q),I))};
function jacksonsphericalqhankel21(vv,x,q){const v=add(vv,0.00001);return sub(jacksonsphericalqbesselj1(v,x,q),mul(jacksonsphericalqbessely1(v,x,q),I))};
function jacksonsphericalqhankel12(vv,x,q){const v=add(vv,0.00001);return add(jacksonsphericalqbesselj2(v,x,q),mul(jacksonsphericalqbessely2(v,x,q),I))};
function jacksonsphericalqhankel22(vv,x,q){const v=add(vv,0.00001);return sub(jacksonsphericalqbesselj2(v,x,q),mul(jacksonsphericalqbessely2(v,x,q),I))};
function jacksonsphericalqhankel13(vv,x,q){const v=add(vv,0.00001);return add(jacksonsphericalqbesselj3(v,x,q),mul(jacksonsphericalqbessely3(v,x,q),I))};
function jacksonsphericalqhankel23(vv,x,q){const v=add(vv,0.00001);return sub(jacksonsphericalqbesselj3(v,x,q),mul(jacksonsphericalqbessely3(v,x,q),I))};

function jacksonricattiqbessels1(vv,x,q){return mul(jacksonsphericalqbesselj1(vv,x,q),x)}
function jacksonricattiqbessels2(vv,x,q){return mul(jacksonsphericalqbesselj2(vv,x,q),x)}
function jacksonricattiqbesselj3(vv,x,q){return mul(jacksonsphericalqbesselj3(vv,x,q),x)}

function jacksonricattiqbesselc1(vv,x,q){return mul(jacksonsphericalqbessely1(vv,x,q),x,-1)}
function jacksonricattiqbesselc2(vv,x,q){return mul(jacksonsphericalqbessely2(vv,x,q),x,-1)}
function jacksonricattiqbesselc3(vv,x,q){return mul(jacksonsphericalqbessely3(vv,x,q),x,-1)}

function jacksonricattiqbesselxi1(vv,x,q){return mul(jacksonsphericalqhankel11(vv,x,q),x)}
function jacksonricattiqbesselxi2(vv,x,q){return mul(jacksonsphericalqhankel12(vv,x,q),x)}
function jacksonricattiqbesselxi3(vv,x,q){return mul(jacksonsphericalqhankel13(vv,x,q),x)}

function jacksonricattiqbesselzeta1(vv,x,q){return mul(jacksonsphericalqhankel21(vv,x,q),x)}
function jacksonricattiqbesselzeta2(vv,x,q){return mul(jacksonsphericalqhankel22(vv,x,q),x)}
function jacksonricattiqbesselzeta3(vv,x,q){return mul(jacksonsphericalqhankel23(vv,x,q),x)}

	
function qcharlierpoly(n,qx,a,q){
	return qhypergeometric([pow(q,sub(0,n)),qx],[0],div(pow(q,add(n,1)),a,-1))
}

function rogerspoly(n,x,b,q){
	const t=acos(x);
	return div(mul(qhypergeometric([pow(sub(0,n)),b],[div(pow(q,sub(1,n)),b)],q,mul(q,pow(b,-1),exp(mul(-2,I,t)))),exp(mul(i,n,t)),qpoch(b,q,n)),qpoch(q,q,n))
}
function rogersszegopoly(n,x,q){
	fi=math.complex(0);
	for(let k=0;k<=n;k++)
	fi=add(fi,div(mul(qpoch(q,q,n),pow(x,k)),qpoch(q,q,k),qpoch(q,q,sub(n,k))));
return fi;
}

function qkrawtchoukpoly(n,qx,p,nn,q){
	let x=sub(0,div(log(qx),log(q)));
	return qhypergeometric([pow(q,sub(0,n)),qx],[pow(q,sub(0,nn))],q,mul(p,pow(q,add(n,1))))
}
function affineqkrawtchoukpoly(n,qx,p,nn,q){
	return qhypergeometric([pow(0,sub(0,n)),0,qx],[mul(q,p),pow(q,sub(0,nn))],q,q)
}
function dualqkrawtchoulpoly(n,x,c,nn,q){
	//qx -> q^-x+cq^(x-N) but i am lazy so input x for now
	return qhypergeometric([pow(q,sub(0,n)),pow(q,sub(0,x)),mul(c,pow(q,sub(x,N)))],[pow(q,sub(0,nn)),0],q,q)
}
function quantumqkrawtchoukpoly(n,qx,p,nn,q){
	return qhypergeometric([pow(q,sub(0,n)),pow(q,sub(0,x))],[pow(q,sub(0,nn))],q,mul(p,pow(q,add(n,1))))
}
function alsalamcarlitzpolyu(n,a,x,q){
return mul(pow(sub(0,a),n),pow(q,mul(n,0.5,sub(n,1))),qhypergeometric([pow(q,sub(0,n)),pow(x,-1)],[0],q,div(mul(q,x),a)))
}
function alsalamcarlitzpolyv(n,a,x,q){
return mul(pow(sub(0,a),n),pow(q,mul(n,-0.5,sub(n,1))),qhypergeometric([pow(q,sub(0,n)),x],[],q,div(pow(q,n),a)))
}

function alsalamchiharapoly(n,x,a,b,q)
{const t=acos(x);return div(mul(qpoch(mul(a,b),q,n),qhypergeometric([pow(q,sub(0,n)),mul(a,exp(mul(I,t))),mul(a,exp(mul(-1,I,t)))],[mul(a,b),0],q,q)),pow(a,n))}


function discreteqhermitepoly(n,x,q){return mul(pow(q,ncr(n,2)),qhypergeometric([pow(q,sub(0,n)),pow(x,-1)],[0],q,mul(-1,q,x)))}
function discreteqhermitehatpoly(n,x,q){return mul(pow(i,sub(0,n)),pow(q,mul(ncr(n,2),-1)),qhypergeometric([pow(q,sub(0,n)),mul(x,I)],[],q,mul(-1,pow(q,n))))}
function continuousqhermitepoly(n,x,q){const t=acos(x);return mul(exp(mul(I,n,t)),qhypergeometric([pow(q,sub(0,n)),0],[],q,mul(pow(q,n),exp(mul(-2,I,t)))))}
function continuousbigqhermitepoly(n,x,q){const t=acos(x);return mul(pow(a,sub(0,n)),qhypergeometric([pow(q,sub(0,n)),mul(a,exp(mul(I,t))),mul(a,exp(mul(-1,I,t)))],[0,0],q,q))}

function continuousqlegendre(n,x,q){const t=acos(x);return mul(pow(a,sub(0,n)),qhypergeometric([pow(q,sub(0,n)),pow(q,add(n,1)),mul(pow(q,0.25),exp(mul(I,t))),mul(pow(q,0.25),exp(mul(-1,I,t)))],[q,mul(-1,pow(q,-0.5)),mul(-1,q)],q,q))}
function bigqlegendre(n,x,c,q){return qhypergeometric([pow(q,sub(0,n)),pow(q,add(n,1)),x],[q,mul(c,q)],q,q)}









function racahpoly(n,lx,a,b,c,d){
	const x=div(sqrt(add(c,d,1)),-4);
	return hypergeometric([sub(0,n),add(n,a,b,1),sub(0,x),add(x,c,d,1)],[add(a,1),add(c,1),add(b,d,1)],1)
}

function meixnerpoly(n,x,b,c){
	return hypergeometric([sub(0,n),sub(0,x)],[b],sub(1,div(1,c)))
}





function schwarztriangle(a,b,c,z){
	let aa = div(sub(1,a,b,c),2);
	let bb = div(sub(add(1,b),a,c),2);
	let cc = sub(1,a);
	return mul(pow(z,a),div(hypergeometric([add(1,sub(aa,cc)),add(1,sub(bb,cc))],[sub(2,cc)],z),hypergeometric([aa,bb],[cc],z)));
}
function schwarztrianglephi(a,b,c,z){
	let aa = div(sub(b,a,c,-1),2);
	let bb = div(sub(1,b,c,a),2);
	let cc = sub(1,a);
	let aaa = sub(aa,cc,-1);
	let bbb = sub(bb,cc,-1);
	let ccc = add(1,a);
	return mul(pow(z,sub(1,cc)),div(hypg21(aaa,bbb,ccc,z),hypg21(aa,bb,cc,z)));
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

function associatedlegendre(l,m,x){//P_^
	let fi=math.complex(0,0);for(let k=m;k<=l;k++)
	{	fi = add(fi,mul(div(factorial(k),factorial(sub(k,m))),pow(x,sub(k,m)),ncr(l,k),ncr(div(add(l,k,-1),2),l)));
	//console.log(div(factorial(k),factorial(sub(k,m))));
	}
	return mul(fi,pow(-1,m),pow(2,l),pow(sub(1,mul(x,x)),div(m,2)));
}
function alternatingassociatedlegendre(l,m,x){//P_ _
	let fi=math.complex(0,0);for(let k=m;k<=l;k++)
	{	fi = add(fi,mul(div(factorial(k),factorial(sub(k,m))),pow(x,sub(k,m)),ncr(l,k),ncr(div(add(l,k,-1),2),l)));
	//console.log(div(factorial(k),factorial(sub(k,m))));
	}
	return mul(fi,pow(-1,m),pow(2,l),pow(sub(1,mul(x,x)),div(m,2)));
}

function sphericalharmonic(l, m, theta, phi) {//Y_^
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
    return mul(b, exp(sub(0,div(mul(b, b), 4))), hypg11(add(mul(0.5 , a), 0.25), 0.5, div(mul(b, b), 2)));
}

function paracylinderodd(a, b) {
    return mul(b, exp(sub(0,div(mul(b, b), 4))), hypg11(add(mul(0.5 , a), 0.75), 1.5, div(mul(b, b), 2)));
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

function retry (func,x,n){
	let fi=math.complex(0,0);
	for(let i=0;i<n;i++)
	fi = add(fi,math.evaluate(func,{x:x,i:i,n:n}));
	return div(fi,n);
}
function retrymin (func,x,n){
	let fi=math.complex(0,0);
	for(let i=0;i<n;i++)
	fi = minc(fi,math.evaluate(func,{x:x,i:i,n:n}));
	return div(fi,n);
}
function retrymax (func,x,n){
	let fi=math.complex(0,0);
	for(let i=0;i<n;i++)
	fi = maxc(fi,math.evaluate(func,{x:x,i:i,n:n}));
	return div(fi,n);
}






function polygamma(n,z){
	return mul(pow(-1,add(n,1)),factorial(n),hurwitzzeta(add(n,1),z));
/*	const m1 = math.log(gamma(b));
    const m2 = math.log(gamma(add(b , epsilon)));
    const m3 = math.log(gamma(add(add(b , epsilon) , epsilon)));
    return div(sub(sub(m2, m1), sub(m3, m2)), epsilon*epsilon);
	let fi=math.complex(0,0);
	for(let k=1;k<bign;k++)
		fi=add(fi,sub(div(1,k),div(1,add(k,z,1))));
	return sub(fi,0.5772156649);*/
}

function mobiustransform(a,b,c,d,z){
	return div(add(mul(a,z),b),add(mul(c,z),d));
}

function slogm(xk){
	const x = (math.complex(-mag(re(xk)),(-3.367676/2+math.mod(math.complex(xk).im+3.367676/2,3.367676))));
	 if (math.complex(x).re<-4||mag(math.complex(x).im)>2||(math.complex(x).re<-1.5&&mag(math.complex(x).im)>1))
		 return -2;
	 	if (math.complex(x).re>0.3 && math.complex(x).im>-0.5)
return -2;
//	return newtoninvf(tetr,x,math.complex(2,0.3),1e-2);
//newtoninv(tetr,x,2+0.03i)
	else if (math.complex(x).re>0.3 && math.complex(x).im<-0.1)
return -2;	
//return newtoninvf(tetr,x,math.complex(2,-0.3),1e-2);
//newtoninv(tetr,x,2-0.03i)
	 if (math.complex(x).re>1||math.complex(x).re<-1.5)
		 	return newtoninvf(tetr,x,mul(math.tanh(x),2),1e-2);
	if(math.complex(x).im>0.3)
	return newtoninvf(tetr,x,math.complex(-2,0.3),1e-2);
	return conj( newtoninvf(tetr,conj(x),math.complex(-2,0.3),1e-2));
}
function slog(x){
	if (math.complex(x).re>0.3 && math.complex(x).im>-0.5)
	return newtoninvf(tetr,x,math.complex(2,0.3),1e-2);
//newtoninv(tetr,x,2+0.03i)
	else if (math.complex(x).re>0.3 && math.complex(x).im<-0.1)
	return newtoninvf(tetr,x,math.complex(2,-0.3),1e-2);
//newtoninv(tetr,x,2-0.03i)
	else if ((math.complex(x).re>-1 && math.complex(x).im>-1.337) && math.complex(x).im<1.337)
	return newtoninvf(tetr,x,math.complex(-2,-0.1),1e-2);
	else if (math.complex(x).im>1.337 && math.complex(x).re>-3)
//newtoninv(tetr,x,2+i)
	return newtoninvf(tetr,x,math.complex(2,1),1e-2);	
	else if (math.complex(x).im<-1.337 && math.complex(x).re>-3)
//newtoninv(tetr,x,2-i)
	return conj(newtoninvf(tetr,conj(x),math.complex(2,1)),1e-2);
		else if (math.complex(x).im>1.337)
//newtoninv(tetr,x,2.3+i)
	return newtoninvf(tetr,x,math.complex(2.3,1),1e-2);	
	else if (math.complex(x).im<-1.337)
//newtoninv(tetr,x,2.3-i)
	return conj(newtoninvf(tetr,conj(x),math.complex(2.3,1)),1e-2);
	else if (math.complex(x).re>-4)
//newtoninv(tetr,x,2-i)
	return newtoninvf(tetr,x,mul(math.tanh(x),2),1e-2);
	else return -2;
	
}
function sloga(x){
	if (math.complex(x).re>0.3 && math.complex(x).im>-0.5)
	return newtoninvf(tetr,x,math.complex(2,0.3),1e-2);
//newtoninv(tetr,x,2+0.03i)
	else if (math.complex(x).re>0.3 && math.complex(x).im<-0.1)
	return newtoninvf(tetr,x,math.complex(2,-0.3),1e-2);
//newtoninv(tetr,x,2-0.03i)
	else if ((math.complex(x).re>-1 && math.complex(x).im>-1.337) && math.complex(x).im<1.337)
	return newtoninvf(tetr,x,math.complex(-2,-0.1),1e-2);
	else if (math.complex(x).im>1.337 && math.complex(x).re>-3)
//newtoninv(tetr,x,2+i)
	return newtoninvf(tetr,x,math.complex(2,1),1e-2);	
	else if (math.complex(x).im<-1.337 && math.complex(x).re>-3)
//newtoninv(tetr,x,2-i)
	return conj(newtoninvf(tetr,conj(x),math.complex(2,1)),1e-2);
	else if (math.complex(x).re>-4)
	return newtoninvf(tetr,x,mul(math.tanh(x),2),1e-2);
	
		else if (math.complex(x).im>1.337)
//newtoninv(tetr,x,2.3+i)
	return newtoninvf(tetr,x,math.complex(2.3,1),1e-2);	
	else if (math.complex(x).im<-1.337)
//newtoninv(tetr,x,2.3-i)
	return conj(newtoninvf(tetr,conj(x),math.complex(2.3,1)),1e-2);
	else if (math.complex(x).re>-4)
//newtoninv(tetr,x,2-i)
	return newtoninvf(tetr,x,mul(math.tanh(x),2),1e-2);
	else return -2;
	
}
function slogc(x){
		if (math.complex(x).re>0.1 && math.complex(x).im>-0.5)
	return newtoninvff(tetr,tetrf,x,math.complex(2,0.3),1e-2);
//newtoninv(tetrf,x,2+0.03i)
	else if (math.complex(x).re>0.1 && math.complex(x).im<-0.1)
	return newtoninvff(tetr,tetrf,x,math.complex(2,-0.3),1e-2);
//newtoninv(tetrf,x,2-0.03i)
	else if ((math.complex(x).re>-1 && math.complex(x).im>-1.337) && math.complex(x).im<1.337)
	return newtoninvff(tetr,tetrf,x,math.complex(-2,-0.1),1e-2);
	else if (math.complex(x).im>1.337 && math.complex(x).re>-4)
//newtoninv(tetrf,x,2+i)
	return newtoninvff(tetr,tetrf,x,math.complex(2,1),1e-2);	
	else if (math.complex(x).im<-1.337 && math.complex(x).re>-4)
//newtoninv(tetrf,x,2-i)
	return conj(newtoninvff(tetr,tetrf,conj(x),math.complex(2,1)),1e-2);
		else if (math.complex(x).im>1.337)
//newtoninv(tetrf,x,2.3+i)
	return newtoninvff(tetr,tetrf,x,math.complex(2.3,1),1e-2);	
	else if (math.complex(x).im<-1.337)
//newtoninv(tetrf,x,2.3-i)
	return conj(newtoninvff(tetr,tetrf,conj(x),math.complex(2.3,1)),1e-2);
	else if (math.complex(x).re>-2)
//newtoninv(tetrf,x,2-i)
	return newtoninvff(tetr,tetrf,x,mul(math.tanh(x),2),1e-2);
	else return -2;
}
function slogb(b){
            const N = bign; // bign is set to 10000 for this example
            let fi = math.complex(b.re, Math.abs(b.im));
            if (b.im < 0.0) {
                fi = math.conj(fi);
         }
            for (let i = 0; i < N; i++) {
                fi = log(fi);
            }
		//	fi=add(fi,mul(I,2,pi()));
			const constant = math.complex(0.318132, -1.33724);
		//	fi = add(constant, pow(math.log(constant), sub(fi, N)));
			fi = add(div(log(sub(fi,constant)),constant),N)
			
     /*       const bi = math.complex(math.mod(math.re(b), 1.0), math.im(fi));
            for (let i = 0; i < 58; i++) {
                const term = mul(math.complex(0, 1), bi, pi() * 2.0 * i);
                fi = add(fi, mul(knthetaa[i], math.exp(term)));
            }
*/
            return fi;
        
}


function fabiusfourier(x){
	let fi=math.complex(1,0);
	for(let m=1;m<bign;m++)
		fi=mul(fi,pow(cos(div(mul(pi(),x),pow(2,m))),m))
	return fi;
}
function fabiusd(xi,x){
	let fi=math.complex(1,0);
	for(let m=1;m<bign;m++)
		fi=mul(fi,pow(cos(div(mul(pi(),xi),pow(2,m))),m))
	return mul(fi,exp(mul(I,2,pi(),xi,x)));
}
function fabius(x){
return 	integral(fabiusd,-sqrt(bign),sqrt(bign),x);
}
function fabiusaltd(x){
	let fi=math.complex(0,0);
	for(let m=1;m<bign;m++)
		fi=add(mul(pow(2,sub(0,m))),randomfloat(0,1));
	return fi;
}
function fabiusalt(x){
return 	integral(fabiusaltd,0,x);
}







function invfourier(func, input, N = bign) {
    function simpsonsRule(a, b, n) {
		
        const h = div(sub(b, a), n);
		
        let sum = math.complex(0,0); 
        for (let i = 1; i < n; i += 2) {
            sum = add(sum, mul(math.complex(4,0),mul( func(add(a, mul(math.complex(i), h)), input) , exp(mul(I,2,pi(),add(a, mul(math.complex(i), h)),input))  )));
        }
        for (let i = 2; i < n - 1; i += 2) {
            sum = add(sum, mul(math.complex(2,0),mul( func(add(a, mul(math.complex(i), h)), input) ,exp(mul(I,2,pi(),add(a, mul(math.complex(i), h)),input))  )));
        }
        return mul(div(h, math.complex(3,0)), sum);
    }
          return simpsonsRule(sub(0,bign),bign, N);
       }
	   
	   
	   
	   
	   function dyonsintegral(n,b){
		   return div(factorial(mul(b,n)),pow(factorial(b),n))
	   }
		function selbergintegral(n,c){
			let fi=math.complex(1,0);
			for(let k=1;k<=n;k++)
				fi=mul(fi,factorial(mul(k,c)));
		   return div(fi,pow(factorial(c),n))
	   }
		function selbergdelta(A){
			let N = leng(A);
			let fi=math.complex(1,0);
			for(let j=1;j<N;j++)
			for(let k=j+1;k<=N;k++)
			fi=mul(fi,sub(g(A,sub(j,1)),g(A,sub(k,1))))
			return fi;
	   }


function ode2(func,e,s=0,sp=0,N=bign*1.5){
let dx=div(sub(e,s),N);	
let y=s;
let yp=sp;
let ypp=0;
for(let t=0;t<N;t++){
x=mul(t,dx);	
ypp=math.evaluate(func,{x:x,y:y,yp:yp});
yp=add(yp,mul(ypp,dx));
y=add(y,mul(yp,dx));
}
return y;
}
function ode2rk4(func, e, s = 0, sp = 0, p=0, off=0) {
    let dx = div(sub(e, s), bign);
    let y = s;
    let yp = sp;

    for (let t = 0; t < bign; t++) {
        let x = add(mul(t, dx),off);

        let k1_ypp = func(x, y, yp , p);
        let k1_yp = mul(k1_ypp, dx);
        let k1_y = mul(yp, dx);

        let mid_x1 = add(x, div(dx, 2));
        let mid_yp1 = add(yp, div(k1_yp, 2));
        let mid_y1 = add(y, div(k1_y, 2));
        let k2_ypp = func(mid_x1, mid_y1, mid_yp1 , p);
        let k2_yp = mul(k2_ypp, dx);
        let k2_y = mul(mid_yp1, dx);

        let mid_x2 = add(x, div(dx, 2));
        let mid_yp2 = add(yp, div(k2_yp, 2));
        let mid_y2 = add(y, div(k2_y, 2));
        let k3_ypp = func(mid_x2, mid_y2, mid_yp2 , p);
        let k3_yp = mul(k3_ypp, dx);
        let k3_y = mul(mid_yp2, dx);

        let end_x = add(x, dx);
        let end_yp = add(yp, k3_yp);
        let end_y = add(y, k3_y);
        let k4_ypp = func(end_x, end_y, end_yp , p);
        let k4_yp = mul(k4_ypp, dx);
        let k4_y = mul(end_yp, dx);

        yp = add(yp, div(add(add(k1_yp, mul(2, k2_yp)), add(mul(2, k3_yp), k4_yp)), 6));
        y = add(y, div(add(add(k1_y, mul(2, k2_y)), add(mul(2, k3_y), k4_y)), 6));
    }

    return y;
}

function painleve1diff(x,y,yp){
	return add(mul(y,y,6),x);
}
function painleve1(x,s=0,sp=0){
	return ode2rk4(painleve1diff,x,s,sp);
}


function painleve3diff(x,y,yp,A){
	const a=g(A,0);const b=g(A,1);const c=g(A,2);const d=g(A,3);
	return add(div(sqr(yp),y),mul(-1,div(yp,x)),div(add(mul(a,y,y),b),x),mul(c,y,y),div(d,y));
}
function painleve3(x,a=1,b=1,c=1,d=1,s=1,sp=-1,off=1){
	return ode2rk4(painleve3diff,x,s,sp,[a,b,c,d],off);
}



function airydiff(x,y,yp){
	return mul(x,y);
}
function aidiff(x,s=0.355028053888,sp=-0.258819403793){
	return ode2rk4(airydiff,x,s,sp);
}
function bidiff(x,s=0.614926627446,sp=-0.448288357354){
	return ode2rk4(airydiff,x,s,sp);
}
function conwaymaxwellpoissonz(l,v){
	let fi=math.complex(0,0);
	for(let j=0;j<bign;j++)fi=add(fi,div(pow(l,j),pow(factorial(j),v)))
return fi;
}

function risingfactorial(x,r){
	return div(gamma(add(x,r)),gamma(x));
}
function arcregincbeta(x,a,b){return newtoninv("regincbeta(x,"+a+","+b+")",x,div(sub(a,1/3),add(a,b,-2/3)))}
//CGF = log(MGF) cumultant generating functiın
//function dirichletnegativemultinomial(r,p){return  }

function betadistpdf(a,b,x){return div(mul(pow(x,sub(a,1)),pow(sub(1,x),sub(b,1))),beta(a,b))}
function betadistpdf4(a,b,aa,c,y){const x=div(sub(y,a),sub(c,a));return div( div(mul(pow(x,sub(a,1)),pow(sub(1,x),sub(b,1))),beta(a,b)),sub(aa,c))}
function betadistcdf(a,b,x){return regincbeta(x,a,b)}
function betadistmean(a,b){return div(a,add(a,b))}
function betadistmeanlnx(a,b){return sub(digamma(a),digamma(add(a,b)))}
function betadistmeanxlnx(a,b){return div(mul(sub(digamma(add(a,1)),digamma(add(a,b,1))),a),add(a,b))}
function betadistmode(a,b){return div(sub(a,1),add(a,b,-2))}
function betadistmedian(a,b){return arcregincbeta(0.5,a,b)}
function betadistvar(a,b){return div(mul(a,b),add(a,b),add(a,b),add(a,b,1))}
function betadistvarlnx(a,b){return sub(trigamma(a),trigamma(add(a,b)))}
function betadistskew(a,b){return div(mul(2,sub(b,a),sqrt(add(a,b,1))),add(a,b,2),sqrt(mul(a,b)))}
function betadistkurtosis(a,b){return add(3,div(mul(6,sub(mul(sub(a,b),sub(a,b),add(a,b,1)),mul(a,b,add(a,b,2)))),a,b,add(a,b,2),add(a,b,3)))}
function betadistexcesskurtosis(a,b){return div(mul(6,sub(mul(sub(a,b),sub(a,b),add(a,b,1)),mul(a,b,add(a,b,2)))),a,b,add(a,b,2),add(a,b,3))}
function betadistentropy(a,b){return sub(log(beta(a,b)),mul(sub(a,1),digamma(a)),mul(sub(b,1),digamma(b),mul(-1,add(a,b,-2),digamma(add(a,b)))))}
function betadistmgfcoef(a,b,k){let fi=math.complex(1,0);for(let r=0;r<k;r++)fi=mul(fi,div(add(a,r),add(a,b,r)));return fi}
function betadistmgf(a,b,t){let fi=math.complex(0,0);for(let k=1;k<bign;k++)fi=add(fi,div(mul(betadistmgfcoef(a,b,k,pow(t,k)),factorial(k))));return add(1,fi)}
function betadistcf(a,b,t){return hypg11(a,add(a,b),mul(I,t))}
function betadistgini(a,b,x){return div(mul(2,beta(add(a,b),add(a,b))),a,beta(a,a),beta(b,b))}
//function betadistfisherinfo(a,b,x){return }
function betadistrawmoment(a,b,r){return div(mul(gamma(add(a,b)),gamma(add(a,r))),gamma(add(a,b,r)),gamma(a))}
function betadistcentalmoment(a,b,r){return mul(pow(div(a,add(a,b),-1),r),hypg21(a,sub(0,r),add(a,b),div(add(a,b),a)))}
//function betadistamoment(a,b,x){return }
//function betadistbmoment(a,b,x){return }
function betadistdispersion(a,b){return div(sqrt(div(mul(sub(a,1),sub(b,1)),add(a,b,-3))),add(a,b,-2))}
function betadistinflexion(a,b){return add(betadistmode(a,b),betadistdispersion(a,b))}
function betadistinflexion2(a,b){return sub(betadistmode(a,b),betadistdispersion(a,b))}


function betanegativebinomialpmf(a,b,r,k){return div(mul(beta(add(r,k),add(a,b)),gamma(add(k,b))),beta(r,a),gamma(b),factorial(k))}
function betanegativebinomialmean(a,b,r){return div(mul(r,b),add(a,1))}
function betanegativebinomialvar(a,b,r){return div(mul(r,b,add(r,a,-1),add(b,a,-1)),sub(a,2),sub(a,1),sub(a,1))}
function betanegativebinomialskew(a,b,r){return div(mul(add(r,r,a,-1),add(b,b,a,-1)),sub(a,3),sqrt(div(mul(r,b,add(r,a,-1),add(b,a,-1)),sub(a,2))))}
function betanegativebinomialcf(a,b,r,t){return div(mul(hypg21(b,r,add(a,b,r),exp(mul(I,t))),risingfactorial(a,r)),risingfactorial(add(a,b),r))}
function betanegativebinomialpgf(a,b,r,z){return div(mul(hypg21(b,r,add(a,b,r),z),risingfactorial(a,r)),risingfactorial(add(a,b),r))}
function betanegativebinomialfactorialmoment(a,b,r,k){return div(mul(gamma(add(r,k)),gamma(add(b,k)),gamma(sub(a,k))),gamma(r),gamma(b),gamma(a))}

function binomialdistpmf(n,p,k){const q=sub(1,p);return mul(ncr(n,k),pow(p,k),pow(sub(n,k)))}
function binomialdistcdf(n,p,k){const q=sub(1,p);return regincbeta(q,sub(n,floor(k)),add(1,floor(k)))}
function binomialdistmean(n,p){return mul(n,p)}
function binomialdistmedian(n,p){return round(mul(n,p))}
function binomialdistmode(n,p){return floor(mul(add(n,1),p))}
function binomialdistskew(n,p){const q=sub(1,p);return div(sub(q,p),sqrt(mul(n,p,q)))}
function binomialdistkurtosis(n,p){return add(binomialdistexcesskurtosis(n,p),3)}
function binomialdistexcesskurtosis(n,p){const q=sub(1,p);return div(sub(1,mul(6,p,q)),(mul(n,p,q)))}
function binomialdistmgf(n,p,t){const q=sub(1,p);return pow(add(q,mul(p,exp(t))),n)}
function binomialdistcf(n,p,t){const q=sub(1,p);return pow(add(q,mul(p,mul(I,t))),n)}
function binomialdistpgf(n,p,z){const q=sub(1,p);return pow(add(q,mul(p,z)),n)}
function binomialdistfisherinfo(n,p){const q=sub(1,p);return div(n,p,q)}

function negativebinomialpmf(r,p,k){return mul(ncr(add(k,r,-1),k),pow(sub(1,p),k),pow(p,r))}
function negativebinomialcdf(r,p,k){return regincbeta(r,add(k,1))}
function negativebinomialmean(r,p){return div(mul(r,sub(1,p)),p)}
function negativebinomialmode(r,p){return div(mul(sub(r,1),sub(1,p),p))}
function negativebinomialvar(r,p){return div(mul(r,sub(1,p)),p,p)}
function negativebinomialskew(r,p){return div(sub(2,p),sqrt(mul(r,sub(1,p))))}
function negativebinomialexcesskurtosis(r,p){return add(div(6,r),div(mul(p,p),r,sub(1,p)))}
function negativebinomialkurtosis(r,p){return add(negativebinomialexcesskurtosis(r,p),3)}
function negativebinomialmgf(r,p,t){return pow(div(p,sub(1,mul(sub(1,p),exp(t)))),r)}
function negativebinomialcf(r,p,t){return pow(div(p,sub(1,mul(sub(1,p),exp(mul(I,t))))),r)}
function negativebinomialpgf(r,p,z){return pow(div(p,sub(1,mul(sub(1,p),z))),r)}
function negativebinomialfisherinfo(r,p){return div(r,p,p,sub(1,p))}

function extendednegativebinomialpmf(m,r,p,k){let fi=math.complex(0,0);for(let j=0;j<m;j++)fi=add(fi,mul(ncr(add(j,r,-1),j),pow(p,j)));return div(mul(ncr(add(k,r,-1),k),pow(p,k)),sub(pow(sub(1,p),sub(0,r)),fi))}
function extnegbin(k,m,r,p){return extendednegativebinomial(m,r,p,k)}
function extendednegativebinomialmgf(m,r,p,s){return extendednegativebinomialpgf(m,r,p,exp(s))}
function extendednegativebinomialcf(m,r,p,s){return extendednegativebinomialpgf(m,r,p,exp(mul(I,s)))}
function extendednegativebinomialpgf(m,r,p,s){let fi=math.complex(0,0);for(let k=m;k<bign;k++)fi=add(fi,mul(extnegbin(k,m,r,p),pow(s,k)));return fi;}



function betabinomialpmf(n,a,b,x){return div(mul(ncr(n,x),beta(add(x,a),add(n,b,mul(-1,x)))),beta(a,b))}
function betabinomialcdf(n,a,b,x){return div(mul(ncr(n,x),beta(add(x,a),add(n,b,mul(-1,x))),hypg32(1,sub(0,x),add(n,b,mul(-1,x)),sub(n,x,-1),sub(1,x,a),1)),beta(a,b))}
function betabinomialmean(n,a,b){return div(mul(n,a),add(a,b))}
function betabinomialmean(n,a,b){return div(mul(n,a,b,add(a,b,n)),add(a,b),add(a,b),add(a,b,1))}
function betabinomialskew(n,a,b){return div(mul(add(a,b,n,n),sub(b,a),sqrt(div(add(1,a,b),n,a,b,add(n,a,b)))),add(a,b,2))}
function betabinomialkurtosis(n,a,b){return div(mul(add(a,b),add(a,b),add(1,a,b),add(mul(add(a,b),add(a,b,-1,mul(6,n))),mul(3,a,b,sub(n,2)),mul(6,n,n),div(mul(3,a,b,n,sub(6,n)),add(a,b),-1),div(mul(18,a,b,n,n),add(a,b),add(a,b)))),n,a,b,add(a,b,2),add(a,b,3),add(a,b,n))}
function betabinomialexcesskurtosis(n,a,b){return sub(betabinomialkurtosis(n,a,b),3)}
function betabinomialfactorialmoment(n,a,b){return div(mul(poch(n,r),beta(add(a,r),b)),beta(a,b))}
function betabinomialmgf(n,a,b,t){return hypg21(sub(0,n),a,add(a,b),sub(1,exp(t)))}
function betabinomialcf(n,a,b,t){return hypg21(sub(0,n),a,add(a,b),sub(1,exp(mul(t,I))))}
function betabinomialpgf(n,a,b,z){return hypg21(sub(0,n),a,add(a,b),sub(1,z))}

function bernoullidistpmf(p,k){const q=sub(1,p);if(k=0)return q;if(k=1)return p;return 0;}
function bernoullidistcdf(p,k){const q=sub(1,p);if(re(k)<0)return im(sub(1,p));if(re(k)>1)return add(1,im(sub(1,p))); return sub(1,p)  }
function bernoullidistmean(p){const q=sub(1,p);return p}
function bernoullidistmedian(p){const q=sub(1,p);if(re(p)<0.5)return 0;if(re(p)=0.5)return 0.5;return 1;}
function bernoullidistmode(p){const q=sub(1,p);if(re(p)<0.5)return 0;if(re(p)=0.5)return 0.5;return 1;}
function bernoullidistvar(p){const q=sub(1,p);return mul(p,q)}
function bernoullidistmad(p){const q=sub(1,p);return mul(2,p,q)}
function bernoullidistskew(p){const q=sub(1,p);return div(sub(q,p),sqrt(mul(q,p)))}
function bernoullidistkurtosis(p){const q=sub(1,p);return  add(3,div(sub(1,mul(6,q,p)),q,p))}
function bernoullidistexcesskurtosis(p){const q=sub(1,p);return div(sub(1,mul(6,q,p)),q,p)}
function bernoullidistentropy(p){const q=sub(1,p);return sub(0,mul(q,log(q)),mul(p,log(p)))}
function bernoullidistmgf(p,t){const q=sub(1,p);return  add(q,mul(p,exp(t)))}
function bernoullidistcf(p,t){const q=sub(1,p);return add(q,mul(p,exp(mul(I,t)))) }
function bernoullidistpgf(p,z){const q=sub(1,p);return  add(q,mul(p,z))}
function bernoullidistfisherinfo(p){const q=sub(1,p);return div(1,p,q)}
/*
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
function betaninpmf(p){return }
*/

function categoricaldistpmf(P,x){return g(P,x)}//return to this add
function categoricaldistmode(P){let m=g(P,0);for(let i=0;i<leng(P);i++)if(g(P,i)>m)m=g(P,i);return m}

function hypergeometricdistpmf(nn,kk,n,k){return div(mul(ncr(kk,k),ncr(sub(nn,kk),sub(n,k))),ncr(nn,n))}
function hypergeometricdistcdf(nn,kk,n,k){return div(mul(ncr(n,add(k,1)),ncr(sub(nn,n),sub(kk,k,1)),hypg32(1,sub(k,kk,-1),sub(k,n,-1),add(k,2),add(nn,k,sub(2,kk,n)),1)),ncr(nn,kk))}
function hypergeometricdistmean(nn,kk,n){return div(mul(n,kk),nn)}
function hypergeometricdistmode(nn,kk,n){return div(mul(add(n,1),add(kk,1)),add(nn,2))}
function hypergeometricdistskew(nn,kk,n){return div(mul(sub(nn,kk,kk),sqrt(sub(nn,1)),sub(nn,n,n)),add(nn,2),sqrt(mul(n,kk,sub(nn,kk),sub(nn,n))))}
function hypergeometricdistvar(nn,kk,n){return div(mul(n,kk,sub(nn,kk),sub(nn,n)),nn,nn,sub(nn,1))}
function hypergeometricdistexcesskurtosis(nn,kk,n){return div(add(mul(sub(nn,1),nn,nn,sub(mul(nn,add(nn,1),mul(6,kk,sub(nn,kk)),mul(6,n,sub(nn,n))))),mul(6,n,kk,sub(nn,kk),sub(nn,n),sub(mul(5,nn),6))),n,kk,sub(nn,kk),sub(nn,n),sub(nn,2),sub(nn,3))}
function hypergeometricdistmgf(nn,kk,n,t){return  div(mul(hypg21(sub(0,n),sub(0,kk),sub(nn,kk,n,-1),exp(t)),ncr(sub(nn,kk),n)),ncr(nn,n))}
function hypergeometricdistcf(nn,kk,n,t){return div(mul(hypg21(sub(0,n),sub(0,kk),sub(nn,kk,n,-1),exp(mul(I,t))),ncr(sub(nn,kk),n)),ncr(nn,n))}
function hypergeometricdistpgf(nn,kk,n,z){return  div(mul(hypg21(sub(0,n),sub(0,kk),sub(nn,kk,n,-1),z),ncr(sub(nn,kk),n)),ncr(nn,n))}
function multihypergeometricdistpmf(KK,n,K){const c=leng(KK);const nn=gsum(KK);let fi=1;for(let i=0;i<c;i++)fi=mul(ncr(g(KK,i),g(K,i)));return div(fi,ncr(nn,n))}
function multihypergeometricdistmean(KK,n,i){const nn=gsum(KK);div(mul(n,g(KK,i)),nn)}
function multihypergeometricdistvar(KK,n,i){const nn=gsum(KK);div(mul(n,sub(nn,n),g(KK,i),sub(1,div(g(KK,i),nn))),sub(nn,1),bb)}
function multihypergeometricdistcov(KK,n,i,j){const nn=gsum(KK);div(mul(-1,n,sub(nn,n),g(KK,i),g(KK,j)),sub(nn,1),nn,nn)}
function multihypergeometricdistcorr(KK,n,i,j){const nn=gsum(KK);sqrt(div(mul(g(KK,i),g(KK,j)),sub(nn,g(KK,i)),sub(nn,g(KK,j))))}

function negativehypergeometricdistpmf(nn,kk,r,k){return div(mul(ncr(add(k,r,-1),k),ncr(sub(nn,r,k),sub(kk,k))),ncr(nn,kk))}
function negativehypergeometricdistmean(nn,kk,r){div(mul(r,kk),sub(nn,kk,-1))}
function negativehypergeometricdistvar(nn,kk,r){div(mul(r,kk,add(nn,1),sub(1,div(r,sub(nn,kk,-1)))),sub(nn,kk,-1),sub(nn,kk,-2))}

function discreteuniformdistpmf(a,b,k){const n=sub(b,a,-1);return div(1,n)}
function discreteuniformdistcdf(a,b,k){const n=sub(b,a,-1);return div(sub(floor(x),a,-1),n)}
function discreteuniformdistmean(a,b){return div(add(a,b),2);}
function discreteuniformdistmedian(a,b){return div(add(a,b),2);}
function discreteuniformdistvar(a,b){return div(sub(sqr(sub(b,a,-1)),1),12);}
function discreteuniformdistexcesskurtosis(a,b){const n=sub(b,a,-1);return div(mul(6,add(sqr(n),1)),-5,sub(mul(n,n),1));}
function discreteuniformdistkurtosis(a,b){const n=sub(b,a,-1);return add(div(mul(6,add(sqr(n),1)),-5,sub(mul(n,n),1)),3);}
function discreteuniformdistentropy(a,b){const n=sub(b,a,-1);return log(n);}
function discreteuniformdistmgf(a,b,t){const n=sub(b,a,-1);div(sub(pow(z,a),pow(exp(t),add(b,1))),n,sub(1,exp(t)))}
function discreteuniformdistcf(a,b,t){const n=sub(b,a,-1);div(sub(pow(z,a),pow(exp(mul(t,I)),add(b,1))),n,sub(1,exp(mul(t,I))))}
function discreteuniformdistpgf(a,b,z){const n=sub(b,a,-1);div(sub(pow(z,a),pow(z,add(b,1))),n,sub(1,z))}
	
function rademacherdistpmf(k){if(k==-1||k==1)return 0.5;return 0;}
function rademacherdistcdf(k){if(re(k)<-1)return 0;if(re(k)>1)return 1;return 0.5;}
function rademacherdistmgf(t){cosh(t)}
function rademacherdistcf(t){cos(t)}
function rademacherdistpgf(z){cosh(log(t))}

function zetadistpmf(s,k){return div(1,pow(k,s),zeta(s))}
function zetadistcdf(s,k){return div(generalizedharmonicnum(k,s),zeta(s))}
function zetadistmean(s){return div(zeta(sub(s,1)),zeta(s))}
function zetadistvar(s){return div(sub(mul(zeta(s),zeta(sub(s,2))),sqr(zeta(sub(s,1)))),sqr(zeta(s)))}
function zetadistmgf(s,t){return div(polylogarithm(s,exp(t)),zeta(s))}
function zetadistcf(s,t){return div(polylogarithm(s,exp(mul(t,I))),zeta(s))}
function zetadistpgf(s,z){return div(polylogarithm(s,z),zeta(s))}
function zetadistrawmoment(s,n){return div(zeta(sub(s,n)),zeta(s))}
function zetadistentropy(s,n){let z=zeta(s);let fi=math.complex(0,0);for(let k=1;k<bign;k++)fi=add(div(log(mul(pow(k,s),z)),pow(k,s),z));return fi;}

function zipfdistpmf(s,n,k){return div(1,pow(k,s),generalizedharmonicnum(n,s))}
function zipfdistcdf(s,n,k){return div(generalizedharmonicnum(k,s),generalizedharmonicnum(n,s))}
function zipfdistmean(s,n){return div(generalizedharmonicnum(n,sub(s,1)),generalizedharmonicnum(n,s))}
function zipfdistvar(s,n){const ns=generalizedharmonicnum(n,s);return sub(div(generalizedharmonicnum(n,sub(s,2)),ns),div(sqr(generalizedharmonicnum(n,sub(s,1))),ns,ns))}
function zipfdistentropy(s,n){const ns=generalizedharmonicnum(n,s);let fi=math.complex(0,0);for(let k=1;k<=re(n);k++)fi=add(fi,div(log(k),pow(k,s)));return add(div(mul(s,fi),ns),log(ns))}
function zipfdistmgf(s,n,t){const ns=generalizedharmonicnum(n,s);let fi=math.complex(0,0);for(let k=1;k<=re(n);k++)fi=add(fi,div(exp(mul(k,t)),pow(k,s)));return div(fi,ns)}
function zipfdistcf(s,n,t){const ns=generalizedharmonicnum(n,s);let fi=math.complex(0,0);for(let k=1;k<=re(n);k++)fi=add(fi,div(exp(mul(k,t,I)),pow(k,s)));return div(fi,ns)}
function zipfdistpgf(s,n,z){const ns=generalizedharmonicnum(n,s);let fi=math.complex(0,0);for(let k=1;k<=re(n);k++)fi=add(fi,div(exp(mul(k,log(z))),pow(k,s)));return div(fi,ns)}

function zipfmandelbrotdistpmf(n,q,s,k){return div(1,pow(add(k,q),s),incgeneralizedharmonicnum(n,q,s))}
function zipfmandelbrotdistpf(k,n,q,s){return div(1,pow(add(k,q),s),incgeneralizedharmonicnum(n,q,s))}
function zipfmandelbrotdistcdf(n,q,s,k){return div(incgeneralizedharmonicnum(k,q,s),incgeneralizedharmonicnum(n,q,s))}
function zipfmandelbrotdistmean(n,q,s){return sub(div(incgeneralizedharmonicnum(n,q,sub(s,1)),incgeneralizedharmonicnum(n,q,s)),q)}
function zipfmandelbrotdistentropy(n,q,s){const nqs=incgeneralizedharmonicnum(n,q,s);let fi=math.complex(0,0);for(let k=1;k<=re(n);k++)fi=add(fi,div(log(add(k,q)),pow(add(k,q),s)));return add(div(mul(s,fi),nqs),nqs)}

function poissonbinomialpmf(P,k){const n=leng(P);const c=exp(div(mul(2,I,pi()),add(n,1)));let fi=math.complex(0,0);for(let l=0;l<=n;l++){let fid=math.complex(1,0);for(let m=1;m<=n;m++){fid=mul(fid,add(1,mul(sub(pow(c,l),1),g(P,m))))};fi=add(fi,div(fid,pow(c,mul(l,k))))}return div(fi,add(n,1))}
function poissonbinomialpmfi(P,k){/*reverse order parameters*/const n=leng(P);const c=exp(div(mul(2,I,pi()),add(n,1)));let fi=math.complex(0,0);for(let l=0;l<=n;l++){let fid=math.complex(1,0);for(let m=0;m<n;m++){fid=mul(fid,add(1,mul(sub(pow(c,l),1),g(P,m))))};fi=add(fi,div(fid,pow(c,mul(l,k))))}return div(fi,add(n,1))}
function poissonbinomialcdfd(P,k){/*discrete*/let fi=math.complex(0,0);for(let l=0;l<=k;l++)fi=add(fi,poissonbinomialpmf(P,k));return fi;}
function poissonbinomialcdf(P,k){return integral(poissonbinomialpmfi,0,k,P)}
function poissonbinomialmean(P){return gsum(P);}
function poissonbinomialvariance(P){const n=leng(P);let fi=math.complex(0,0);for(let i=0;i<n;i++)fi=add(fi,mul(g(P,i),sub(1,g(P,i))));return fi;}
function poissonbinomialstandartdeviation(P){const n=leng(P);return sqrt(poissonbinomialvariance(P));}
function poissonbinomialskewness(P){const n=leng(P);let fi=math.complex(0,0);for(let i=0;i<n;i++)fi=add(fi,mul(g(P,i),sub(1,g(P,i)),sub(1,mul(2,g(P,i)))));return div(fi,pow(poissonbinomialstandartdeviation(P),3))}
function poissonbinomialexcesskurtosis(P){const n=leng(P);let fi=math.complex(0,0);for(let i=0;i<n;i++)fi=add(fi,mul(g(P,i),sub(1,g(P,i)),sub(1,mul(6,sub(1,g(P,i)),g(P,i)))));return div(fi,pow(poissonbinomialstandartdeviation(P),4))}
function poissonbinomialkurtosis(P){const n=leng(P);let fi=math.complex(0,0);for(let i=0;i<n;i++)fi=add(fi,mul(g(P,i),sub(1,g(P,i)),sub(1,mul(6,sub(1,g(P,i)),g(P,i)))));return add(div(fi,pow(poissonbinomialstandartdeviation(P),4)),3)}
function poissonbinomialmgf(P,t){const n=leng(P);let fi=math.complex(1,0);for(let i=0;i<n;i++)fi=mul(fi,sub(mul(g(P,i),exp(t)),g(P,i),-1));return fi;}
function poissonbinomialcf(P,t){const n=leng(P);let fi=math.complex(1,0);for(let i=0;i<n;i++)fi=mul(fi,sub(mul(g(P,i),exp(mul(I,t))),g(P,i),-1));return fi;}
function poissonbinomialpgf(P,z){const n=leng(P);let fi=math.complex(1,0);for(let i=0;i<n;i++)fi=mul(fi,sub(mul(g(P,i),z),g(P,i),-1));return fi;}

function fishernoncentralhypergeometricdistpmf(m1,m2,n,w,x){return div(mul(ncr(m1,x),ncr(m2,sub(n,x)),pow(w,x)),fishernoncentralhypergeometricdistpk(0,m1,m2,n,w))}
function fnchypg(x,n,m1,nn,w){return fishernoncentralhypergeometricdistpmf(m1,sub(nn,m1),n,w,x)}
function fishernoncentralhypergeometricdistpk(k,m1,m2,n,w){const xmin=maxc(0,sub(n,m2));const xmax=minc(n,m1);let fi=math.complex(0,0);for(let y=xmin;y<=xmax;y++)fi=add(fi,mul(ncr(m1,n),ncr(m2,sub(n,y)),pow(w,y),pow(y,k)));return fi;}
function fishernoncentralhypergeometricdistmean(m1,m2,n,w){return div(fishernoncentralhypergeometricdistpk(1,m1,m2,n,w),fishernoncentralhypergeometricdistpk(0,m1,m2,n,w));}
function fishernoncentralhypergeometricdistvar(m1,m2,n,w){return sub(div(fishernoncentralhypergeometricdistpk(1,m1,m2,n,w),fishernoncentralhypergeometricdistpk(0,m1,m2,n,w)),sqr(div(fishernoncentralhypergeometricdistpk(1,m1,m2,n,w),fishernoncentralhypergeometricdistpk(0,m1,m2,n,w))));}
function fishernoncentralhypergeometricdistmode(m1,m2,n,w){const a=sub(w,1);const b=add(m1,n,sub(0,m1,m2,mul(add(m1,n,2),w)));const c=mul(add(m1,1),add(n,1),w);return div(mul(-2,c),sub(b,sqrt(sub(mul(b,b),mul(4,a,c)))))}
// add function multifishernoncentralhypergeometricdistpmf(M,n,W,X){const c=leng(X);let fi=math.complex(1,0);for(let i=0;i<c;i++)fi=mul(fi,ncr(g(M,i),g(X,i)),pow(g(W,i),g(W,x)));return div(fi,p);
//function multifishernoncentralhypergeometricdistpm0(M,n,W,X){const c=leng(X);let fi=math.complex(0,0);for(let i=0;i<c;i++)fi=mul(fi,ncr(g(M,i),g(X,i)),pow(g(W,i),g(W,x)));return div(fi,p);

function walleniusnoncentralhypergeometricdistpmfd(t,G){const x=g(G,0);const w=g(G,1);const m1=g(G,2);const m2=g(G,3);const n=g(G,4);const d=add(mul(w,sub(m1,x)),sub(m2,sub(n,x)));mul(pow(sub(1,pow(t,div(w,d))),x),pow(sub(1,pow(t,div(1,d))),sub(n,x)))}
function walleniusnoncentralhypergeometricdistpmf(m1,m2,n,w,x){return mul(ncr(m1,x),ncr(m2,sub(n,x)),integral(walleniusnoncentralhypergeometricdistpmfd,0,1,[x,w,m1,m2,n]));}
function wnchypg(x,n,m1,m2,w){return walleniusnoncentralhypergeometricdistpmf(m1,m2,n,w,x);}
function walleniusnoncentralhypergeometricdistarcmean(m1,m2,n,w,mu){return sub(add(div(mu,m1),pow(sub(1,div(sub(n,mu),m2)),w)),1);}
function walleniusnoncentralhypergeometricdistmean(m1,m2,n,w,gues=1){const xmin=maxc(0,sub(n,m2));const xmax=minc(n,m1);return newtoninv("walleniusnoncentralhypergeometricdistarcmean("+m1+","+m2+","+n+","+w+",x)",0,div(add(xmin,xmax),gues));}
function walleniusnoncentralhypergeometricdistvar(m1,m2,n,w,gues=1){const nn=add(m1,m2);const mu=walleniusnoncentralhypergeometricdistmean(m1,m2,n,w,gues);const a=mul(mu,sub(m1,mu));const b=mul(sub(n,mu),add(mu,sub(m2,n)));return div(mul(nn,a,b),sub(nn,1),add(mul(m1,b),mul(m2,a)))}

function hardydistpmf(p,q,m,x){let fi=math.complex(0,0);for(let j=div(add(m,1),2);j<=m;j++)fi=add(fi,mul(ncr(sub(n,1),sub(n,j)),pow(q,sub(n,j),add(hardydista(p,q,j,m),hardydistb(p,q,j,m)))));return fi;}
function hardydista(p,q,j,m){return mul(ncr(sub(j,1),sub(mul(j,2),m,1)),pow(p,sub(m,j,-1)),pow(sub(1,p,q),sub(mul(j,2),m,1)))}
function hardydistb(p,q,j,m){return mul(ncr(j,sub(mul(j,2),m)),pow(p,sub(m,j)),pow(sub(1,p,q),sub(mul(j,2),m)))}
function hardydistoddmgf(p,q,m,t){let fi=math.complex(0,0);for(let j=div(add(m,1),2);j<=m;j++)fi=add(fi,div(mul(add(hardydista(p,q,j,m),hardydistb(p,q,j,m)),exp(mul(j,t))),pow(sub(1,exp(t)),j)));return fi;}
function hardydistoddcf(p,q,m,t){let fi=math.complex(0,0);for(let j=div(add(m,1),2);j<=m;j++)fi=add(fi,div(mul(add(hardydista(p,q,j,m),hardydistb(p,q,j,m)),exp(mul(j,t,I))),pow(sub(1,exp(mul(I,t))),j)));return fi;}
function hardydistoddpgf(p,q,m,z){let fi=math.complex(0,0);for(let j=div(add(m,1),2);j<=m;j++)fi=add(fi,div(mul(add(hardydista(p,q,j,m),hardydistb(p,q,j,m)),exp(mul(j,log(z)))),pow(sub(1,z),j)));return fi;}
function hardydistevenmgf(p,q,m,t){let fi=math.complex(0,0);for(let j=div(add(m,0),2);j<=m;j++)fi=add(fi,div(mul(add(hardydista(p,q,j,m),hardydistb(p,q,j,m)),exp(mul(j,t))),pow(sub(1,exp(t)),j)));return fi;}
function hardydistevencf(p,q,m,t){let fi=math.complex(0,0);for(let j=div(add(m,0),2);j<=m;j++)fi=add(fi,div(mul(add(hardydista(p,q,j,m),hardydistb(p,q,j,m)),exp(mul(j,t,I))),pow(sub(1,exp(mul(I,t))),j)));return fi;}
function hardydistevenpgf(p,q,m,z){let fi=math.complex(0,0);for(let j=div(add(m,0),2);j<=m;j++)fi=add(fi,div(mul(add(hardydista(p,q,j,m),hardydistb(p,q,j,m)),exp(mul(j,log(z)))),pow(sub(1,z),j)));return fi;}
function hardydistmgf(p,q,m,t){return evenodd(hardydistevenmgf(p,q,m,x,t),hardydistoddmgf(p,q,m,x,t),m)}
function hardydistcf(p,q,m,t){return evenodd(hardydistevencf(p,q,m,x,t),hardydistoddcf(p,q,m,x,t),m)}
function hardydistpgf(p,q,m,z){return evenodd(hardydistevenpgf(p,q,m,x,z),hardydistoddpgf(p,q,m,x,z),m)}
function hardydistmean(p,q,m){let fi=math.complex(0,0);for(let j=1;j<=m;j++)fi=add(fi,div(mul(sub(m,j,-1),pow(p,sub(j,1))),pow(sub(q,1),j)));return sub(0,fi);}
function hardydistparthree(p,q,m){return add(mul(ncr(sub(n,1),sub(n,2)),pow(q,sub(n,2)),add(sqr(p),mul(2,p,sub(1,p,q)))),mul(ncr(sub(n,1),sub(n,3)),pow(q,sub(n,3)),add(mul(p,sqr(sub(1,p,q))),cum(sub(1,p,q)))))}
function hardydistparfour(p,q,m){const pq=sub(1,p,q);return add(mul(ncr(sub(n,1),sub(n,2)),pow(q,sub(n,2)),pow(p,2),1),mul(ncr(sub(n,1),sub(n,3)),pow(q,sub(n,3)),add(mul(2,p,p,pq),mul(3,p,pq,pq))),mul(ncr(sub(n,1),sub(n,4)),pow(q,sub(n,4)),add(mul(p,pq,pq,pq),mul(pq,pq,pq,pq))));};
function hardydistparfive(p,q,m){const pq=sub(1,p,q);return add(mul(ncr(sub(n,1),sub(n,3)),pow(q,sub(n,3)),add(mul(p,p,p),mul(3,p,p,pq))),mul(ncr(sub(n,1),sub(n,4)),pow(q,sub(n,4)),add(mul(3,p,p,pq,pq),mul(4,p,pq,pq,pq))),mul(ncr(sub(n,1),sub(n,5)),pow(q,sub(n,5)),add(mul(p,pq,pq,pq,pq),mul(pq,pq,pq,pq,pq))));};

function yulesimondistpmf(p,k){return mul(p,beta(k,add(p,1)));}
function yulesimondistcdf(p,k){return sub(1,mul(k,beta(k,add(p,1))));}
function yulesimondistmean(p){return div(p,sub(p,1))}
function yulesimondistvar(p){return div(sqr(p),sub(p,1),sub(p,1),sub(p,2))}
function yulesimondistskew(p){return div(mul(sqr(add(p,1)),sqrt(sub(p,2))),p,sub(p,3))}
function yulesimondistexcesskurtosis(p){return add(p,3,div(sub(mul(11,p,p,p),mul(49,p),22),p,sub(p,4),sub(p,4)))}
function yulesimondistkurtosis(p){return add(p,6,div(sub(mul(11,p,p,p),mul(49,p),22),p,sub(p,4),sub(p,4)))}
function yulesimondistmgf(p,t){return div(mul(hypg21(1,1,add(p,2),exp(mul(1,t))),p,exp(mul(1,t))),add(p,1))}
function yulesimondistcf(p,t){return div(mul(hypg21(1,1,add(p,2),exp(mul(I,t))),p,exp(mul(I,t))),add(p,1))}
function yulesimondistpgf(p,z){return div(mul(hypg21(1,1,add(p,2),z),p,z),add(p,1))}
function generalizedyulesimondistpmf(p,a,k){return div(mul(p,incbeta(sub(1,a),k,add(p,1))),sub(1,pow(a,p)));}

function skellamdistpmf(m1,m2,k){return mul(exp(sub(0,m1,m2)),pow(div(m1,m2),div(k,2)),besseli(k,mul(2,sqrt(mul(m1,m2)))));}
function skellamdistmean(m1,m2){return sub(m1,m2);}
function skellamdistvar(m1,m2){return add(m1,m2);}
function skellamdistexcesskurtosis(m1,m2){return div(1,add(m1,m2));}
function skellamdistkurtosis(m1,m2){return sub(div(1,add(m1,m2)),3);}
function skellamdistmgf(m1,m2,t){return exp(sub(mul(m2,exp(sub(0,t))),mul(-1,m1,exp(t)),m1,m2));}
function skellamdistcf(m1,m2,t){return exp(sub(mul(m2,exp(sub(0,mul(I,t)))),mul(-1,m1,exp(mul(I,t))),m1,m2));}
function skellamdistpgf(m1,m2,z){return exp(sub(mul(m2,exp(sub(0,log(z)))),mul(-1,m1,z),m1,m2));}

function boreldistpmf(m,n){return div(mul(exp(mul(-1,m,n)),pow(mul(m,n),sub(n,1))),factorial(n));}
function boreltannerdistpmf(m,k,n){return div(mul(k,exp(mul(-1,m,n)),n,pow(mul(m,n),sub(n,1))),factorial(sub(n,k)));}
function boreldistmf(m,n){return div(mul(sub(1,m),exp(mul(-1,m,n)),pow(mul(m,n),sub(n,1))),gamma(n));}
function boreldistmean(m){return div(1,sub(1,m))}
function boreldistvar(m,n){return div(m,cum(sub(1,m)))}

function panjerdistpmf(a,l,k){let fi=math.complex(1,0);for(let i=0;i<k;i++)fi=mul(fi,div(add(a,i),add(a,l)));return div(mul(fi,pow(l,k)),pow(add(1,div(l,a)),a),factorial(k))}
function panjerdistmean(a,l){return l;}
function panjerdista(a,l){return div(l,add(a,l));}
function panjerdistb(a,l){return div(mul(l,sub(a,1)),add(a,l));}
function panjerdistp0(a,l){return pow(add(1,div(l,a)),sub(0,a));}
function panjerdistvar(a,l){return mul(l,add(1,div(l,a)));}
function panjerdistmgf(a,l,t){return pow(sub(1,div(mul(l,sub(1,exp(t))),a)),sub(0,a));}
function panjerdistcf(a,l,t){return pow(sub(1,div(mul(l,sub(1,exp(mul(I,t)))),a)),sub(0,a));}
function panjerdistpgf(a,l,z){return pow(sub(1,div(mul(l,sub(1,z)),a)),sub(0,a));}

function logdistpmf(p,k){return div(mul(-1,pow(p,k)),k,log(sub(1,p)));}
function logdistcdf(p,k){return add(1,div(incbeta(p,add(k,1),0),log(sub(1,p))))}
function logdistmean(p){return div(p,log(sub(1,p)),sub(1,p),-1);}
function logdistvar(p){return div(add(mul(p,p),mul(p,log(sub(1,p)))),sqr(sub(1,p)),sqr(log(sub(1,p))));}
function logdistmgf(p,t){return div(log(sub(1,mul(p,exp(t)))),log(sub(1,p)));}
function logdistcf(p,t){return div(log(sub(1,mul(p,exp(mul(I,t))))),log(sub(1,p)));}
function logdistpgf(p,z){return div(log(sub(1,mul(p,z))),log(sub(1,p)));}

function geometricdistpmf(p,k){return mul(pow(sub(p,1),sub(k,1)),p);}
function geometricdistcdf(p,k){return sub(pow(sub(1,p),floor(x)))}
function geometricdistmean(p){return div(1,p)}
function geometricdistvar(p){return div(sub(1,p),p,p)}
function geometricdistmedian(p){return sub(ceil(div(-1,log2(sub(1,p)))),0)}
function geometricdistexcesskurtosis(p){return add(6,div(sqr(p),sub(1,p)))}
function geometricdistkurtosis(p){return add(9,div(sqr(p),sub(1,p)))}
function geometricdistentropy(p){return div(sub(mul(-1,sub(1,p),log(sub(1,p))),mul(p,log(p))),p)}
function geometricdistmgf(p,t){return div(mul(p,exp(t)),sub(1,mul(sub(1,p),exp(t))))}
function geometricdistcf(p,t){return div(mul(p,exp(mul(I,t))),sub(1,mul(sub(1,p),exp(mul(I,t)))))}
function geometricdistpgf(p,z){return div(mul(p,z),sub(1,mul(sub(1,p),z)))}
function geometricdistfisherinfo(p){return div(1,p,p,sub(1,p))}

function geometric0distpmf(p,k){return mul(pow(sub(p,1),sub(k,0)),p);}
function geometric0distcdf(p,k){return sub(pow(sub(1,p),add(floor(x),1)))}
function geometric0distmean(p){return div(sub(1,p),p)}
function geometric0distvar(p){return div(sub(1,p),p,p)}
function geometric0distmedian(p){return sub(ceil(div(-1,log2(sub(1,p)))),1)}
function geometric0distexcesskurtosis(p){return add(6,div(sqr(p),sub(1,p)))}
function geometric0distkurtosis(p){return add(9,div(sqr(p),sub(1,p)))}
function geometric0distentropy(p){return div(sub(mul(-1,sub(1,p),log(sub(1,p))),mul(p,log(p))),p)}
function geometric0distmgf(p,t){return div(mul(p,1),sub(1,mul(sub(1,p),exp(t))))}
function geometric0distcf(p,t){return div(mul(p,1)),sub(1,mul(sub(1,p),exp(mul(I,t))))}
function geometric0distpgf(p,z){return div(mul(p,1),sub(1,mul(sub(1,p),z)))}
function geometric0distfisherinfo(p){return div(1,p,p,sub(1,p))}

function gausskuzmindistpmf(k){return sub(0,log2(sub(1,div(1,sqr(add(k,1))))))}
function gausskuzmindistcdf(k){return sub(0,log2(div(add(k,2),add(k,1))))}
//function gausskuzmindistcdfdif(k,k2)/*<*/{return sub(sub(0,log2(div(add(k2,2),add(k2,1)))),sub(0,log2(div(add(k,2),add(k,1)))))}
//function gausskuzmindistdelta(s,n=bign){return sub(div(summate("biggerthan(cutcontinuedfraction(randomfloat(0,1),2),"+s+")",1,bign,11),bign),log2(add(1,s)))}//return sub(gausskuzmindistcdfdif(cutcontinuedfractionl(randomfloat(0,1),n),s),log2(add(1,s)))}
//function gausskuzmindistpsi(s,n=bign){return div(gausskuzmindistdelta(s,n),pow(sub(0,0.30366),n))}

function gfloryschulzdistpmf(a,k){return mul(a,a,k,pow(sub(1,a),sub(k,1)))}
function gfloryschulzdistcdf(a,k){return sub(1,mul(pow(sub(1,a),k),add(1,mul(a,k))))}
function gfloryschulzdistmean(a){return sub(div(a,2),1)}
function gfloryschulzdistmedian(a){return sub(div(lambertw(div(mul(pow(sub(1,a),div(1,a)),log(sub(1,a))),2,a)),log(sub(1,a)),div(1,a)))}
function gfloryschulzdistmode(a){return div(-1,log(sub(1,a)))}
function gfloryschulzdistvar(a){return div(sub(2,mul(2,a)),a,a)}
function gfloryschulzdistskew(a){return div(sub(2,a),sqrt(sub(2,mul(2,a))))}
function gfloryschulzdistexcesskurtosis(a){return div(add(mul(sub(a,6),a),6),sub(2,a,a))}
function gfloryschulzdistkurtosis(a){return add(div(add(mul(sub(a,6),a),6),sub(2,a,a)),3)}
function gfloryschulzdistmgf(a,t){return div(mul(a,a,exp(t)),sqr(add(mul(sub(a,1),exp(t)),1)))}
function gfloryschulzdistcf(a,t){return div(mul(a,a,exp(mul(I,t))),sqr(add(mul(sub(a,1),exp(mul(I,t))),1)))}
function gfloryschulzdistpgf(a,z){return div(mul(a,a,z),sqr(add(mul(sub(a,1),z),1)))}

function conwaymaxwellpoissonpmf(l,v,x){return div(pow(l,x),pow(factorial(x),v),conwaymaxwellpoissonz(l,v))}
function conwaymaxwellpoissoncdfh(l,v,x){return sub(div(hypergeometric([],repeatnum(add(n,2),l),sub(v,1)),pow(factorial(add(n,1)),sub(v,1)),hypergeometric([],repeatnum(1,sub(v,1)),l)))}
function conwaymaxwellpoissoncdf(l,v,x){let fi=math.complex(0,0);for(let i=0;i<=x;i++)fi=add(fi,conwaymaxwellpoissonpmf(l,v,i));return fi;}
function conwaymaxwellpoissonmean(l,v){let fi=math.complex(0,0);for(let j=0;j<=x;j++)fi=add(fi,div(mul(j,pow(l,j)),pow(factorial(j),v),conwaymaxwellpoissonz(l,v)));return fi;}
function conwaymaxwellpoissonmode(l,v){return floor(pow(l,div(1,v)))}
function conwaymaxwellpoissonvar(l,v){let fi=math.complex(0,0);for(let j=0;j<=x;j++)fi=add(fi,div(mul(j,j,pow(l,j)),pow(factorial(j),v),conwaymaxwellpoissonz(l,v)));return sub(fi,sqr(conwaymaxwellpoissonmean(l,v)));}
function conwaymaxwellpoissonstandartdeviation(l,v){return sqrt(conwaymaxwellpoissonvar(l,v))}
function conwaymaxwellpoissonmgf(l,v,t){return div(conwaymaxwellpoissonz(mul(l,exp(t)),v),conwaymaxwellpoissonz(l,v))}
function conwaymaxwellpoissoncf(l,v,t){return div(conwaymaxwellpoissonz(mul(l,exp(mul(I,t))),v),conwaymaxwellpoissonz(l,v))}
function conwaymaxwellpoissonpgf(l,v,z){return div(conwaymaxwellpoissonz(mul(l,z),v),conwaymaxwellpoissonz(l,v))}
function conwaymaxwellpoissonmoment(l,v,m){return div(mul(pow(l,div(m,2)),besseli(m,mul(2,sqrt(l)))),besseli(0,mul(2,sqrt(l))))}
function conwaymaxwellpoissonmaxlike(l,v,X){const s1=gsum(X);const s2=glogfactorialsum(X);return mul(pow(l,s1),exp(mul(-1,v,s2)),pow(conwaymaxwellpoissonz(l,v),sub(0,n)))}

function hermitedistpmf(a1,a2,x){let fi=math.complex(0,0);for(let j=0;j<=div(x,2);j++)fi=add(fi,div(mul(pow(a1,sub(x,j,j)),pow(a2,j)),factorial(sub(x,j,j)),factorial(j)));return mul(fi,exp(sub(0,a1,a2)));}
function hermitedistcdf(a1,a2,x){let fi=math.complex(0,0);for(let j=0;j<=div(x,1);j++)fi=add(fi,div(hermitedistpmf(a1,a2,j),exp(sub(0,a1,a2))));return mul(fi,exp(sub(a2,a1)));}
function hermitedistmean(a1,a2){return add(a1,a2,a2)}
function hermitedistvar(a1,a2){return add(a1,a2,a2,a2,a2)}
function hermitedistskew(a1,a2){return div(add(a1,mul(8,a2)),pow(add(a1,a2,a2,a2,a2),div(3,2)))}
function hermitedistexcesskurtosis(a1,a2){return div(add(a1,mul(16,a2)),pow(add(a1,a2,a2,a2,a2),2))}
function hermitedistkurtosi(a1,a2){return add(3,div(add(a1,mul(16,a2)),pow(add(a1,a2,a2,a2,a2),2)))}
function hermitedistmgf(a1,a2,t){return exp(add(mul(a1,sub(exp(t),1)),mul(a2,sub(exp(mul(2,t)),1))))}
function hermitedistcf(a1,a2,t){return exp(add(mul(a1,sub(exp(mul(t,I)),1)),mul(a2,sub(exp(mul(2,t,I)),1))))}
function hermitedistpgf(a1,a2,s){return exp(add(mul(a1,sub(s,1)),mul(a2,sub(mul(s,s),1))))}

function delaportedistpmf(l,a,b,k){let fi=math.complex(0,0);for(let i=0;i<=k;i++)fi=add(fi,div(mul(gamma(add(a,i)),pow(b,i),pow(l,sub(k,i)),exp(sub(0,l))),gamma(a),factorial(i),pow(add(1,b),add(a,i)),factorial(sub(k,i))));return fi;}
function delaportedistcdf(l,a,b,k){let fi=math.complex(0,0);for(let i=0;i<=k;i++)fi=add(fi,delapurtedistpmf(l,a,b,i));return fi;}
function delaportedistmean(l,a,b){return add(l,mul(a,b))}
function delaportedistmode(l,a,b){return add(l,mul(sub(a,1),b))}
function delaportedistvar(l,a,b){return add(l,mul(a,b,add(1,b)))}
function delaportedistskew(l,a,b){return div(add(l,mul(a,b,add(a,b,b,mul(2,b,b)))),pow(add(l,mul(a,b,add(1,b))),1.5))}
function delaportedistexcesskurtosis(l,a,b){return div(add(l,mul(3,l,l),mul(a,b,add(1,mul(6,l),mul(6,l,b),mul(7,b),mul(12,b,b),mul(6,b,b,b),mul(3,a,b),mul(6,a,b,b),mul(3,a,b,b)))),pow(add(l,mul(a,b,add(1,b))),2))}
function delaportedistkurtosis(l,a,b){return add(div(add(l,mul(3,l,l),mul(a,b,add(1,mul(6,l),mul(6,l,b),mul(7,b),mul(12,b,b),mul(6,b,b,b),mul(3,a,b),mul(6,a,b,b),mul(3,a,b,b)))),pow(add(l,mul(a,b,add(1,b))),2)),3)}
function delaportedistmgf(l,a,b,t){return div(exp(mul(l,sub(exp(t),1))),pow(sub(1,mul(b,sub(exp(t),1))),a))}
function delaportedistcf(l,a,b,t){return div(exp(mul(l,sub(exp(mul(I,t)),1))),pow(sub(1,mul(b,sub(exp(mul(I,t)),1))),a))}
function delaportedistpgf(l,a,b,z){return div(exp(mul(l,sub(z,1))),pow(sub(1,mul(b,sub(z,1))),a))}

function poissondistpmf(l,k){return div(mul(pow(l,k),exp(sub(0,l))),factorial(k))}
function poissondistcdf(l,k){return div(incgamma(floor(add(k,1)),l),factorial(floor(k)))}
function poissondistmean(l){return l}
function poissondistvar(l){return l}
function poissondistmedian(l){return floor(add(l,div(1,3),div(-1,50,l)))}
function poissondistskew(l){return div(1,sqrt(l))}
function poissondistexcesskurtosis(l){return div(1,l)}
function poissondistkurtosis(l){return add(3,div(1,l))}
function poissondistentropy(l){let fi=math.complex(0,0);for(let k=0;k<bign;k++)fi=add(fi,div(mul(pow(l,k),log(factorial(k))),factorial(k)));return add(fi,mul(l,sub(1,log(l))))}
function poissondistmgf(l,t){return exp(mul(l,sub(exp(t),1)))}
function poissondistcf(l,t){return exp(mul(l,sub(exp(mul(I,t)),1)))}
function poissondistpgf(l,z){return exp(mul(l,sub(z,1)))}
function poissondistfisherinfo(l){return div(1,l)}
function poissondistmoment(l){return touchardpoly(k,l)}

function displacedpoissondistpmf(l,r,n){return div(mul(exp(sub(0,l)),pow(l,add(n,r))),factorial(add(n,r)),pearsonincgamma(r,l))}
function displacedpoissondistvar(l,r){return l}
function displacedpoissondistmean(l,r){return sub(l,r)}
function displacedpoissondistmode(l,r){return floor(sub(l,r))}
function displacedpoissondistmgf(l,r,t){return div(mul(exp(sub(mul(l,exp(sub(t,1))),mul(t,r))),pearsonincgamma(r,mul(l,exp(t)))),pearsonincgamma(r,l))}
function displacedpoissondistcf(l,r,t){return div(mul(exp(sub(mul(l,exp(sub(mul(I,t),1))),mul(t,r))),pearsonincgamma(r,mul(l,exp(mul(I,t))))),pearsonincgamma(r,l))}
function displacedpoissondistpgf(l,r,z){return div(mul(exp(sub(mul(l,exp(sub(log(z),1))),mul(t,r))),pearsonincgamma(r,mul(l,z))),pearsonincgamma(r,l))}


function zerotruncatedpoissondistpmf(l,k){return div(pow(l,k),sub(exp(l),1),factorial(k))}
function zerotruncatedpoissondistpmfinsurance(l,k){return div(mul(pow(l,k),exp(sub(0,l))),sub(1,exp(l)),factorial(k))}
function zerotruncatedpoissondistmean(l){return div(l,sub(1,exp(sub(0,l))))}
function zerotruncatedpoissondistvar(l){return sub(div(add(l,mul(l,l)),sub(1,exp(sub(0,l)))),div(sqr(l),sqr(sub(1,exp(sub(0,l))))))}



//weird guys
function polyadistpmf(n,m,r,c,x){return div(mul(ncr(add(div(r,c),x,-1),x),ncr(sub(n,1,x,div(sub(nn,r),c,-1)),sub(n,x))),ncr(add(div(nn,c),n,-1),n))}
function arfwedsondistpmf(n,x){let fi=math.complex(0,0);for(let j=0;j<bign;j++)fi=add(fi,mul(pow(sub(x,j),n),pow(-1,j),ncr(x,j)));return fi;}
function idealdist(i,k=1){if(i==1)return div(1,k);return div(1,i,sub(i,1))}
function robustdist(i,k,d=1,c=-123){let R=d;if(d!=123) R=mul(c,log(div(k,d)),sqrt(k));if(re(i)<re(div(k,R)))return div(R,k,i);if(i==div(K,R))return div(mul(R,log(div(R,d))),K);return 0;}
function benfordpmf(d,b=10){return div(log(add(1,div(1,d))),log(b))}
function parabolicfractaldist(n,b,c,k=1){return mul(k,pow(n,sub(0,b)),exp(mul(-1,c,sqr(log(n)))));}
function rutherfordcontagiousdist(n,x,p){if(n==0)return 0;if(n<x)return 0;return add(mul(p,rutherfordcontagiousdist(n-1,x-1)),mul(sub(1,p),rutherfordcontagiousdist(n-1,x)))}
function rutherfordcontagiousdistlinear(n,x,p,c=1){if(n==0)return 0;if(n<x)return 0;return add(mul(add(p,mul(c,sub(x,1))),rutherfordcontagiousdist(n-1,x-1)),mul(sub(1,add(p,mul(c,x))),rutherfordcontagiousdist(n-1,x)))}
function rutherfordcontagiousdistlist(n,x,P){if(n==0)return 0;if(n<x)return 0;return add(mul(g(P,x-1),rutherfordcontagiousdist(n-1,x-1)),mul(sub(1,g(P,x)),rutherfordcontagiousdist(n-1,x)))}
































    var allFunctions = {};
	var allFunctionsNames = [];
function importAllFunctionsToMath() {


    for (var i in window) {
        // Ensure the property is a function and not already a math function
        if (typeof window[i] === "function" && !math[i]) {
            allFunctions[window[i].name] = window[i];
			allFunctionsNames.push(i);
        }
    }

    // Import only the non-conflicting functions into math
    math.import(allFunctions, { override: true });
//	if(a)console.log(allFunctions);
}

// Call the function to import all global functions to math
importAllFunctionsToMath();
	//https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}


// Call the function to import all global functions to math
math.import({
factorial:factorial,
factoriel:factorial,
superlog:slog,
perpendicularmandel:perpendicularmandelbrot,
mandel:mandelbrot,
thomae:thomea,
ln:log,
	    },
    { override: true }
);