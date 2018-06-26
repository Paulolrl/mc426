package com.mc426.restjersey;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.mc426.*;

@Path("projetos")
public class ControllerProjetos {

	@POST
	@Produces("application/json")
	public Response CreateProjeto(@Context HttpHeaders httpheaders, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			if (!(usuario instanceof Gerente)) {
				resposta = "Usuario nao encontrado ou nao tem permissao de gerente.";
				return Response.status(401).entity(resposta).build();
			}

			// Constroi argumentos para criarNovoProjeto
			JSONObject jsonBody = new JSONObject(body);
			String nome = jsonBody.getString("nome");
			String descricao = jsonBody.getString("descricao");
			String prazo = jsonBody.getString("prazo");
			
			// Verifica se prazo está no formato YYYY-MM-DD
			Pattern pattern = Pattern.compile("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])");
			Matcher matcher = pattern.matcher(prazo);
			if (!matcher.find()) {
				resposta = "Formato de prazo não aceito.";
				return Response.status(400).entity(resposta).build();
			}
			
			Gerente gerente = (Gerente) usuario;

			// Cria equipe dummy para que o gerente automaticamente faça parte do projeto
			List<Usuario> dummy = new ArrayList<Usuario>();
			Equipe equipeDummy = new Equipe("dummy", dummy, (Gerente) usuario);
			List<Equipe> listaEquipes = new ArrayList<Equipe>();
			listaEquipes.add(equipeDummy);

			Projeto projeto = gerente.criarNovoProjeto(nome, descricao, prazo, gerente, listaEquipes);

			return Response.status(201).entity(projeto.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@GET
	@Produces("application/json")
	public Response GetUserProjects(@Context HttpHeaders httpheaders, String body) throws JSONException {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado para autorizacao.";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject retv = new JSONObject();
			retv.put("projetos", usuario.projetosParticipados().stream().map(x -> "/projetos/" + x.getId())
					.collect(Collectors.toList()));
			return Response.status(200).entity(retv.toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}")
	@GET
	@Produces("application/json")
	public Response SelectProjeto(@Context HttpHeaders httpheaders, @PathParam("id") int id) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(id);

			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(projeto)) {
				resposta = "Usuario nao faz parte do projeto";
				return Response.status(401).entity(resposta).build();
			}

			return Response.status(200).entity(projeto.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}")
	@POST
	@Produces("application/json")
	public Response UpdateProjeto(@Context HttpHeaders httpheaders, @PathParam("id") int id, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));
			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(id);

			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(projeto)) {
				resposta = "Usuario nao faz parte do projeto";
				return Response.status(401).entity(resposta).build();
			}

			if (!(usuario instanceof Gerente)) {
				resposta = "Usuario nao tem permissao de gerente.";
				return Response.status(401).entity(resposta).build();
			}

			// Constroi argumentos dos sets
			JSONObject jsonBody = new JSONObject(body);
			String nomeProjeto = jsonBody.getString("nome");
			String descricao = jsonBody.getString("descricao");
			String prazo = jsonBody.getString("prazo");

			// Verifica se prazo está no formato YYYY-MM-DD
			Pattern pattern = Pattern.compile("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])");
			Matcher matcher = pattern.matcher(prazo);
			if (!matcher.find()) {
				resposta = "Formato de prazo não aceito.";
				return Response.status(400).entity(resposta).build();
			}

			projeto.setNome(nomeProjeto);
			projeto.setDescricao(descricao);
			projeto.setPrazo(prazo);

			return Response.status(201).entity(projeto.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@Path("{id}")
	@DELETE
	@Produces("application/json")
	public Response DeleteProjeto(@Context HttpHeaders httpheaders, @PathParam("id") int id) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(id);

			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!projeto.getDono().equals(usuario)) {
				resposta = "Usuario nao e dono";
				return Response.status(401).entity(resposta).build();
			}
			Gerente gerente = (Gerente) usuario;

