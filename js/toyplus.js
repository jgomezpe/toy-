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

/////// Kompari.js ////////////
/**
 * Determines if the first number is less than (in some order) the second number(one<two)
 * @param one First number
 * @param two Second number
 * @return (one<two)
 */
function l2h(one,two){ return (one-two) }

/**
 * Determines if the first number is greater than (in some order) the second number(one<two)
 * @param one First number
 * @param two Second number
 * @return (one>two)
 */
function h2l(one,two){ return (two-one) }

Compare = {
    equals(one, two){
        if(one.equals !== undefined) return one.equals(two)
        else return one==two
    }    
}

/**
 * <p>Searching algorithm for sorted arrays of objects</p>
 * 
 * <p>Copyright: Copyright (c) 2010</p>
 * 
 * @author Jonatan Gomez Perdomo
 * @version 1.0
 */
class SortedSearch {
    /**
     * Creates a search operation for the given sorted array
     * @param sorted Array of elements (should be sorted)
     */
    constructor(order, sorted){ 
        this.order = order
        this.sorted = sorted
    }
    
    /**
     * Searches for the position of the given element. The vector should be sorted
     * @param x Element to be located
     * @return The position of the given object, -1 if the given object is not in the array
     */
    find(x, start, end) { 
        end = end || this.sorted.length
        start = start || 0
        var pos = this.findRight(x, start, end)
        if (pos > start && this.order(x, this.sorted[pos-1]) == 0) pos--
        else pos = -1
        return pos
    }

    /**
     * Determines if the sorted array contains the given element (according to the associated order)
     * @param x Element to be located
     * @return <i>true</i> if the element belongs to the sorted array, <i>false</i> otherwise
     */
    contains(x, start, end){ return (this.find(x, start, end) != -1) }

    /**
     * Searches for the position of the first element in the array that is bigger
     * than the element given. The array should be sorted
     * @param x Element to be located
     * @return Position of the object that is bigger than the given element
     */
    findRight(x, start, end){ 
        end = end || this.sorted.length
        start = start || 0
        if(end > start) {
            var a = start
            var b = end - 1
            if (this.order(x, this.sorted[a]) < 0)  return start
            if (this.order(x, this.sorted[b]) >= 0) return end
            while (a + 1 < b) {
                var m = Math.floor((a + b) / 2)
                if (this.order(x, this.sorted[m]) < 0) b = m
                else a = m
            }
            return b
        }else return start
    }

    /**
     * Searches for the position of the last element in the array that is smaller
     * than the element given. The array should be sorted
     * @param x Element to be located
     * @return Position of the object that is smaller than the given element
     */
    findLeft(x, start, end) {
        end = end || this.sorted.length
        start = start || 0
        if (end > start) {
            var a = start
            var b = end - 1
            if (this.order(x, this.sorted[a]) <= 0)  return start-1
            if (this.order(x, this.sorted[b]) > 0) return b
            while (a + 1 < b) {
                var m = Math.floor((a + b) / 2)
                if (this.order(x, this.sorted[m]) <= 0) b = m
                else a = m
            }
            return a
        }else return start
    } 
}

//////// Base64.js ///////////////
/** Object for coding/decoding uint8 arrays tto/from byte64 strings  */
Base64 ={
    /**
     * From int to char
     */
    i2a : ['A','B','C','D','E','F','G','H','I','J','K','L','M',
                     'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                     'a','b','c','d','e','f','g','h','i','j','k','l','m',
                     'n','o','p','q','r','s','t','u','v','v','x','y','z',
                     '0','1','2','3','4','5','6','7','8','9','+','/'],
   
   /** 
    * Generates the dictionary for decodign a char to int
    */ 
    init(){
        if( Base64.a2i === undefined ){
            Base64.a2i = {}
            for( var k=0; k<Base64.i2a.length; k++ )
                Base64.a2i[Base64.i2a[k]] = k           
        }        
    },
    
    /**
     * Decodes a base64 string into a uint8 array if possible
     * @param str Base64 string
     * @return The uint8 array encode by the base64 string if possible
     * @throws An exception if the string does not represent a valid base64 code 
     */
    decode(str){
        Base64.init()
        var end = str.length
        while(end>=0 && str.charAt(end-1)=='=') end--
        if(end<2) throw '·Invalid Base64 string at· ' + end
        var m = (end%4)
        if(m==1) throw '·Invalid Base64 string at· ' + (end-1)
        if(m>1) m--
        var n = 3*Math.floor(end/4) + m
        var blob = new Uint8Array(n)
        var control =[[2,4,1],[4,2,1],[6,0,2]]
        var left, right
        var k=0
        var c=0
        for(var i=0; i<n; i++){
            left = Base64.a2i[str.charAt(k)]
            right = Base64.a2i[str.charAt(k+1)]
            if(left===undefined || right===undefined) throw '·Invalid Base64 string at· ' + k
            blob[i] =  (left << control[c][0]) |( right >> control[c][1])
            k+=control[c][2]
            c = (c+1)%3
        } 
        return blob
    },
    
    /**
     * Encodes a uint8 array into a base64 string if possible 
     * @param blob uint8 array to encode
     * @return A base64 string representation of the uint8 array
     * @throws An exception if the argument is not a uint8 array 
     */
    encode(blob){
        Base64.init()
        if( blob.byteLength === undefined ) throw '·Not a byte array·'
        var str=''
        var m = (blob.length%3)
        if(m>0) m++        
        var n = 4*Math.floor(blob.length/3) + m
        var k=0
        var c=0
        for(var i=0; i<n; i++){
            c=i&3
            switch(c){
                case 0: str += Base64.i2a[blob[k]>>2]; break;
                case 1: str += Base64.i2a[((blob[k]&3)<<4) | (blob[k+1]>>4)]; break;
                case 2: str += Base64.i2a[((blob[k]&15)<<2) | (blob[k+1]>>6)]; break;
                case 3: str += Base64.i2a[blob[k]&63]; break;
            }
            if(c!=0) k++        
        }
        while(m<4){
            str+='='
            m++
        }     
        return str
    },
    
    /**
     * Encodes a string into a base64 string if possible 
     * @param str str to encode
     * @param encoder Byte level encoder for the source string
     * @return A base64 string representation of the string
     * @throws An exception if the argument is not a string
     */
    atob(str, encoder=new TextEncoder()){
        return Base64.enconde(encoder.encode(str))
    },

    /**
     * Decodes a base64 string into a string if possible
     * @param str Base64 string
     * @param encoder Byte level encoder for the traget uint8 array
     * @return The string encode by the base64 string if possible
     * @throws An exception if the string does not represent a valid base64 code 
     */
    btoa(str, decoder=new TextDecoder()){
        return decoder.decode(Base64.decode(str))
    }
}

/////// Lyfia.js ////////////
class Source{   
    constructor(input, id) {
        this.id = id || 'noname'
        this.input = input
        this.rows = []
        this.search = new SortedSearch(l2h, this.rows)
        this.rows.push(0)
        for(var i=0; i<input.length; i++) {
            if(input.charAt(i)=='\n') this.rows.push(i+1)
        }
        this.length = input.length
    }
   
