
var gl;
var points;

//웹 페이지가 로드되면 실행되는 함수
window.onload = function init()
{
    //html 문서에 CANVAS를 가져옴
    var canvas = document.getElementById( "gl-canvas" );
    
    //WebGL context 초기화
    gl = WebGLUtils.setupWebGL( canvas );
    //WebGL 사용 가능 여부 확인. 불가능 시 경고 메시지 표시
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    
    var sideLength = 0.5; //정오각형 변의 길이 설정
    var numVertices = 5; //정오각형 꼭짓점 개수 설정
    var vertices = []; //정오각형 꼭짓점 좌표를 저장할 배열

    //중심에서 각 꼭짓점까지의 거리 (반지름) 계산
    var radius = sideLength / (2 * Math.sin(Math.PI / numVertices)); 

    //정오각형의 꼭짓점 좌표 계산을 위한 반복문 시작
    //시작 각도를 위쪽으로 설정하기 위헤 offsetAngle 값에 90 추가
    //반복문 내부에서는 각도 계산 후 x와 y 좌표 값을 계산하여 vertices 배열에 추가
    var offsetAngle = 90; // Start from the top
    for (var i = 0; i < numVertices; i++) {
        var angle = ((i * 360 / numVertices) + offsetAngle) * (Math.PI / 180);
        var x = radius * Math.cos(angle);
        var y = radius * Math.sin(angle);
        vertices.push(vec2(x, y));//vec2 -> 좌표 저장 데이터 타입
    }

    
    
    

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

// 렌더링 함수: 캔버스 지우기 및 정오각형 그리기
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT ); // 캔버스 지우기
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 ); // 정오각형 그리기
}