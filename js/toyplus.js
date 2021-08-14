/**
*
* toyplus.js
* <P>Java Script for ToyPlus language.</P>
* <P>A numtseng module <A HREF="https://numtseng.com/modules/toyplus.js">https://numtseng.com/modules/toyplus.js</A> 
*
* Copyright (c) 2021 by Jonatan Gomez-Perdomo. <br>
* All rights reserved. See <A HREF="https://github.com/jgomezpe/toyplus">License</A>. <br>
*
* @author <A HREF="https://disi.unal.edu.co/~jgomezpe/"> Professor Jonatan Gomez-Perdomo </A>
* (E-mail: <A HREF="mailto:jgomezpe@unal.edu.co">jgomezpe@unal.edu.co</A> )
* @version 1.0
*/

class ToyPlusAssignment extends FunAssignment{
    check( variable,  obj) {
        return Number.isInteger(obj)
    }
}

class Decrement extends FunCommand{

    constructor(machine=null) { 
        super(machine) 
        this.arity = 1
        this.name = "¬"
    }

    execute( args ){ return args[0]-1 }

    reverse(i, toMatch) {
        if( toMatch[0]==null ){
            if( i<=0 ) throw this.exception("·Invalid operation· " + this.name + "(" + i +")")
            return [i-1]
        }
        j=toMatch[0]
        if(j+1!=i) throw this.exception("·Mismatch· " + i)
        return [j]
    }
}

class NatLexeme extends Lexeme{
    constructor(){
        super()
        this.type = FunConstants.VALUE 
    }

    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(!this.startsWith(input.get(start)))
            return this.error(input, start, start)
        var n = end
        end=start+1
        while(end<n && Character.isDigit(input.get(end))) end++
        return this.token(input, start, end, Number.parseInt(input.substring(start,end)))
    }

    startsWith(c) { return Character.isDigit(c) }
}

class NatValues extends FunValueInterpreter{
    constructor(){
     super() 
     this.lexeme = new NatLexeme()
    }
    get(value) { return Number.parseInt(value) }

    valid(value) {
        return !isNaN(value)
    }

    description() { return "·Natural numbers·" }
}

class Plus extends FunCommand{
    constructor(machine=null) {
        super(machine)
        this.name = "+"
        this.arity = 2
    }

    execute( args ) {
        try {
            var s=args[0]
            for(var i=1; i<args.length; i++) s += args[i]
            return s
        }catch(e) { throw this.exception("·Undefined·") }
    }

    reverse(i, original ){
        if(original[0]==null && original[1]==null){
            if(i<=0) 
                throw this.exception("·Invalid reversed operation· " + this.name + "(" + i + ", 1)")
            return [i-1,1]
        }
        if(original[0]==null){
            var j=original[1]
            if(i-j<0) 
                throw this.exception("·Invalid reversed operation· " + this.name + "(" + i + "," + j + ")")
            return [i-j,j]
        }
        if(original[1]==null){
            var j=original[0]
            if(i-j<0) 
                throw this.exception("·Invalid reversed operation· " + this.name + "(" + j + "," + i + ")")
            return [j,i-j]
        }
        var j=original[0]
        var k=original[1]
        if(j+k!=i) 
            throw this.exception("·Argument mismatch· " + this.name + "( " + j + "," +k + ") =" + i)
        return [j,k]
    }
}

class ToyPlusAPI extends FunAPI{
    constructor(jxon) {
        super()         
        this.canStartWithNumber=false
        this.config(jxon)
    }
    
    config(jxon) {
        super.config(jxon)
        this.value = new NatValues()
        this.machine.value = this.value
        this.assignment = new ToyPlusAssignment()
        var opers = jxon.commands
        for( var i=0;i<opers.length; i++ ) {
            if( opers[i]=="+" ) this.addOperator(new Plus(), 1)
            else if( opers[i] == "¬" ) this.addOperator(new Decrement(), 2)
        }
    }
}

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
