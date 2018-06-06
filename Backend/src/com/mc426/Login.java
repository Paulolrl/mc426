package com.mc426;

import java.util.Base64;
import java.util.Base64.Decoder;

import org.apache.tomcat.util.codec.binary.StringUtils;

public class Login {

	public static Usuario verifica(String htmlAuth) throws Exception {
		if (!htmlAuth.startsWith("Basic "))
			throw new Exception("Wrong authorization type");

		Decoder decoder = Base64.getDecoder();
		String decodedString = StringUtils.newStringUsAscii(decoder.decode(htmlAuth.substring("Basic ".length())));
		
		String[] split = decodedString.split(":");
		System.out.println("Autorizacao com usuario: " + split[0] + " e senha: " + split[1]);
		return Usuario.verifica(split[0], split[1]);
	}
}