    pos(index) {
        var idx = this.search.findLeft(index)
        if(idx+1<this.rows.length && this.rows[idx+1]==index)
            return [idx+1,0]
        return [idx, index-this.rows[idx]]
    }
    
    get(index) { return this.input.charAt(index) }
    
    substring(start,end) { return this.input.substring(start,end) }
}

class Position{
    static INPUT = "input"
    static START = "start"
    static ROW = "row"
    static COLUMN = "column"
    constructor(input, start){
        this.input = input
        this.start = start 
    }
    
    shift(delta) { start+=delta }

    config(json) {
        this.input = json.input
        this.start = json.start
    }

    json() {
    	var pos = this.input.pos(this.start)
	return {"input":this.input.id, "start":this.start,
		"row":pos[0], "column":pos[1]}
    }
}

class Token extends Position{    
    static ERROR = 'error'
        
    constructor(input, start, end, value, type){
        super(input, start)
        this.end = end
        this.type = type || Token.ERROR
        this.value = value
    }

    size(){ return this.end-this.start }
    
    shift(delta) {
        this.start+=delta
        this.end+=delta
    }

    json() {
        var json = super.json()
        json.end = this.end
        json.value = this.value
        json.type = this.type
        return json
    }
    
    toError() { return new Token(this.input,this.start,this.end,this.type) }
    
    isError() { return this.type==Token.ERROR }
}

Character = {
    isDigit(c){ return '0'<=c && c<='9' },
    isLowerCase(c){ return ('a'<=c && c<='z') },
    isUpperCase(c){ return ('A'<=c && c<='Z') },
    isLetter(c){ return this.isLowerCase(c) || this.isUpperCase(c) },
    isHexa(c){ return Character.isDigit(c) || ('A'<=c&&c<='F') || ('a'<=c&&c<='f') },
    isAlphabetic(c){ return Character.isDigit(c) || Character.isLetter(c) }
    
}

class Read {
    get(input, start, end){
        start = start || 0
        end = end || input.length
        if( typeof input === 'string' )
            input = new Source(input)
        var t = this.match(input,start,end)
        if(t.isError()) throw JSON.stringify(t.json())
        return t.value
    }

    match(input, start, end){}
}


//////// LEXEME ////////////

class Lexeme extends Read{
    /**
     * Determines if the lexeme can star with the given character
     * @param c Character to analize
     * @return <i>true</i> If the lexeme can start with the given character <i>false</i> otherwise
     */
    startsWith(c){ return false }

    error(input, start, end) {
        return new Token(input,start,end,this.type)
    }
    
    token(input, start, end, value) {
        return new Token(input,start,end,value,this.type)
    }
}

class Space extends Lexeme{
    static TAG = "space"
    
    constructor(){ 
        super()
        this.type = Space.TAG 
        this.white = new RegExp(/^\s$/)
    }
    
    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if( !this.startsWith(input.get(start)) )
            return this.error(input, start, start+1)
        var n = end
        end=start+1
        while(end<n && this.startsWith(input.get(end))) end++
        return this.token(input,start,end," ")
    }

    startsWith(c) { return this.white.test(c) }
}

class Symbol extends Lexeme{
    static TAG = "symbol"
    
    constructor(symbols, type=Symbol.TAG){
        super()
        this.type = type
        for( var i=0; i<symbols.length; i++ )
            this[symbols.charAt(i)] = symbols.charAt(i)
    }
    
    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(this.startsWith(input.get(start)))
            return this.token(input,start,start+1,input.get(start))
        else 
            return this.error(input,start,start+1)
    }
    
    startsWith(c) { return this[c] !== undefined }    
}

class ID extends Lexeme{
    static TAG = 'ID'
    constructor(type=ID.TAG){ 
        super()
        this.type = type
    }
    
    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if( !this.startsWith(input.get(start)) )
            return this.error(txt, start, start+1)
        var n = end
        end = start
        while(end<n && input.get(end)=='_') end++
        if( end==n ) return this.error(input,start,end)
        if(!Character.isLetter(input.get(end)))
        return this.error(input,start,end)
        while(end<n && Character.isAlphabetic(input.get(end))) end++
        return this.token(input,start,end,input.substring(start,end))
    }

    startsWith(c){ return c=='_' || Character.isLetter(c) }
}


class Words extends Lexeme{
    constructor(type, word) {
        super()
        this.word = word
        this.type = type
    }
    
    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        for(var i=0; i<this.word.length; i++) {
            var x = input.substring(start,Math.min(end, start+this.word[i].length))
            if(this.word[i]==x) return this.token(input,start,start+x.length,x)
        }
        return this.error(input,start,start+1)
    }

    startsWith(c) {
        for(var i=0; i<this.word.length; i++)
            if(this.word[i].charAt(0)==c) return true
        return false
    }
}

class NumberParser extends Lexeme{
    static TAG = "number"

    constructor(){
        super()
        this.type = NumberParser.TAG
    }
    
    isSign(c){ return ('-'==c || c=='+') }

    startsWith(c){ return this.isSign(c) || Character.isDigit(c) }

    match(input, start, end){
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(!this.startsWith(input.get(start)))
            return this.error(input, start, start)
        var n = end
        end=start+1
        while(end<n && Character.isDigit(input.get(end))) end++
        if(end==n) 
            return this.token(input, start, end, Number.parseInt(input.substring(start,end)))
        var integer = true
        if(input.get(end)=='.'){
            integer = false
            end++
            var s=end
            while(end<n && Character.isDigit(input.get(end))) end++
            if(end==n) 
                return this.token(input, start, end, Number.parseFloat(input.substring(start,end)))
            if(end==s) return this.error(input, start, end)
        }
        if(input.get(end)=='E' || input.get(end)=='e'){
            integer = false
            end++
            if(end==n) return this.error(input, start, end)
            if(this.isSign(input.get(end))) end++
            if(end==n) return this.error(input, start, end)
            var s = end
            while(end<n && Character.isDigit(input.get(end))) end++
            if(end==s) return this.error(input, start, end)
        }
        if( integer ) return this.token(input, start, end, Number.parseInt(input.substring(start,end)))
        return this.token(input, start, end, Number.parseFloat(input.substring(start,end)))
    }   
}

class StringParser extends Lexeme{
    static TAG = "string"
    
    constructor(quotation) {
        super()
        this.type = StringParser.TAG
        this.quotation = quotation || '"'
    }

