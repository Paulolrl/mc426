package com.mc426;

import java.util.Date;
import java.util.List;

public class Gerente extends Usuario{

	public Gerente(String userName, String senha, String nome) {
		super(userName, senha, nome);
	}
	
	public void criarNovoProjeto(String nome, String descricao,Date prazo,Gerente dono,
			List<Equipe> equipes) throws Exception{
		Projeto novoProjeto = new Projeto(nome, descricao, prazo, dono);
		for (Equipe equipe : equipes) {
			equipe.adicionarProjeto(novoProjeto);
		}	
	}
	
	public void criarNovaEquipe(String nome, List<Usuario> integrantes, Gerente dono) throws Exception{
		new Equipe(nome, integrantes, dono);		
	}
	
	
}
