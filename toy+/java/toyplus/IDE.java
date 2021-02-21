package toyplus;

import aplikigo.gui.awt.AWTStringRender;
import funpl.gui.awt.ProgrammingFrame;

public class IDE {
	public static void main( String[] args ) {
		String lang = (args.length>0)?args[0]:"spanish";
		ProgrammingFrame frame = 
			new ProgrammingFrame(new API(), "machine/basic.toyc", new AWTStringRender(), IDE.class.getClassLoader(), lang );
		frame.setVisible(true);
	}
}
