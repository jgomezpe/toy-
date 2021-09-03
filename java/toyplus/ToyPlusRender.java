package toyplus;

import aplikigo.awt.AWTStringRender;

public class ToyPlusRender extends AWTStringRender{

    /**
     * 
     */
    private static final long serialVersionUID = 5272912585674105304L;

    public ToyPlusRender() { super(); }
    
    public ToyPlusRender(String id) { super(id); }
    
    public String get(Object obj ) {
	if(obj instanceof Object[] ) {
	    StringBuilder sb = new StringBuilder();
	    Object[] comp = (Object[])obj;
	    sb.append('(');
	    sb.append(get(comp[0]));
	    for( int i=1; i<comp.length; i++ ) {
		sb.append(',');
		sb.append(get(comp[i]));
	    }
	    sb.append(')');
	    return sb.toString();
	}else return obj.toString(); 	
    }
    
    /**
     * Draws the given text 
     * @param obj Text to draw
     */
    @Override
    public void render( Object obj ){ render(get(obj)); }
	
    /**
     * Adds the given text 
     * @param obj Text to add
     */
    public void add( Object obj ){ add(get(obj)); }    
}