    startsWith(c){ return c==this.quotation }

    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(!this.startsWith(input.get(start))) return this.error(input, start, start)
        var n = end
        end = start+1
        if(end==n) return this.error(input, start, end)
        var str = ""
        while(end<n && input.get(end)!=this.quotation){
            if(input.get(end)=='\\'){
                end++
                if(end==n) return this.error(input, start, end)
                if(input.get(end)=='u') {
                    end++
                    var c = 0
                    while(end<n && c<4 && Character.isHexa(input.get(end))){
                        end++
                        c++
                    }
                    if(c!=4) return this.error(input, start, end)
                    str += String.fromCharCode(Number.parseInt(input.substring(end-4,end),16))    
                }else {
                    switch(input.get(end)){
                        case 'n': str += '\n'; break;
                        case 'r': str += '\r'; break;
                        case 't': str += '\t'; break;
                        case 'b': str += '\b'; break;
                        case 'f': str += '\f'; break;
                        case '\\': case '/': str += input.get(end); break;
                        default:
                            if(input.get(end)!=this.quotation)
                                return this.error(input, start, end)
                            str += this.quotation
                    }
                    end++
                }
            }else{
                str += input.get(end)
                end++
            }
        }
        if(end==n) return this.error(input, start, end)
        end++
        return this.token(input, start, end, str)
    }   
}



class BlobParser extends Lexeme{     
    static STARTER = '#'
    static TAG = "byte[]"

    constructor(useStarter=false) {
        super()
        this.useStarter = useStarter 
        this.type = BlobParser.TAG
    }

    valid(c) { return Character.isAlphabetic(c) || c=='+'||c=='/' }
    
    match(input, start, end){
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(!this.startsWith(input.get(start)))
            return this.error(input,start,start+1)
        var n=end
        end=start+1
        while(end<n && this.valid(input.get(end))) end++
        var s = (this.useStarter)?start+1:start
        var m = (end-s)%4
        if(s==end || m==1) return this.error(input,start,end)
        if(m>0) {
            while(end<n && m<4 && input.get(end)=='=') {
                end++
                m++
            }
            if(m<4) return this.error(input,start,end)
        }
        return this.token(input,start,end,Base64.decode(input.substring(s,end)))
    }

    startsWith(c) {
        return this.useStarter?(c==BlobParser.STARTER):this.valid(c)
    }
}

///////////// LEXER ////////////////
const TOKEN_LIST = "Token[]"

class Lexer extends Read{
    constructor(removableTokens){
        super()
        this.removableTokens = removableTokens || []
        this.remove = true
        this.back = false
    }
    
    removeTokens(remove) { this.remove = remove }
    
    init(input, start, end) {
        this.start = start || 0
        this.end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        this.input = input
        this.back = false 
    }
    
    obtain(){}
    
    removable(t) {
        var i=0
        while(i<this.removableTokens.length && t.type!=this.removableTokens[i]) i++
        return(i!=this.removableTokens.length) 
    }
    
    next() {
        if(this.back) {
            this.back = false
            return this.current
        }
        do { this.current = this.obtain() }
        while(this.current!=null && this.remove && this.removable(this.current))
        return this.current
    }
    
    goback() { this.back = true; }
    
    match(input, start, end) {
        this.init(input,start,end)
        var list = []
        var t;
        while((t=this.next())!=null && t.type!=Token.ERROR) { list.push(t) }
        if(t==null) 
            return new Token(input, start, list[list.length-1].end, list, TOKEN_LIST)
        else 
            return t
    }
    
    remove(tokens, toremove ){
        for( var i=tokens.size()-1; i>=0; i-- )
            if( this.toremove.indexOf(tokens[i].type) >= 0 ) tokens.splice(i,1)
        return tokens
    }
    
    remove_space(tokens ){ 
        return remove(tokens, Space.TAG)
    }   
}

class LookAHeadLexer extends Lexer{
    constructor( removableTokens, lexemes, priority=null ){
        super(removableTokens)
        this.lexeme = {}
        this.priority={}
        for( var i=0; i<lexemes.length; i++ ) {
            this.lexeme[lexemes[i].type] = lexemes[i]
            this.priority[lexemes[i].type] = priority!==null?priority[i]:1
        }
    }
    
    obtain() {
        if(this.start>=this.end) return null
        var c = this.input.get(this.start)
        var opt = []
        var error = []
        for( var x in this.lexeme ) {
            var l = this.lexeme[x]
            if(l.startsWith(c)) {
                var t = l.match(this.input, this.start, this.end)
                if(t.isError()) error.push(t)
                else opt.push(t)
            }
        }
        if( opt.length > 0 ) {
            this.current = opt[0]
            for( var i=1; i<opt.length; i++ ) {
                var e2 = opt[i]
                if(e2.size()>this.current.size() || 
                    (e2.size()==this.current.size() && 
                    this.priority[e2.type]>this.priority[this.current.type])) 
                this.current = e2;
            }
        }else {
            if(error.length>0) {
                this.current = error[0]
                for( var i=1; i<error.length; i++ ) {
                    e2 = error[i]
                    if(e2.size()>this.current.size()) this.current = e2
                }
            }else {
                this.current = new Token(this.input, this.start, this.start+1, c)
            }
        }
        this.start = this.current.end
        return this.current
    }
}

/////////// PARSER RULE'S /////////////////////

class Rule{ 
    constructor(type, parser) { 
        this.parser = parser
        this.type = type
    }
    
    startsWith(t){}

    check_symbol(token, c, TAG=Symbol.TAG) {
        return token.type==TAG && token.value==c
    }
    
    analize(lexer, current=lexer.next()){}
    
    eof(input, end) { return new Token(input,end,end,this.type) }
        
    token(input, start, end, value) {
        return new Token(input, start, end, value, this.type)
    }
}

class ListRule extends Rule{

    constructor(type, parser, item_rule, left='[', right=']', separator=',') { 
        super(type, parser)
        this.item_rule = item_rule
        this.LEFT = left
        this.RIGHT = right
        this.SEPARATOR = separator
    }
    
    startsWith(t) { return this.check_symbol(t, this.LEFT) }
    
    analize(lexer, current=lexer.next()) {
        if(!this.startsWith(current)) return current.toError()
        var input = current.input
        var start = current.start
        var end = current.end
        var list = []
        current = lexer.next()
        while(current!=null && !this.check_symbol(current, this.RIGHT)){
            var t = this.parser.rule(this.item_rule).analize(lexer, current)
            if(t.isError()) return t
            list.push(t)
            end = current.end
            current = lexer.next()
            if(current==null) return this.eof(input,end)
            if(this.check_symbol(current, this.SEPARATOR)) {
                end = current.end
                current = lexer.next()
                if(current==null) return this.eof(input,end)
                if(this.check_symbol(current, this.RIGHT)) return current.toError() 
            }else if(!this.check_symbol(current, this.RIGHT)) return current.toError()
        }
        if(current==null) return this.eof(input,end)
        return this.token(input,start,current.end,list)
    }
}

class Options extends Rule{
    constructor(type, parser, options) {
        super(type, parser)
        this.option = options
    }

    rule(t){
        var i=0
        while(i<this.option.length && !parser.rule(this.option[i]).startsWith(t)) i++
        return i
    }
    
    startsWith(t) { return this.rule(t)<this.option.length }

    analize(lexer, current=lexer.next()){
        var r=this.rule()
        if(r==this.option.length) return current.toError()   
        return this.option[r].analize(lexer, current)
    }    
}

class Parser{
    constructor(rules, main) {
        this.main = main
        this.rules = {}
        for(var i=0; i<rules.length; i++) {
            this.rules[rules[i].type] = rules[i]
            rules[i].parser = this
        }      
    }

