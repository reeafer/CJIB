import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class databaseconnection {

    private static final String URL = "jdbc:postgresql://localhost:5432/school";
    private static final String USER = "postgres";
    private static final String PASSWORD = "password";

    public static void main(String[] args) {

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            System.out.println("✅ Verbonden met de PostgreSQL database!");
        } catch (SQLException e) {
            System.out.println("❌ Verbinding mislukt!");
            e.printStackTrace();
        }
    }
}
