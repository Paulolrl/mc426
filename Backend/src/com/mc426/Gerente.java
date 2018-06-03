package com.mc426;

import java.util.Date;
import java.util.List;

public class Gerente extends Usuario{

	public Gerente(String userName, String senha, String nome, int idade) {
		super(userName, senha, nome, idade);
	}
	
	public void criarNovoProjeto(String nome, String descricao,Date prazo, List<Equipe> equipes)
	throws Exception{
		Projeto novoProjeto = new Projeto(nome, descricao, prazo);
		for (Equipe equipe : equipes) {
			equipe.adicionarProjeto(novoProjeto);
		}
		
	}
	
	public void criarNovaEquipe(String nome, List<Usuario> integrantes) throws Exception{
		new Equipe(nome, integrantes);		
	}
}
