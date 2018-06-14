package com.teste;

import static org.junit.Assert.*;

import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.junit.Test;

import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.test.framework.JerseyTest;

public class MainTest extends JerseyTest {

    public MainTest()throws Exception {
        super("com.mc426.restjersey");
    }

    @Test
    public void testCriarUsuario() {
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\": \"string\",\r\n" + 
    			"	\"usuario\": \"arthur\",\r\n" + 
    			"\"senha\": \"12345\",\r\n" + 
    			"\"gerente\": \"true\"\r\n" + 
    			"}\r\n" + 
    			"");
    	
       	ClientResponse response = resource().path("usuarios").post(ClientResponse.class,jsonRequest.toString());
       	JSONObject jsonExpected = new JSONObject("{\r\n" + 
       			"    \"equipes\": [],\r\n" + 
       			"    \"tarefas\": [],\r\n" + 
       			"    \"nome\": \"string\",\r\n" + 
       			"    \"usuario\": \"arthur\",\r\n" + 
       			"    \"gerente\": true\r\n" + 
       			"}\r\n" + 
       			"");
        assertEquals(jsonExpected.toString(), response.getEntity(String.class));
        assertEquals(201,response.getStatus());
    }

}
