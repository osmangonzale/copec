package Entidad;

import Entidad.CargoManual;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2024-09-20T07:54:04")
@StaticMetamodel(Manual.class)
public class Manual_ { 

    public static volatile SingularAttribute<Manual, Integer> codigo;
    public static volatile SingularAttribute<Manual, String> tipo;
    public static volatile CollectionAttribute<Manual, CargoManual> cargoManualCollection;
    public static volatile SingularAttribute<Manual, Integer> idManual;
    public static volatile SingularAttribute<Manual, String> cantenido;
    public static volatile SingularAttribute<Manual, String> nombre;
    public static volatile SingularAttribute<Manual, String> version;

}