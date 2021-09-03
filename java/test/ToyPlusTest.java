package test;

import java.util.HashMap;

import funpl.FunAPI;
import funpl.lexer.FunLexer;
import funpl.lexer.Function;
import funpl.semantic.FunCommand;
import funpl.semantic.FunMachine;
import funpl.semantic.FunMeaner;
import funpl.semantic.FunProgram;
import funpl.syntax.FunParser;
import funpl.util.FunConstants;
import speco.array.Array;
import lifya.lexeme.Words;
import lifya.Token;
import toyplus.Assignment;
import toyplus.Decrement;
import toyplus.NatLexeme;
import toyplus.NatValues;
import toyplus.Plus;

public class ToyPlusTest {
	public static void print( int tab, Token t ) {
	    Object obj = t.value();
	    if( obj instanceof Array ) {
		for( int k=0; k<tab; k++ ) {
		    System.out.print(' ');
		}
		System.out.println(t.type());
		@SuppressWarnings({ "unchecked" })
		Array<Token> v = (Array<Token>)obj;
		for( int i=0; i<v.size(); i++ ) {
		    print(tab+1, v.get(i));
		}
	    }else {
		for( int k=0; k<tab; k++ ) {
		    System.out.print(' ');
		}
		System.out.println(t);
	    }
	}

	public static FunAPI load(boolean decrement) {
	    FunAPI api = new FunAPI();
	    api.setValue(new NatValues());
	    api.setAssignment(new Assignment());
	    api.addOperator(new Plus(), 1);
	    if( decrement ) api.addOperator(new Decrement(), 2);
	    return api;	    
	}

	public static void usingAPI() {
	    System.out.println("==============================");
	    FunAPI api = load(true);
	    try {
		String code = "% Hello World\ndec(X)=¬(X)\nsum(5+X,Y)=X+Y";
		String command = "sum(23, 10)";
		api.compile(code);
		Object obj = api.run(command);
		System.out.println("Result:"+obj);
	    }catch(Exception e) { e.printStackTrace(); System.err.print(e.getMessage()); }
	}
	
	public static void stepByStep() {
	    System.out.println("==============================");
	    String code = "% Hello World\ndec(X)=¬(X)\nswap(X,Y)=Y,X";
	    FunLexer lexer = new FunLexer(new Function(true,false), new NatLexeme(), new Words(FunConstants.PRIMITIVE,new String[]{"¬","+"}));
	    HashMap<String, int[]> opers = new HashMap<String, int[]>();
	    opers.put("¬", new int[] {1, 10});
	    opers.put("+", new int[] {2, 2});
	    FunParser parser = new FunParser(opers,FunConstants.DEF_LIST);
	    FunMachine machine = new FunMachine();
	    HashMap<String, FunCommand> primitive = new HashMap<String, FunCommand>();
	    primitive.put("+", new Plus(machine));
	    primitive.put("¬", new Decrement(machine));
	    machine.setPrimitives(primitive);
	    machine.setValues( new NatValues() );
	    machine.setAssignment( new Assignment() );
	    FunMeaner meaner = new FunMeaner(machine);
	    try {
		System.out.println(code);
		lexer.init(code);
		Token t = parser.analyze(lexer);
		print(0,t);
		FunProgram p = (FunProgram)meaner.apply(t).value();
		System.out.println(p);
		Object[] result = (Object[])p.execute("swap", new Object[] {10,23});
		System.out.println("Result:"+result[0]+"..."+result[1]);
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    
	}
	
	public static void main( String[] args) {
	    usingAPI(); // Uncomment to use the FunAPI associated to ToyPlus 
	    stepByStep(); // Uncomment to see step by step
	}
/*
	p(X,0) = 0
	p(X,Y+1) = p(X,Y) + X
*/
}