    rule(r) { return this.rules[r] }

    analize(lexer, r) {
        return this.rule(r || this.main).analize(lexer)
    }
}

class Meaner{
    apply(t){}
}

/////////// LANGUAGE //////////////

class Language extends Read{
    constructor( lexer, parser, meaner ){
        super()
        this.lexer = lexer
        this.parser = parser
        this.meaner = meaner
    }
    
    match(input, start, end) {
        this.lexer.init(input, start, end)
        var t = this.parser.analize(this.lexer)
        if(!t.isError()) t = this.meaner.apply(t)
        return t
    }
}

////////// JXON //////////////////

class JXONAttribute extends Rule{
    static TAG = "ATTRIBUTE"
    
    constructor(parser) { super(JXONAttribute.TAG, parser) }
    
    startsWith(t) { return t.type == StringParser.TAG }
    
    analize(lexer, current=lexer.next()) {
        if(!this.startsWith(current)) return current.toError()
        var input = current.input
        var start = current.start
        var end = current.end
        var pair = [current,null]
        current = lexer.next()
        if(current==null) return this.eof(input,end)
        if(!this.check_symbol(current, ':')) return current.toError()
        end = current.end
        pair[1] = this.parser.analize(lexer,JXONValue.TAG)
        if(pair[1].isError()) return pair[1]
        return this.token(input,start,pair[1].end,pair)
    }
}

class JXONList extends ListRule{
    static TAG = "LIST"
    constructor(parser) { super(JXONList.TAG, parser, JXONValue.TAG) }
}

class JXONObj extends ListRule{
    static TAG = "OBJ" 
    constructor(parser) { super(JXONObj.TAG, parser, JXONAttribute.TAG, '{', '}', ',') }
}

class JXONReserved extends ID{
    static TAG = "reserved"

    constructor(){ super(JXONReserved.TAG) } 
    
    match(input, start, end) {
        var t = super.match(input, start, end)
        switch(t.value) {
            case "true":
                t.value = true
                return t
            case "false":
                t.value = false
                return t
            case "null":
                t.value = null
                return t
            default:
                t.type = Token.ERROR
                t.value = this.type
                return t
        }
    }

    startsWith(c) { return c=='t' || c=='f' || c=='n' }
}

class JXONValue extends Rule{
    static TAG = "VALUE" 
    constructor(parser) { super(JXONValue.TAG, parser) }
    
    startsWith(t) {
        if(t.type == Token.ERROR) return false
        if(t.type == Symbol.TAG) return t.value=='[' || t.value== '{'
        return true 
    }
    
    analize(lexer, current=lexer.next()) {
        if(current.type==Symbol.TAG) {
            switch(current.value) {
                case '[': return this.parser.rule(JXONList.TAG).analize(lexer, current)
                case '{': return this.parser.rule(JXONObj.TAG).analize(lexer, current)
                default: return current.toError();
            }
        }
        return current
    }
}

class JXONLexer extends LookAHeadLexer{
    static lexemes = [
        new NumberParser(),
        new StringParser(),
        new BlobParser(true),
        new JXONReserved(),
        new Symbol("[]{},:"),
        new Space()
    ]
    
    constructor() { super([Space.TAG], JXONLexer.lexemes) }
}

class JXONParser extends Parser{
    static rules(){ 
        return [
            new JXONObj(null),
            new JXONList(null),
            new JXONValue(null),
            new JXONAttribute(null)
        ]
    }
    
    constructor(){ super(JXONParser.rules(), JXONObj.TAG) }    
}

class JXONMeaner extends Meaner{
    static TAG = "JSON"
    constructor() { super() }
        
    apply(obj){
        if( obj.isError() ) return obj
        return new Token(obj.input, obj.start, obj.end, this.inner_apply(obj), JXONMeaner.TAG)
    }

    inner_apply(obj){
        switch( obj.type ) {
            case JXONObj.TAG:
                var json = {}
                for(var i=0; i<obj.value.length; i++) {
                    var p = this.inner_apply(obj.value[i])
                    json[p[0]] = p[1]
                }
                return json
            case JXONAttribute.TAG:
                var pair = obj.value
                var value = this.inner_apply(pair[1])
                return [pair[0].value, value]
            case JXONList.TAG:
                var a = []
                for(var i=0; i<obj.value.length; i++)
                    a.push(this.inner_apply(obj.value[i]))            
                return a
            default:
                return obj.value
        }
    }
}

class JXONLanguage extends Language{
    constructor() {
        super(new JXONLexer(), new JXONParser(), new JXONMeaner())
    }
}

/**
 * <p>Title: Stringifier</p>
 *
 * <p>Description: Stringifies (Stores into a String) an object</p>
 *
 */
JXON = {
    parse(str){ return new JXONLanguage().get(str) },
    
    /**
     * Stringifies an object
     * @param obj Object to be stringified
     * @return A stringified version of the object
     */
    stringify( thing ){
        if( thing == null || typeof thing == 'number' || 
            typeof thing == 'boolean' ) return ""+thing
        
        if( typeof thing == 'string' ) return JSON.stringify(thing)
            
        if( thing.byteLength !== undefined ) 
            return BlobParser.STARTER + Base64.encode(thing)
           
        var txt 
        var comma=""
        if(Array.isArray(thing) ){
            txt = "["
            for( var i=0; i<thing.length; i++ ){
                txt += comma + JXON.stringify( thing[i] )
                comma = ','
            }    
            txt += ']'    
            return txt
        }
        
        txt = '{'
        comma=""
        for( var c in thing ){
            txt += comma + JXON.stringify(c) + ":" + JXON.stringify( thing[c] )
            comma = ','
        } 
        txt += '}'
        return txt
    }
}

class Configurable{
    config(json){}
    jxon(){}
}

//////////// FunPL //////////////

//////////// CONSTANTS //////////
FunConstants={
    novalue:"·No valid value· ",
    NUMBERID:"numberid",

    // FunEncoder
    code:"code",
    arity:"arity",
    priority:"priority",
    extra:"extra",
    EOF:-1,
    DOLLAR:1,
    ASSIGN:':',
    COMMA:',',
    OPEN:'(',
    CLOSE:')',
    SPACE:' ',

    // FunLexer
    COMMENT:"comment",
    FUNCTION: "function",
    VALUE: "value",
    PRIMITIVE: "primitive",
    VARIABLE: "variable",
    
    // FunParser
    EXPRESSION:"expression",
    DEFINITION:"definition",
    DEF_LIST:"list",
    COMMAND:"command",
    ARGS:"args",
    
    expected:"·Expecting· ",
    unexpected:"·Unexpected· ",
    noargs:"·No arguments· ",

    // FunMeaner
    nocommand:"·Not a command· ",
    argmismatch:"·Argument mismatch· ",
    argnumbermismatch:"·Argument number mismatch· ",
    novar:"·No a variable· "   
}

//////////// LEXER /////////////

