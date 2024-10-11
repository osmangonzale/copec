<%@taglib uri="/WEB-INF/tlds/Menu.tld" prefix="Menu"%>
<%@taglib uri="/WEB-INF/tlds/Area.tld" prefix="Area"%>
<%@taglib uri="/WEB-INF/tlds/Alertas.tld" prefix="Alertas"%>
<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Area</title>
        <jsp:include page="Encabezado.jsp"></jsp:include>
            <script type = "text/javascript" >
                history.pushState(null, null, 'Area.jsp');
                window.addEventListener('popstate', function (event) {
                    history.pushState(null, null, 'Area.jsp');
                });
            </script>
        </head>
        <body>
            <div id="subpage">
                <div id="templatemo_wrapper" >
                <Menu:Menu/>
                <Area:Area/>
            </div>
            <Alertas:Alertas />
        </div>
    </body>
</html>