package Entidad;

import Entidad.Area;
import Entidad.Capacitador;
import Entidad.CargoManual;
import Entidad.Empleado;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2024-09-20T07:54:04")
@StaticMetamodel(Cargo.class)
public class Cargo_ { 

    public static volatile SingularAttribute<Cargo, Area> area;
    public static volatile SingularAttribute<Cargo, Integer> idCargo;
    public static volatile SingularAttribute<Cargo, String> siglatura;
    public static volatile CollectionAttribute<Cargo, Empleado> empleadoCollection;
    public static volatile CollectionAttribute<Cargo, CargoManual> cargoManualCollection;
    public static volatile CollectionAttribute<Cargo, Capacitador> capacitadorCollection;
    public static volatile SingularAttribute<Cargo, String> cargo;

}