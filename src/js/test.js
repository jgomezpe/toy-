/**
*
* test.js
* <P>Java Script for test the Toy+ programming language.</P>
* <P>Requires base64.js, kompari.js, lifya.js, jxon.js, funpl.js, and toyplus.js (toyplus_wrap.js)</P>
*
* Copyright (c) 2021 by Jonatan Gomez-Perdomo. <br>
* All rights reserved. See <A HREF="https://github.com/jgomezpe/lifya">License</A>. <br>
*
* @author <A HREF="https://disi.unal.edu.co/~jgomezpe/"> Professor Jonatan Gomez-Perdomo </A>
* (E-mail: <A HREF="mailto:jgomezpe@unal.edu.co">jgomezpe@unal.edu.co</A> )
* @version 1.0
*/

ToyPlus = {
    print( tab, t ) {
        var s = ''
        var obj = t.value
        for( var k=0; k<tab; k++ ) 
            s += ' '
        
        if( Array.isArray(obj) ) {
            s += t.type
            console.log(s)
            for( var i=0; i<obj.length; i++ ) {
                this.print(tab+1, obj[i])
            }
        }else {
            console.log(s+obj)
        }
    },

    load(decrement) {
       return new ToyPusAPI(decrement)    
    },

    usingAPI() {
        console.log("==============================");
        var api = this.load(true)
        console.log(api.values())
        console.log(api.opers_explain())
        try {
            var code = "% Hello World\ndec(X)=¬(X)\nsum(5+X,Y)=X+Y"
            var command = "sum(23, 10)"
            api.compile(code)
            var obj = api.run(command)
            console.log("Result:"+obj)
       }catch(e) { console.error(e) }
    },
    
    stepByStep() {
        console.log("==============================");
        code = "% Hello World\ndec(X)=¬(X)\nsum(5+X,Y)=X+Y"
        var lexer = new FunLexer(false, new NatLexeme(), new Words(FunConstants.PRIMITIVE,["¬","+"]))
        var opers = {"¬":[1, 10], "+":[2, 2]}
        var parser = new FunParser(opers,FunConstants.DEF_LIST)
        var machine = new FunMachine()
        machine.setPrimitives( {"+":new Plus(machine),"¬":new Decrement(machine)} )
        machine.value = new NatValues()
        machine.assignment = new ToyPlusAssignment()
        var meaner = new FunMeaner(machine)
        try {
            console.log(code)
            lexer.init(code)
            var t = parser.analize(lexer)
            ToyPlusTest.print(0,t)
            var p = meaner.apply(t).value
            console.log(p)
            var result = p.execute("sum", [10, 23] )
            console.log("Result:"+result)
        } catch (e) { console.error(e) }
        
    },
    
    main() {
        ToyPlusTest.usingAPI() // Uncomment to use the FunAPI associated to ToyPlus 
        // ToyPlusTest.stepByStep() // Uncomment to see step by step
    }
/*
    p(X,0) = 0
    p(X,Y+1) = p(X,Y) + X
*/
}