class Comment extends Lexeme{
    constructor(){
        super()
        this.type = FunConstants.COMMENT 
    }

    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(!this.startsWith(input.get(start))) return this.error(input, start, start+1)
        var n=end
        end=start
        while(end<n && this.followsWith(input.get(end))) end++
        return this.token(input,start,end,input.substring(start,end))
    }

    startsWith(c){ return c=='%' }

    followsWith(c){ return c!='\n' && c!='\r' }
}

class Function extends Lexeme{
    constructor(canStartWithNumber=true){ 
        super()
        this.withNumber = canStartWithNumber
        this.type = FunConstants.FUNCTION
    }

    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(!this.startsWith(input.get(start))) return this.error(input, start, start+1)
        var n = end
        end = start+1
        while(end<n && this.followsWith(input.get(end))) end++
        return this.token(input,start,end,input.substring(start,end))
    }
    
    startsWith(c){ 
        return Character.isLowerCase(c) || (this.withNumber && Character.isDigit(c))
    }

    followsWith(c){ 
        return Character.isAlphabetic(c) || c=='_'
    }  
}

class Variable extends Lexeme{
    constructor(){
        super()
        this.type = FunConstants.VARIABLE
    }
    
    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)
        if(!this.startsWith(input.get(start))) return this.error(input, start, start+1)
        var n = end
        end = start
        while(end<n && this.followsWith(input.get(end))) end++
        return this.token(input,start,end,input.substring(start,end))
    }

    startsWith(c){ return Character.isUpperCase(c) }

    followsWith(c){ return Character.isAlphabetic(c) || c=='_' }
}

class FunLexer extends LookAHeadLexer{
    constructor( canStartWithNumber, value, primitive ) {
        super( [Space.TAG, FunConstants.COMMENT],
                [
                    new Variable(),
                    new Function(canStartWithNumber),
                    value, primitive,
                    new Symbol("()=,"),
                    new Comment(),
                    new Space()
                ]
            )
    }   
}

//////////// PARSER /////////////

class Arguments extends ListRule{
    constructor(parser) { 
        super(FunConstants.ARGS, parser, FunConstants.EXPRESSION, '(', ')', ',')
    }
}

class Command extends Rule{
    constructor(parser) { super(FunConstants.COMMAND, parser) }

    analize(lexer, current=lexer.next()) {
        if(!this.startsWith(current)) return current.toError()
        var input = current.input
        var start = current.start
        var end = current.end
        var type = current.type
        var command = []
        command.push(current)
        if(type!=FunConstants.VALUE) {
            var c = lexer.next()
            lexer.goback()
            if(c!=null && this.check_symbol(c, '(')) {
                var args = this.parser.analize(lexer,FunConstants.ARGS)
                if(args.isError()) return args
                command.push(args)
                end = args.end
            }else {
                if(type==FunConstants.PRIMITIVE)
                    if(c==null) return this.eof(input,end)
                    else return c.toError()
            }
        }
        return this.token(input,start,end,command)
    }

    startsWith(token) {
        var type = token.type
        return type==FunConstants.VALUE || type==FunConstants.FUNCTION ||
            type==FunConstants.PRIMITIVE || type==FunConstants.VARIABLE
    }
}

class Definition extends Rule{
    constructor(parser) { super(FunConstants.DEFINITION, parser) }
    
    startsWith(t) { return t.type==FunConstants.FUNCTION }
    
    analize(lexer, current=lexer.next()) {
        if(!this.startsWith(current)) return current.toError()
        var input = current.input
        var start = current.start
        var end = current.end
        var pair = []
        pair.push(this.parser.rule(FunConstants.COMMAND).analize(lexer,current))
        if(pair[0].isError()) return pair[0]
        current = lexer.next()
        if(current==null) return this.eof(input,end)
        if(!this.check_symbol(current, '=')) return current.toError()
        end = current.end
        pair.push(this.parser.analize(lexer,FunConstants.EXPRESSION))
        if(pair[1].isError()) return pair[1]
        return this.token(input,start,pair[1].end,pair)
    }
}

class DefList  extends Rule{
    constructor(parser) { super(FunConstants.DEF_LIST, parser) }

    startsWith(t) { return t.type==FunConstants.FUNCTION }
    
    analize(lexer, current=lexer.next()) {
        if(!this.startsWith(current)) return current.toError()
        var input = current.input
        var start = current.start
        var end = current.end
        var list = []
        while(current!=null && this.startsWith(current)){
            var t = this.parser.rule(FunConstants.DEFINITION).analize(lexer, current)
            if(t.isError()) return t
            list.push(t)
            end = current.end
            current = lexer.next()
        }
        if(current!=null) return current.toError()
        return this.token(input,start,end,list)
    }
}

class Expression extends Rule{
    constructor(parser, operator_priority) {
        super(FunConstants.EXPRESSION, parser)
        this.operator_priority = operator_priority
    }

    
    analize(lexer, current=lexer.next()) {
        var t = this.inner_analize(lexer,current)
        if(!t.isError()) {
            var list = t.value
            for( var i=1; i<list.length; i+=2) { 
                var oper = this.operator_priority[list[i].value]
                if( oper[0] == 1 )
                    return list[i].toError()
            }
            t = this.tree(list)
        }
        return t 
    }

    tree(list) {
        if( list.length==1 ) return list[0]
        var p = this.operator_priority[list[1].value][1]
        var k = 1
        for( var i=3; i<list.length; i+=2) { 
            var pi = this.operator_priority[list[i].value][1]
            if(pi<p) {
                k = i
                p = pi
            }
        }
        var args = [list[k-1],list[k+1]]
        var node = [list[k],
            new Token(args[0].input, args[0].start, args[1].end, args, FunConstants.ARGS)]
        list.splice(k+1,1)
        list[k]=new Token(node[0].input, node[1].start, node[1].end, node, FunConstants.COMMAND)
        list.splice(k-1,1)
        return this.tree(list)
    }
    
    inner_analize(lexer, current) {
        if(!this.startsWith(current)) return current.toError()
        var input = current.input
        var start = current.start
        var end = current.end
        var command
        if( this.check_symbol(current, '(')) {
            current = lexer.next()
            command = this.analize(lexer,current)
            if(command.isError()) return command
            end = current.end
            current = lexer.next()
            if(current==null) return this.eof(input,end)
            if(!this.check_symbol(current, ')')) return current.toError()
        }else {
            command = this.parser.rule(FunConstants.COMMAND).analize(lexer,current)
            if(command.isError()) return command
        }
        current = lexer.next()
        if(current==null || current.type!=FunConstants.PRIMITIVE) {
            lexer.goback()
            return this.token(input,start,command.end,[command])
        }
        end = current.end
        var oper = current
        current = lexer.next()
        if(current==null) return this.eof(input,end)
        var list = this.inner_analize(lexer,current)
        if(list.isError()) return list
        var l = list.value
        l.splice(0, 0, command)
        l.splice(1, 0, oper)
        return this.token(input,start,list.end,l)
    }

    startsWith(token) {
        return this.parser.rule(FunConstants.COMMAND).startsWith(token) || 
            this.check_symbol(token, '(')
    }
}

