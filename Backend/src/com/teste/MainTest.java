package com.teste;

import static org.junit.Assert.*;

import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.junit.Test;

import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.test.framework.JerseyTest;

public class MainTest extends JerseyTest {

    public MainTest()throws Exception {
        super("com.mc426.restjersey");
    }

    @Test
    public void testCriarUsuario() {
    	JSONObject json = new JSONObject("{\r\n" + 
    			"	\"nome\": \"string\",\r\n" + 
    			"	\"usuario\": \"arthur\",\r\n" + 
    			"\"senha\": \"12345\",\r\n" + 
    			"\"gerente\": \"true\"\r\n" + 
    			"}\r\n" + 
    			"");
    	
       	String response = resource().path("usuarios").post(String.class,json.toString());
       	String expected = "{\r\n" + 
       			"    \"equipes\": [],\r\n" + 
       			"    \"tarefas\": [],\r\n" + 
       			"    \"nome\": \"string\",\r\n" + 
       			"    \"usuario\": \"arthur\",\r\n" + 
       			"    \"gerente\": true\r\n" + 
       			"}\r\n" + 
       			"";
       	JSONObject jsonExpected = new JSONObject(expected);
        assertEquals(jsonExpected.toString(), response);
    }

}