			gerente.removerProjeto(projeto);
			return Response.status(200).entity(projeto.toJson().toString()).build();
		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}
	
	@POST
	@Path("/{idProjeto}/tarefas/")
	@Produces("application/json")
	public Response CreateTarefa(@Context HttpHeaders httpheaders, @PathParam("idProjeto") int idProjeto, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(idProjeto);

			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(projeto)) {
				resposta = "Usuario nao faz parte do projeto";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);
			String nome = jsonBody.getString("nome");
			String descricao = jsonBody.getString("descricao");
			String prazo = jsonBody.getString("prazo");

			// Verifica se prazo está no formato YYYY-MM-DD
			Pattern pattern = Pattern.compile("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])");
			Matcher matcher = pattern.matcher(prazo);
			if (!matcher.find()) {
				resposta = "Formato de prazo não aceito.";
				return Response.status(400).entity(resposta).build();
			}

			JSONArray jArray = jsonBody.getJSONArray("tags");
			List<String> tags = new ArrayList<String>();
			if (jArray != null) {
				for (int i = 0; i < jArray.length(); i++) {
					tags.add(jArray.getString(i));
				}
			}

			// Dependencias no formato projetos/{idProjeto}/tarefas/{idTarefa}
			jArray = jsonBody.getJSONArray("dependencias");
			List<Tarefa> dependencias = new ArrayList<Tarefa>();
			Tarefa tarefa;
			if (jArray != null) {
				for (int i = 0; i < jArray.length(); i++) {
					tarefa = Tarefa.getPorResource(jArray.getString(i));
					if (tarefa == null) {
						resposta = "Tarefa nao encontrado para adicionar como dependencia";
						return Response.status(404).entity(resposta).build();
					}
					dependencias.add(tarefa);
				}
			}

			// Responsaveis no formato /usuarios/{usuario}
			jArray = jsonBody.getJSONArray("responsaveis");
			List<Usuario> responsaveis = new ArrayList<Usuario>();
			Usuario responsavel;
			if (jArray != null) {
				for (int i = 0; i < jArray.length(); i++) {
					responsavel = Usuario.getPorResource(jArray.getString(i));
					if (responsavel == null) {
						resposta = "Usuário não encontrado para adicionar no projeto";
						return Response.status(404).entity(resposta).build();
					} else if (!responsavel.participaProjeto(projeto)) {
						resposta = "Usuário não está no projeto";
						return Response.status(400).entity(resposta).build();
					}
					responsaveis.add(responsavel);

				}
			}

			Tarefa novaTarefa = projeto.criarTarefa(nome, descricao, prazo, responsaveis, dependencias, tags);

			return Response.status(201).entity(novaTarefa.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@POST
	@Path("/{idProjeto}/tarefas/{idTarefa}/feedbacks")
	@Produces("application/json")
	public Response CreateFeedback(@Context HttpHeaders httpheaders, @PathParam("idProjeto") int idProjeto,
			@PathParam("idTarefa") int idTarefa, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(idProjeto);

			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(projeto)) {
				resposta = "Usuario nao faz parte do projeto";
				return Response.status(401).entity(resposta).build();
			}

			Tarefa tarefa = Tarefa.getPorId(idTarefa);

			if (tarefa == null) {
				resposta = "Tarefa nao encontrada";
				return Response.status(404).entity(resposta).build();
			}

			JSONObject jBody = new JSONObject(body);
			Usuario autor = Usuario.getPorResource(jBody.getString("autor"));
			tarefa.adicionarFeedback(autor, jBody.getInt("nota"), jBody.getString("comentario"));

			return Response.status(201).entity(tarefa.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@GET
	@Path("/{idProjeto}/tarefas/{idTarefa}")
	@Produces("application/json")
	public Response SelectTarefa(@Context HttpHeaders httpheaders, @PathParam("idProjeto") int idProjeto,
			@PathParam("idTarefa") int idTarefa) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(idProjeto);

			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(projeto)) {
				resposta = "Usuario nao faz parte do projeto";
				return Response.status(401).entity(resposta).build();
			}

			Tarefa tarefa = Tarefa.getPorId(idTarefa);

			if (tarefa == null) {
				resposta = "Tarefa nao encontrada";
				return Response.status(404).entity(resposta).build();
			}

			return Response.status(200).entity(tarefa.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@POST
	@Path("/{idProjeto}/tarefas/{idTarefa}")
	@Produces("application/json")
	public Response UpdateTarefa(@Context HttpHeaders httpheaders, @PathParam("idProjeto") int idProjeto,
			@PathParam("idTarefa") int idTarefa, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(idProjeto);

			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(projeto)) {
				resposta = "Usuario nao faz parte do projeto";
				return Response.status(401).entity(resposta).build();
			}

			Tarefa tarefa = Tarefa.getPorId(idTarefa);

			if (tarefa == null) {
				resposta = "Tarefa nao encontrada";
				return Response.status(404).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);
			String nome = jsonBody.getString("nome");
			String descricao = jsonBody.getString("descricao");

			String prazo = jsonBody.getString("prazo");
			Pattern pattern = Pattern.compile("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])");
			Matcher matcher = pattern.matcher(prazo);

			if (!matcher.find()) {
				resposta = "Formato de prazo nï¿½o aceito.";
				return Response.status(400).entity(resposta).build();
			}

			JSONArray jArray = jsonBody.getJSONArray("tags");
			List<String> tags = new ArrayList<String>();
			if (jArray != null) {
				for (int i = 0; i < jArray.length(); i++) {
					tags.add(jArray.getString(i));
				}
			}

			jArray = jsonBody.getJSONArray("dependencias");
			List<Tarefa> dependencias = new ArrayList<Tarefa>();
			Tarefa dependencia;
			if (jArray != null) {
				for (int i = 0; i < jArray.length(); i++) {
					dependencia = Tarefa.getPorResource(jArray.getString(i));
					if (tarefa == null) {
						resposta = "Tarefa nao encontrado para adicionar como dependencia";
						return Response.status(404).entity(resposta).build();
					}
					dependencias.add(dependencia);
				}
			}

			jArray = jsonBody.getJSONArray("responsaveis");
			List<Usuario> responsaveis = new ArrayList<Usuario>();
			Usuario responsavel;
			if (jArray != null) {
				for (int i = 0; i < jArray.length(); i++) {
					responsavel = Usuario.getPorResource(jArray.getString(i));
					if (responsavel == null) {
						resposta = "Usuario nao encontrado para adicionar na tarefa";
						return Response.status(404).entity(resposta).build();
					}
					responsaveis.add(responsavel);

				}
			}
			tarefa.setNome(nome);
			tarefa.setDescricao(descricao);
			tarefa.setPrazo(prazo);
			tarefa.setTags(tags);
			tarefa.alteraResponsaveis(responsaveis);
			tarefa.alteraDependencias(dependencias);

			JSONObject progresso = jsonBody.getJSONObject("progresso");
			int porcentagem = progresso.getInt("porcentagem");
			String texto = progresso.getString("texto");
			tarefa.adicionarStatus(porcentagem, texto);

			return Response.status(201).entity(tarefa.toJson().toString()).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}

	@POST
	@Path("/{idProjeto}/equipes/")
	@Produces("application/json")
	public Response UpdateEquipe(@Context HttpHeaders httpheaders, @PathParam("idProjeto") int idProjeto, String body) {
		String resposta;
		try {
			if (httpheaders.getRequestHeaders().get("Authorization") == null) {
				resposta = "Forneca um Header do tipo Authorization.";
				return Response.status(401).entity(resposta).build();
			}

			Usuario usuario = Login.verifica(httpheaders.getRequestHeaders().get("Authorization").get(0));

			if (usuario == null) {
				resposta = "Usuario nao encontrado.";
				return Response.status(401).entity(resposta).build();
			}

			Projeto projeto = Projeto.getPorId(idProjeto);
			if (projeto == null) {
				resposta = "Projeto nao encontrado";
				return Response.status(404).entity(resposta).build();
			}

			if (!usuario.participaProjeto(projeto)) {
				resposta = "Usuario nao faz parte do projeto";
				return Response.status(401).entity(resposta).build();
			}

			JSONObject jsonBody = new JSONObject(body);

			JSONArray jArray = jsonBody.getJSONArray("equipes");
			List<Equipe> equipes = new ArrayList<Equipe>();
			Equipe equipe;
			if (jArray != null) {
				for (int i = 0; i < jArray.length(); i++) {
					equipe = Equipe.getPorResource(jArray.getString(i));
					if (equipe == null) {
						resposta = "Equipe nao encontrada.";
						return Response.status(404).entity(resposta).build();
					}
					equipes.add(equipe);
				}

				for (Equipe e : equipes) {
					if (!projeto.getListaEquipes().contains(e)) {
						projeto.adicionarEquipe(e);
					}
				}

				for (Equipe e : projeto.getListaEquipes()) {
					if (!equipes.contains(e)) {
						projeto.removerEquipe(e);
					}
				}
				return Response.status(201).entity(projeto.toJson().toString()).build();
			}

			resposta = "Nenhuma equipe passada como parï¿½metro.";
			return Response.status(400).entity(resposta).build();

		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			resposta = sw.toString(); // stack trace as a string
			return Response.status(500).entity(resposta).build();
		}
	}
}