class FunParser extends Parser{  
    static rules(operator_priority) { 
        return [
            new Definition(null),
            new DefList(null),
            new Expression(null,operator_priority),
            new Arguments(null),
            new Command(null) ]
    }

    constructor(operator_priority, rule){
        super(FunParser.rules(operator_priority), rule)
    }
}

//////////// MEANER /////////////
class FunAssignment { 
    check(variable, obj ){}
}

class FunObject extends Position{
    constructor( input, pos, machine ){ 
        super(input,pos)
        this.machine = machine;
    }
    
    exception(code){
        var t = new Token(this.input, this.start, this.start+1, code)
        return t.stringify()
    }    
}

class FunCommand extends FunObject{
    constructor(input=null, start=0, machine=null) {
        super(input, start, machine)
    }
    
    reverse( value, original) { return null }
    
    comment(){
        var sb = "·"+this.name+"·\n"+this.name
        var n = this.arity
        if( n>0 ){
            var v="XYZABCDEIJKNM"
            sb += FunConstants.OPEN
            sb += v.charAt(0)
            for(var i=1; i<n; i++){
                sb += FunConstants.COMMA         
                sb += v.charAt(i%v.length)+((i>=v.length)?(""+i/v.length):"")
            }
            sb += FunConstants.CLOSE     
        }
        return sb
    }   
}

class FunCommandCall extends FunObject {
    constructor(input, pos, machine, name, args=[]){
        super(input, pos, machine)
        this.name = name
        this.ho_name = name
        this.args = args
        this.arity = this.args.length
    }

    var2assign(variables) {
        var undvars = {}
        var vars = this.getVars()
        for( var v in vars ) {
            var o = variables[v]
            if(o===undefined || o==FunVariable.UNASSIGNED) undvars[v] = FunVariable.UNASSIGNED
        }
        return undvars
    }
    
    size(variables){
        var i=0
        for( var v in variables ) i++
        return i
    }
    
    match(values, variables={}){
        this.ho_name = variables[this.name] || this.name
        if( this.arity == 0 ){
            var obj=this.machine.execute(this, this.ho_name)
            if(obj==null || values.length!=1 || !Compare.equals(obj,values[1])) 
                throw this.exception(FunConstants.argmismatch + values[1])
            return variables
        }
        if( values.length != this.arity ) 
            throw this.exception(FunConstants.argnumbermismatch + values.length + "!=" + this.arity)
        var ex = null
        var index = []
        for( var i=0; i<this.arity; i++ ) index.push(i)
        var k
        // Checking FunValues and Variables
        var i=0
        while(i<index.length) {
            k=index[i]
            if( this.args[k] instanceof FunValue || this.args[k] instanceof FunVariable ){
                this.args[k].match([values[k]],variables)
                index.splice(i,1)
            }else i++
        }
        // Checking other commands  
        var m = 1
        i=0
        while(index.length>0 && m<3) {
            k = index[i]
            if(this.size(this.args[k].var2assign(variables)) <= m) {
                var aname = this.args[k].name
                try{
                    var c = this.machine.primitive[aname]
                    if(c !== undefined ){
                        var a = c.arity
                        var toMatch = []
                        for( var j=0; j<a; j++ )
                            try{ 
                                toMatch.push(this.args[k].args[j].run(variables))
                            }catch(x){ toMatch.push(null) }
                        c.input = this.args[k].input
                        c.start = this.args[k].start
                        var objs = c.reverse(values[k], toMatch)
                        this.args[k].match(objs, variables)
                    }else{
                        var obj = this.args[k].run(variables)
                        if( obj==null || !Compare.equals(obj,values[k]) ) 
                            throw this.args[k].exception(FunConstants.argmismatch + values[k])
                    }
                    index.splice(i,1)
                    i=-1 
                    m=1
                }catch(e){
                    ex = e
                }
            }
            i++
            if(i==index.length) {
                m++
                i=0
            }
        }
    
        if( index.length > 0 ) {
            var sb = ""
            var uvars = this.var2assign(variables)
            for(var uv in uvars) sb += " "+uv
            ex = ex!=null?ex:this.exception(FunConstants.novar + sb)
            throw ex
        }
        return variables 
    }
   
    run( variables ){
        this.ho_name = variables[name] || this.name
        var a = this.arity
        var obj = []
        for( var i=0; i<a; i++ ) obj.push(this.args[i].run(variables))
        return this.machine.execute(this, this.ho_name, obj)
    }

    apply(arg){
        var vars = this.getVars()
        if(Object.keys(vars).length!=1) throw this.exception(FunConstants.argnumbermismatch)
            
        for(var k in vars) vars[k] = arg    
        return this.run(vars)
    }

    getVars(vars={}) {
        for( var i=0; i<this.args.length; i++ ) this.args[i].getVars(vars)
        return vars
    }
    
    toString(){
        var sb = this.name
        var n = this.arity
        if( n>0 ){
            sb += FunConstants.OPEN
            sb += this.args[0].toString()
            for( var i=1; i<n;i++ ){
                sb += FunConstants.COMMA          
                sb += this.args[i].toString()
            }
            sb += FunConstants.CLOSE         
        }
        return sb
    }
}

class FunCommandDef extends FunCommand{
    constructor(machine, left, right ){
        super( left.input, left.start, machine )
        this.left = left
        this.right = right
        this.name = left.name
        this.arity = left.arity
    }
    
    match(values){
        if(this.left.arity==0) return {}
        return this.left.match(values)
    }

    execute(values){ 
        return this.right.run(this.match(values)) 
    }
    
    toString(){
        var sb = left.toString()
        sb += FunConstants.ASSIGN
        sb += right.toString()
        return sb
    }  
}

class FunValue extends FunCommandCall{
    constructor(input, pos, machine, name) {
        super(input, pos, machine, name)
        try{ 
            this.obj = machine.value.get(name)
            this.e = null
        }catch(e){
            this.obj = null
            this.e = this.exception(FunConstants.novalue + name) 
        }
    }
    
    run(){
        if( this.e != null ) throw this.e
        return this.obj
    }
    
    match( values, variables={} ) {
        if( values.length!=1 )  throw this.exception(FunConstants.argnumbermismatch + 1 + "!=" + values.length)
        var value = values[0]
         if( this.obj===null || !Compare.equals(this.obj,value) ) throw this.exception(FunConstants.argmismatch + value)
        return variables
    }
    
}

class FunVariable extends FunCommandCall{
    static UNASSIGNED = "%unassigned"
    
    constructor(input, pos, machine, name) { super(input, pos, machine, name) }
    
    run( variables ){
        var v = variables[this.name]
        if(v===undefined || v===null){ throw this.exception(FunConstants.novar) }
        return v
    }   

    getVars(vars) { vars[this.name] = FunVariable.UNASSIGNED }
    
    match(values, variables={}){
        if( values.length!=1 )  
            throw this.exception(FunConstants.argnumbermismatch + 1 + "!=" + values.length)
        var value = values[0]
        var match = true
        var obj = variables[this.name]
        if(obj!=null) match = Compare.equals(obj,value)
        else{ 
            match = this.machine.can_assign(this.name, value)
            if(match) variables[this.name] = value
        }       
        if( !match ) throw this.exception(FunConstants.argmismatch + value)
        return variables
    }
}

