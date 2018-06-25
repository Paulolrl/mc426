package com.teste;

import static org.junit.Assert.*;

import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.junit.Test;

import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.test.framework.JerseyTest;

import org.junit.runners.MethodSorters;

import org.junit.FixMethodOrder;
import org.junit.Test;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MainTest extends JerseyTest {

    public MainTest()throws Exception {
        super("com.mc426.restjersey");
    }

    @Test
    public void test1CriarUsuario() {
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\": \"Paulo Lucas\",\r\n" + 
    			"	\"usuario\": \"paulo\",\r\n" + 
    			"\"senha\": \"123456\",\r\n" + 
    			"\"gerente\": \"true\"\r\n" + 
    			"}\r\n" + 
    			"");
    	
       	ClientResponse response = resource().path("usuarios").post(ClientResponse.class,jsonRequest.toString());
       	JSONObject jsonExpected = new JSONObject("{\r\n" + 
       			"    \"equipes\": [],\r\n" + 
       			"    \"tarefas\": [],\r\n" + 
       			"    \"nome\": \"Paulo Lucas\",\r\n" + 
       			"    \"usuario\": \"paulo\",\r\n" + 
       			"    \"gerente\": true\r\n" + 
       			"}\r\n" + 
       			"");
        assertEquals(jsonExpected.toString(), response.getEntity(String.class));
        assertEquals(201,response.getStatus());
    }
    
    @Test
    public void test4CriarProjeto() {
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
       			"	\"nome\": \"Projeto X\",\r\n" + 
       			"	\"descricao\": \"Projeto para dominacao mundial\",\r\n" + 
       			"	\"prazo\": \"2018-09-15\",\r\n" + 
       			"}\r\n" + 
       			"");
       	
       	JSONObject jsonExpected = new JSONObject("{\r\n" + 
       			"    \"dono\": \"/usuarios/paulo\",\r\n" + 
       			"    \"equipes\": [],\r\n" + 
       			"    \"tarefas\": [],\r\n" + 
       			"    \"diretorio\": \"/diretorios/1\",\r\n" + 
       			"    \"nome\": \"Projeto X\",\r\n" + 
       			"    \"id\": 1,\r\n" + 
       			"    \"prazo\": \"2018-09-15\",\r\n" + 
       			"    \"descricao\": \"Projeto para dominacao mundial\"\r\n" + 
       			"}\r\n" + 
       			"");
       	
       	ClientResponse response = resource().path("projetos").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
       			
       	assertEquals(jsonExpected.toString(), response.getEntity(String.class));
        assertEquals(201,response.getStatus());
        
        jsonRequest = new JSONObject("{\r\n" + 
        		"	\"equipes\":[\"/equipes/1\"]\r\n" + 
        		"}\r\n" + 
        		"");
        
        response = resource().path("projetos/1/equipes").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
        jsonExpected = new JSONObject("{\r\n" + 
       			"    \"dono\": \"/usuarios/paulo\",\r\n" + 
       			"    \"equipes\": [\"/equipes/1\"],\r\n" + 
       			"    \"tarefas\": [],\r\n" + 
       			"    \"diretorio\": \"/diretorios/1\",\r\n" + 
       			"    \"nome\": \"Projeto X\",\r\n" + 
       			"    \"id\": 1,\r\n" + 
       			"    \"prazo\": \"2018-09-15\",\r\n" + 
       			"    \"descricao\": \"Projeto para dominacao mundial\"\r\n" + 
       			"}\r\n" + 
       			"");
        assertEquals(201,response.getStatus());
        assertEquals(jsonExpected.toString(), response.getEntity(String.class));
    }
    
    @Test
    public void test2CriarEquipeErro() {
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\": \"Minha Equipe\",\r\n" + 
    			"	\"membros\": [\"/usuarios/invalido1\", \"/usuarios/paulo\"]\r\n" + 
    			"}\r\n" + 
    			"");
    	
    	ClientResponse response = resource().path("equipes").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
    	assertEquals(404,response.getStatus());
    	
    }
    
    @Test
    public void test3CriarEquipe() {
    	criaUsuarios();
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\": \"Minha Equipe\",\r\n" + 
    			"	\"membros\": [\"/usuarios/paulo\", \"/usuarios/pedro\"]\r\n" + 
    			"}\r\n" + 
    			"");
    	ClientResponse response = resource().path("equipes").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
    	JSONObject jsonExpected = new JSONObject("{\r\n" + 
    			"    \"dono\": \"/usuarios/paulo\",\r\n" + 
    			"    \"membros\": [\r\n" + 
    			"    	 \"/usuarios/paulo\",\r\n" + 
    			"        \"/usuarios/pedro\"\r\n" + 
    			"    ],\r\n" + 
    			"    \"projetos\": [],\r\n" + 
    			"    \"nome\": \"Minha Equipe\",\r\n" + 
    			"    \"id\": 1\r\n" + 
    			"}\r\n" + 
    			"");
    	
    	assertEquals(jsonExpected.toString(), response.getEntity(String.class));
        assertEquals(201,response.getStatus());
    	
    }
    
    @Test
    public void test5VisulizaEquipe() {
    	ClientResponse response = resource().path("equipes/1").header("Authorization", "Basic cGF1bG86MTIzNDU2").get(ClientResponse.class);
    	JSONObject jsonExpected = new JSONObject("{\r\n" + 
    			"    \"dono\": \"/usuarios/paulo\",\r\n" + 
    			"    \"membros\": [\r\n" + 
    			"    	 \"/usuarios/paulo\",\r\n" + 
    			"        \"/usuarios/pedro\"\r\n" +
    			"    ],\r\n" + 
    			"    \"projetos\": [\"/projetos/1\"],\r\n" + 
    			"    \"nome\": \"Minha Equipe\",\r\n" + 
    			"    \"id\": 1\r\n" + 
    			"}");
    	
    	assertEquals(jsonExpected.toString(), response.getEntity(String.class));
        assertEquals(200,response.getStatus());
    }
    
    @Test
    public void test6VisualizaEquipeErro() {
    	ClientResponse response = resource().path("equipes/10").header("Authorization", "Basic cGF1bG86MTIzNDU2").get(ClientResponse.class);
    	assertEquals(404,response.getStatus());
    }
    
    @Test
    public void test7CriarTarefa() {
    	//Testa criar Tarefa
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\" : \"fazer BD\",\r\n" + 
    			"	\"descricao\": \"trabalho\",\r\n" + 
    			"	\"prazo\": \"2018-06-08\",\r\n" + 
    			"	\"responsaveis\": [\"/usuarios/paulo\",\"/usuarios/pedro\"],\r\n" + 
    			"	\"dependencias\": [],\r\n" + 
    			"	\"tags\": [\"urgente\",\"pra agora\"],\r\n" + 
    			"	\"arquivos\": []\r\n" + 
    			"}\r\n" + 
    			"");
    	ClientResponse response = resource().path("projetos/1/tarefas").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
    	JSONObject jsonExpected = new JSONObject("{\r\n" + 
        		"    \"progresso\": {\r\n" + 
        		"        \"texto\": \"Em espera\",\r\n" + 
        		"        \"porcentagem\": 0\r\n" + 
        		"    },\r\n" + 
        		"    \"feedbacks\": [],\r\n" + 
        		"    \"responsaveis\": [\r\n" + 
        		"        \"/usuarios/paulo\",\r\n" + 
        		"        \"/usuarios/pedro\"\r\n" + 
        		"    ],\r\n" + 
        		"    \"nome\": \"fazer BD\",\r\n" + 
        		"    \"id\": 1,\r\n" + 
        		"    \"prazo\": \"2018-06-08\",\r\n" + 
        		"    \"dependencias\": [],\r\n" + 
        		"    \"descricao\": \"trabalho\",\r\n" + 
        		"    \"tags\": [\r\n" + 
        		"        \"urgente\",\r\n" + 
        		"        \"pra agora\"\r\n" + 
        		"    ]\r\n" + 
        		"}\r\n" + 
        		"");
    	assertEquals(jsonExpected.toString(), response.getEntity(String.class));
       	assertEquals(201,response.getStatus());
    	
    }
    
    @Test
    public void test8CriarTarefaErro() {
    	//Testa criar Tarefa
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\" : \"fazer BD\",\r\n" + 
    			"	\"descricao\": \"trabalho\",\r\n" + 
    			"	\"prazo\": \"2018-06-08\",\r\n" + 
    			"	\"responsaveis\": [\"/usuarios/invalido\",\"/usuarios/pedro\"],\r\n" + 
    			"	\"dependencias\": [],\r\n" + 
    			"	\"tags\": [\"urgente\",\"pra agora\"],\r\n" + 
    			"	\"arquivos\": []\r\n" + 
    			"}\r\n" + 
    			"");
    	ClientResponse response = resource().path("projetos/1/tarefas").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
       	assertEquals(404,response.getStatus());
    	
    }
    
    @Test
    public void test9VisualizarTarefa() {
    	ClientResponse response = resource().path("projetos/1/tarefas/1").header("Authorization", "Basic cGF1bG86MTIzNDU2").get(ClientResponse.class);
    	JSONObject jsonExpected = new JSONObject("{\r\n" + 
        		"    \"progresso\": {\r\n" + 
        		"        \"texto\": \"Em espera\",\r\n" + 
        		"        \"porcentagem\": 0\r\n" + 
        		"    },\r\n" + 
        		"    \"feedbacks\": [],\r\n" + 
        		"    \"responsaveis\": [\r\n" + 
        		"        \"/usuarios/paulo\",\r\n" + 
        		"        \"/usuarios/pedro\"\r\n" + 
        		"    ],\r\n" + 
        		"    \"nome\": \"fazer BD\",\r\n" + 
        		"    \"id\": 1,\r\n" + 
        		"    \"prazo\": \"2018-06-08\",\r\n" + 
        		"    \"dependencias\": [],\r\n" + 
        		"    \"descricao\": \"trabalho\",\r\n" + 
        		"    \"tags\": [\r\n" + 
        		"        \"urgente\",\r\n" + 
        		"        \"pra agora\"\r\n" + 
        		"    ]\r\n" + 
        		"}\r\n" + 
        		"");
    	assertEquals(jsonExpected.toString(), response.getEntity(String.class));
       	assertEquals(200,response.getStatus());
    }
    
    @Test
    public void test91VisualizarTarefaErro() {
    	ClientResponse response = resource().path("projetos/1/tarefas/10").header("Authorization", "Basic cGF1bG86MTIzNDU2").get(ClientResponse.class);
    	assertEquals(404,response.getStatus());
    }
    
    @Test
    public void test91CriarTarefaErro2() {
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\" : \"fazer BD\",\r\n" + 
    			"	\"descricao\": \"trabalho\",\r\n" + 
    			"	\"prazo\": \"2018-06-08\",\r\n" + 
    			"	\"responsaveis\": [\"/usuarios/arthur\",\"/usuarios/pedro\"],\r\n" + 
    			"	\"dependencias\": [],\r\n" + 
    			"	\"tags\": [\"urgente\",\"pra agora\"],\r\n" + 
    			"	\"arquivos\": []\r\n" + 
    			"}\r\n" + 
    			"");
    	ClientResponse response = resource().path("projetos/1/tarefas").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
       	assertEquals(400,response.getStatus());
    }
    
    @Test
    public void test92VisualizarUsuario() {
    	ClientResponse response = resource().path("usuarios/paulo").header("Authorization", "Basic cGF1bG86MTIzNDU2").get(ClientResponse.class);
    	JSONObject jsonExpected = new JSONObject("{\r\n" + 
    			"    \"equipes\": [\r\n" + 
    			"        \"/equipes/1\",\r\n" + 
    			"    ],\r\n" + 
    			"    \"tarefas\": [\r\n" + 
    			"        \"/projetos/1/tarefas/1\",\r\n" + 
    			"    ],\r\n" + 
    			"    \"nome\": \"Paulo Lucas\",\r\n" + 
    			"    \"usuario\": \"paulo\",\r\n" + 
    			"    \"gerente\": true\r\n" + 
    			"}\r\n" + 
    			"");
    	assertEquals(jsonExpected.toString(), response.getEntity(String.class));
       	assertEquals(200,response.getStatus());
    }
    
    @Test
    public void test93RemoverUsuarioEquipe() {
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\": \"Minha Equipe\",\r\n" + 
    			"	\"membros\": [\"/usuarios/pedro\"]\r\n" + 
    			"}\r\n" + 
    			"");
    	resource().path("equipes/1").header("Authorization", "Basic cGF1bG86MTIzNDU2").post(ClientResponse.class, jsonRequest.toString());
    	ClientResponse response = resource().path("usuarios/paulo").header("Authorization", "Basic cGF1bG86MTIzNDU2").get(ClientResponse.class);
    	JSONObject jsonExpected = new JSONObject("{\r\n" + 
    			"    \"equipes\": [],\r\n" + 
    			"    \"tarefas\": [],\r\n" + 
    			"    \"nome\": \"Paulo Lucas\",\r\n" + 
    			"    \"usuario\": \"paulo\",\r\n" + 
    			"    \"gerente\": true\r\n" + 
    			"}\r\n" + 
    			"");
    	assertEquals(jsonExpected.toString(), response.getEntity(String.class));
       	assertEquals(200,response.getStatus());
       	
    }
    
    public void criaUsuarios() {
    	JSONObject jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\": \"Pedro Alan\",\r\n" + 
    			"	\"usuario\": \"pedro\",\r\n" + 
    			"	\"senha\": \"123456\",\r\n" + 
    			"	\"gerente\": \"true\"\r\n" + 
    			"}\r\n" + 
    			"");
       	resource().path("usuarios").post(ClientResponse.class,jsonRequest.toString());
       	
       	jsonRequest = new JSONObject("{\r\n" + 
    			"	\"nome\": \"Arthur Dadalto\",\r\n" + 
    			"	\"usuario\": \"arthur\",\r\n" + 
    			"	\"senha\": \"123456\",\r\n" + 
    			"	\"gerente\": \"true\"\r\n" + 
    			"}\r\n" + 
    			"");
       	resource().path("usuarios").post(ClientResponse.class,jsonRequest.toString());
    }
    
}
