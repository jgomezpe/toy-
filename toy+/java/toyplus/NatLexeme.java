package toyplus;

import funpl.util.FunConstants;
import lifya.lexeme.Lexeme;
import lifya.Source;
import lifya.Token;

public class NatLexeme implements Lexeme<Integer>{

    @Override
    public Token match(Source input, int start, int end) {
	if(!this.startsWith(input.get(start)))
	    return error(input, start, start);
	int n = end;
	end=start+1;
	while(end<n && Character.isDigit(input.get(end))) end++;
	return token(input, start, end, Integer.parseInt(input.substring(start,end)));
    }

    @Override
    public boolean startsWith(char c) {
	return Character.isDigit(c);
    }

    @Override
    public String type() {
	return FunConstants.VALUE;
    }
}