class FunProgram extends FunCommand{
    static MAIN="main"
    
    constructor(machine, commands){
        super(commands[0].input, commands[0].start, machine)
        this.commands = {}
        this.add(commands)
        this.arity = 0
        this.name = FunProgram.MAIN
        machine.program = this
    }

    addDef(def){
        var name = def.name
        var vdef = this.commands[name]
        if( vdef === undefined ){
            vdef = []
            this.commands[name] = vdef
        }
        vdef.push(def)
    }

    add(defs){ 
        for( var i=0; i<defs.length; i++ ) this.addDef(defs[i])
    }
    
    clear(){ this.commands = {} }
    
    defined(command){ return this.commands[command] !== undefined } 
    
    candidates(command, arity){
        var candidates = []
        try{
            var v = this.commands[command]
            for( var i=0; i<v.length; i++ ) if( v[i].arity==arity ) candidates.push(v[i])
        }catch(e){}
        return candidates
    }
    
    constant(command){ return this.candidates(command,0).length>0 }

    execute(command, values ){
        if( !this.defined(command) ) 
            throw this.exception(FunConstants.nocommand + command)
        var candidates = this.candidates(command,values.length )
        if(candidates.length==0) 
            throw this.exception(FunConstants.argnumbermismatch + command)
        var e=null
        var i=0
        while( i<candidates.length ){
            var cand = candidates[i]
            try{ 
                cand.match(values)
                i++;
            }catch(ex){
                e = ex
                candidates.splice(i,1)
            }
        }   
        if( candidates.length == 0 ) throw e
        e = null;
        for( i=0; i<candidates.length; i++ ){
            try{ return candidates[i].execute(values) }
            catch(ex){ e = ex }
        }   
        throw e
    }
    
    toString(){
        var sb = ''
        for( var d in this.commands )
            for( var i=0; i<this.commands[d].length; i++ ) sb += this.commands[d][i].toString()+"\n"    
        return sb
    }   
}

class FunValueInterpreter {
    get(value){}
    valid(value){}
    description(){}
    lexeme(){}
}

class FunMachine{
    constructor( primitives, value, assignment=null ){
        this.setPrimitives( primitives )
        this.value = value
        this.assignment = assignment
    }
    
    setPrimitives(primitives) {
        this.primitive = primitives 
        for( var i in primitives ) primitives[i].machine = this
    }

    setProgram( program ){
        this.program = program
        program.machine = this
    }
    
    clear(){ this.program.clear() }
    
    can_assign( variable, value ){
        var flag = false
        if( this.assignment != null ) flag = this.assignment.check(variable, value)
        if(!flag){
            var cmd = value.toString()
            return this.primitive.get(cmd)!=null || this.program.defined(cmd)
        }
        return flag
    }
    
    execute( pos, command, args ){
        if(this.value.valid(command)){
            if( args.length>0) {
                this.program.start = pos.start
                throw this.program.exception(FunConstants.unexpected)
            }
            return this.value.get(command)
        }
        var c = this.primitive[command]
        if( c!=null ){
            c.input = pos.input
            c.start = pos.start
            if(args.length != c.arity){
                if( args.length > 0 ) 
                    throw c.exception(FunConstants.argnumbermismatch + command)
                else return command
            }
            return c.execute(args)
        }
        this.program.start = pos.start
        try{
            return this.program.execute(command, args)
        }catch(e){
            if(this.program.defined(command) && 
                !this.program.constant(command) && args.length==0 ) return command
            else throw e
        }   
    }
}

class FunMeaner extends Meaner{
    constructor(machine=null){
        super() 
        this.machine = machine
        this.src = 'noname' 
    }
    
    
    get( v, i ){
        try{ return v[i] }catch(e){ return null }
    }
        
    command_def(v){
        return new FunCommandDef(this.machine, this.command(v[0]), this.command(v[1]))
    }

    command_def_list(list){
        var defs = []
        for(var i=0; i<list.length; i++) defs.push(this.command(list[i]))
        return new FunProgram(this.machine, defs)
    }
    
    command_array(v){
        var name = null
        var xt = v[0]
        if(xt.type==FunConstants.VALUE) 
            return new FunValue(this.src, xt.start, this.machine, xt.value.toString())
        if(xt.type==FunConstants.VARIABLE) 
            return new FunVariable(this.src, xt.start, this.machine, xt.value)
        name = xt.value
        if(v.length>1) v = v[1].value
        else v = []
        var args = []
        for( var i=0; i<v.length; i++ )
            args.push(this.command(v[i]))
        return new FunCommandCall(this.src, xt.start, this.machine, name, args)
    }

    command(rule){
        if(Array.isArray(rule)) return this.command_array(rule)
        switch( rule.type ){
            case FunConstants.VARIABLE: 
                return new FunVariable(this.src, rule.start, this.machine, rule.value)
            case FunConstants.VALUE: 
                return new FunValue(this.src, rule.start, this.machine, rule.value)
            case FunConstants.DEFINITION: return this.command_def(rule.value)
            case FunConstants.DEF_LIST: return this.command_def_list(rule.value)
            case FunConstants.COMMAND: return this.command(rule.value)
        }
        return null
    }

    apply(rule){
        rule.value = this.command(rule)
        return rule
    }
}

////////// Language //////////////

class FunLanguage extends Language{
    constructor(lexer, parser, machine, rule){ 
        super(lexer, parser, new FunMeaner(machine)) 
        parser.rule(rule)
    }   
}

////////// API //////////////
GUIFunConstants ={
    ERROR : "·Error·",
    OUT : "·Out·",
    VALUE : "·Value·",
    PRIMITIVE : "·Primitive·",
    LANGUAGE : "·Language·",
    NONAME : "·noname·",
    CLEAN : "·Clean programming areas?·",
    NEW : "·New·",
    OPEN : "·Open·",
    SAVE : "·Save·",
    COMPILE : "·Compile·",
    EXECUTE : "·Execute·",
    COMMAND : "·Command·:",
    APPLY : "·Apply to output·:",
    TITLE : "·Title·",
    FILE : "·File·",
    NO_ERRORS : "no_errors",
    ERRORS : "errors",
    MACHINE : "·Machine·",
    STYLE : "·Editor Style·",
    FUN : "fun",
    FMC : "config",
    FMP : "type",   
    FML : ".i18n"
}

class FunAPI extends Configurable{
    constructor() {
        super()
        this.machine = new FunMachine() 
        this.primitive = {}
        this.operator = {}
        this.assignment = null
        this.canStartWithNumber=true
        this.filetype = ".fmp"
        this.conftype = ".fmc"
        this.output = null
    }
    
    clear() {
        this.primitive = {}
        this.operator = {}
        this.value = null
        this.assignment = null
    }
    
