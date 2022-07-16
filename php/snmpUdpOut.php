<?php
  
    $destIP="localhost";
    $community = "public";
    $oid = ".1.3.6.1.2.1.7.4.0";

    $ipInDelivers = snmp2_get( $destIP,$community ,$oid);

    //retira somente o dado inteiro do retorno da consulta
    $ipIn = explode(" ", $ipInDelivers); 
    
    
    //gera a saída que será recebida pelo front-end
    echo $ipIn[1];
?>
