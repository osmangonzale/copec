package Entidad;

import Entidad.Cargo;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2024-09-20T07:54:04")
@StaticMetamodel(Area.class)
public class Area_ { 

    public static volatile SingularAttribute<Area, String> area;
    public static volatile SingularAttribute<Area, Integer> idArea;
    public static volatile SingularAttribute<Area, String> siglatura;
    public static volatile CollectionAttribute<Area, Cargo> cargoCollection;

}