    config(jxon) {
        this.clear()
        this.filetype = jxon[GUIFunConstants.FMP]
        this.conftype = jxon.string[GUIFunConstants.FMC]
        if( jxon[FunConstants.NUMBERID] !== undefined )
            this.canStartWithNumber = jxon[FunConstants.NUMBERID]
    }   
        
    addOperator( command, priority ){
        this.primitive[command.name] = command
        this.operator[command.name] = [command.arity, priority]
        command.machine = this.machine
    }
    
    values() { return this.value.description() }
    
    primitive_lexeme(){
        var p = []
        for( var k in this.operator) {
            p.push(k)
        }
        return new Words(FunConstants.PRIMITIVE,p)
    }

    operators(separator) {
        var sb = ""
        var pipe = ""
        for(var k in this.operator) {
            sb += pipe
            pipe = separator
            sb += k
        }
        return sb    
    }
    
    opers_explain(separator='\n') {
        var sb = ""
        var pipe = ""
        for(var k in this.primitive) {
            sb += pipe
            pipe = separator
            sb += this.primitive[k].comment()
        }
        return sb    
    }
    
    lexer() {
        return new FunLexer(this.canStartWithNumber, this.value.lexeme(), this.primitive_lexeme()) 
    }
    
    init() {
        var lexer = this.lexer()
        var parser = new FunParser(this.operator,FunConstants.DEF_LIST)  
        this.machine= new FunMachine(this.primitive, this.value, this.assignment)
        this.lang = new FunLanguage(lexer,parser,this.machine,FunConstants.DEF_LIST)
    }

    compile(program, component='noname'){
        var src = new Source(program,component)
        this.init()
        this.lang.parser.main = FunConstants.DEF_LIST
        this.lang.meaner.src = src
        var prog = this.lang.get(src,0,program.length)
        this.machine.setProgram(prog)
    }
    
    run(command,component='noname'){
        var src = new Source(command,component)
        if(this.lang==null ) this.init()
        this.lang.parser.main = FunConstants.EXPRESSION
        this.lang.meaner.src = src
        var cmd = this.lang.get(src,0,command.length)
        if( cmd != null ) {
            this.output = cmd.run({})
            return this.output
        }
        return null
    }   

    apply( command, component='noname' ){
        var src = new Source(command,component)
        if( this.lang==null ) this.init()
        this.lang.parser.main = FunConstants.EXPRESSION
        var cmd=this.lang.get(src,0,command.length)
        if( cmd != null ) {
            this.output = cmd.execute( this.output )
            return this.output
        }
        return null
    }   
}

////////// GUI //////////////
class Application extends Configurable{    
    constructor(id, program, command, console, render, api){ 
        super()
        this.id = id
        this.api = api
        this.program = program
        this.command = command
        this.render = render
        this.console = console    
    }
  
    i18n(code){
        // Konekti gets in
         return code // I18N.process(code)
    }
 
    error(msg) {
        try {
            var json = JXON.parse(msg)
            var pos = json[Position.START]
            var end = json[Token.END] || pos+1
            var row = json[Position.ROW]
            var col = json[Position.COLUMN]
            var value = json[Token.VALUE]
            var e = this[json[Position.INPUT]] 
            e.highlight(row)
            e.locateCursor(row,col)
            var c = e.getText().substring(pos,end)
            var sb = ""
            switch(value) {
            case FunConstants.VALUE:
            case FunConstants.FUNCTION:
            case FunConstants.VARIABLE:
            case FunConstants.PRIMITIVE:
                sb += "·Unexpected "+value+"· "+c
                break;
            case Symbol.TAG:
            case Token.ERROR:
                sb += "·Unexpected character· "+c
                break;
            default:
               sb += value  
            }
            sb += " [·row· " + (row+1)+", ·column· "+(col+1)+"]"
            this.console.error(this.i18n(sb))    
        } catch (e1) { console.log(e1) }
    }
        
    compile( code ) {
        if(code===undefined) code = this.program.getText()
        try {
            this.api.compile(code, "program")
            this.console.out(this.i18n("·No errors·"))
        } catch (e) {
            this.error(e)
        }
    }

    execute( command ) {
        if(command===undefined) command = this.command.getText()
        try {
            var obj = this.api.run(command, "command")
            this.console.out(this.i18n("·No errors·"))
            this.render.render(obj)
            return obj
        } catch (e) {
            this.error(e)
            return null
        }
    }
    
    apply( command ) {
        if(command===undefined) command = this.command.getText()
        try {
            var obj = this.api.apply(command, "command")
            this.console.out(this.i18n("·No errors·"))
            this.render.render(obj)
            return obj
        } catch (e) {
            console.error(this.i18n(e.getMessage()))
            return null
        }
    }
    
    config(json) {
        this.api.config(json.api)
    }
}

////////// TEST //////////////

class TestLexeme extends Lexeme{
    constructor(){
        super()
        this.type = FunConstants.VALUE
    }
    
    match(input, start, end) {
        start = start || 0
        end = end || input.length
        if(typeof input === 'string') input = new Source(input)        
        if(!this.startsWith(input.get(start))) return this.error(input,start,start+1)
        var e=start+1
        while(e<end && this.startsWith(input.get(e))) e++
        return this.token(input,start,e,input.substring(start,e))
    }

    startsWith(c) {
        return c=='-' || c=='/' || c=='<' || c=='_';
    }
}     

SyntaxTest = {
    value(){ return new TestLexeme() },

    primitive(){ return new Words(FunConstants.PRIMITIVE, ["@","|"] ) },

    primitive2(){ return new Words(FunConstants.PRIMITIVE, ["@","|","+"] ) },
    
    lexer() {
        var code = "% Hello World\n   //<<|rot(X)"
        lexer = new FunLexer(true, SyntaxTest.value(), SyntaxTest.primitive())
        try {
            console.log(code)
            var tokens = lexer.get(code)
            for( var i=0; i<tokens.length; i++ ) console.log(tokens[i])
        } catch (e) {
            console.error(e)
        }
    },

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
    
    parser() {
        var code = "% Hello World\n0  = <\n1=@(<)|rot(X,Y)|@(Z)+<|Z";
        var lexer = new FunLexer(true, SyntaxTest.value(), SyntaxTest.primitive2());
        var opers = {"@":[1, 10],"|":[2, 1],"+":[2, 2]}
        parser = new FunParser(opers,FunConstants.DEF_LIST)
        try {
            lexer.init(code)
            t = parser.analize(lexer)
            SyntaxTest.print(0,t)
        } catch (e) {
            console.error(e)
        } 
    },

    main() {
        SyntaxTest.lexer() // Uncomment to test the lexer
        SyntaxTest.parser() // Uncomment to test the parser
    }
}

///////// Toy+ //////////

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
    get(value) { return Number.parseInt(value) }

    valid(value) {
        return !isNaN(value)
    }

    description() { return "·Natural numbers·" }

    lexeme() { return new NatLexeme() }
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
        var api = new FunAPI()
        api.value = new NatValues()
        api.assignment = new ToyPlusAssignment()
        api.addOperator(new Plus(), 1)
        if( decrement ) api.addOperator(new Decrement(), 2)
        return api    
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
