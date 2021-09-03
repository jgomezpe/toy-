package toyplus;

import funpl.gui.awt.ProgrammingFrame;
import funpl.util.FunConstants;

public class IDE {
	public static void main( String[] args ) {
		String lang = (args.length>0)?args[0]:"spanish";
		ProgrammingFrame frame = 
			new ProgrammingFrame(new API(), FunConstants.machine +"basic.toyc", new ToyPlusRender(), lang );
		frame.setVisible(true);
	}
}
