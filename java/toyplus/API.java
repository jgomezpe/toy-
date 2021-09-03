package toyplus;

import funpl.FunAPI;
import aplikigo.gui.canvas.CanvasConstants;
import speco.jxon.JXON;

public class API extends FunAPI{
    @Override
    public void config(JXON jxon) {
	super.config(jxon);
	canStartWithNumber = false;
	value = new NatValues();
	this.setValue(value);
	this.setAssignment(new Assignment());
	Object[] opers = jxon.array(CanvasConstants.COMMANDS);
	for( Object obj:opers ) {
	    String o = (String)obj;
	    if( o.equals("¬") ) addOperator(new Decrement(), 3);
	    else if( o.equals("+" ) ) addOperator(new Plus(), 1);
	}
    }
}