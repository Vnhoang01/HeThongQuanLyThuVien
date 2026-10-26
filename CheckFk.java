import java.sql.*;

public class CheckFk {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/Backend_spring_boot?useSSL=false&serverTimezone=UTC";
        try (Connection c = DriverManager.getConnection(url, "root", "");
             Statement s = c.createStatement()) {

            System.out.println("=== FK tro toi admins (theo schema) ===");
            try (ResultSet rs = s.executeQuery(
                    "SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME " +
                    "FROM information_schema.KEY_COLUMN_USAGE " +
                    "WHERE REFERENCED_TABLE_SCHEMA = 'Backend_spring_boot' AND REFERENCED_TABLE_NAME = 'admins'")) {
                while (rs.next()) {
                    System.out.println(rs.getString(1) + "." + rs.getString(2) + "." + rs.getString(3)
                            + "  constraint=" + rs.getString(4));
                }
            }

            System.out.println("=== tat ca bang trong schema ===");
            try (ResultSet rs = s.executeQuery(
                    "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='Backend_spring_boot'")) {
                while (rs.next()) System.out.println(" - " + rs.getString(1));
            }

            System.out.println("=== loan_slips rows ===");
            try (ResultSet rs = s.executeQuery("SELECT Id, admin_id, customer_id FROM loan_slips")) {
                while (rs.next()) System.out.println(" loan_slip " + rs.getLong(1) + " admin=" + rs.getLong(2) + " cust=" + rs.getLong(3));
            }

            System.out.println("=== FK khac cua loan_slips ===");
            try (ResultSet rs = s.executeQuery(
                    "SELECT COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME " +
                    "FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA='Backend_spring_boot' AND TABLE_NAME='loan_slips'")) {
                while (rs.next()) {
                    System.out.println(" " + rs.getString(1) + " c=" + rs.getString(2) + " -> " + rs.getString(3) + "." + rs.getString(4));
                }
            }

            System.out.println("=== nullability loan_slips ===");
            try (ResultSet rs = s.executeQuery(
                    "SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_TYPE FROM information_schema.COLUMNS " +
                    "WHERE TABLE_SCHEMA='Backend_spring_boot' AND TABLE_NAME='loan_slips'")) {
                while (rs.next()) System.out.println(" " + rs.getString(1) + " null=" + rs.getString(2) + " " + rs.getString(3));
            }

            System.out.println("=== admins rows ===");
            try (ResultSet rs = s.executeQuery("SELECT Id, Name, Email, Role FROM admins")) {
                while (rs.next()) System.out.println(" admin " + rs.getLong(1) + " " + rs.getString(2) + " " + rs.getString(3) + " role=" + rs.getString(4));
            }

            System.out.println("=== books / book_details ===");
            try (ResultSet rs = s.executeQuery("SELECT * FROM books")) {
                ResultSetMetaData m = rs.getMetaData();
                while (rs.next()) { StringBuilder sb = new StringBuilder(" book "); for (int i=1;i<=m.getColumnCount();i++) sb.append(m.getColumnName(i)).append("=").append(rs.getObject(i)).append(" "); System.out.println(sb); }
            }
            try (ResultSet rs = s.executeQuery("SELECT * FROM book_details")) {
                ResultSetMetaData m = rs.getMetaData();
                while (rs.next()) { StringBuilder sb = new StringBuilder(" detail "); for (int i=1;i<=m.getColumnCount();i++) sb.append(m.getColumnName(i)).append("=").append(rs.getObject(i)).append(" "); System.out.println(sb); }
            }
            try (ResultSet rs = s.executeQuery("SELECT Id, Name, Email FROM customers")) {
                while (rs.next()) System.out.println(" cust " + rs.getLong(1) + " " + rs.getString(2) + " " + rs.getString(3));
            }
            try (ResultSet rs = s.executeQuery("SELECT Id, Name FROM categories")) {
                while (rs.next()) System.out.println(" cat " + rs.getLong(1) + " " + rs.getString(2));
            }
            try (ResultSet rs = s.executeQuery("SELECT Id, Name FROM authors")) {
                while (rs.next()) System.out.println(" aut " + rs.getLong(1) + " " + rs.getString(2));
            }
            try (ResultSet rs = s.executeQuery("SELECT Id, Name FROM publishers")) {
                while (rs.next()) System.out.println(" pub " + rs.getLong(1) + " " + rs.getString(2));
            }
            try (ResultSet rs = s.executeQuery("SELECT * FROM errors")) {
                ResultSetMetaData m = rs.getMetaData();
                while (rs.next()) { StringBuilder sb = new StringBuilder(" err "); for (int i=1;i<=m.getColumnCount();i++) sb.append(m.getColumnName(i)).append("=").append(rs.getObject(i)).append(" "); System.out.println(sb); }
            }
            try (ResultSet rs = s.executeQuery("SELECT * FROM loan_slip_details")) {
                ResultSetMetaData m = rs.getMetaData();
                while (rs.next()) { StringBuilder sb = new StringBuilder(" lsd "); for (int i=1;i<=m.getColumnCount();i++) sb.append(m.getColumnName(i)).append("=").append(rs.getObject(i)).append(" "); System.out.println(sb); }
            }
            try (ResultSet rs = s.executeQuery("SELECT * FROM loan_slip_detail_error")) {
                ResultSetMetaData m = rs.getMetaData();
                while (rs.next()) { StringBuilder sb = new StringBuilder(" lsde "); for (int i=1;i<=m.getColumnCount();i++) sb.append(m.getColumnName(i)).append("=").append(rs.getObject(i)).append(" "); System.out.println(sb); }
            }
            try (ResultSet rs = s.executeQuery("SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_TYPE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='Backend_spring_boot' AND TABLE_NAME='loan_slip_details'")) {
                while (rs.next()) System.out.println(" lsd col " + rs.getString(1) + " null=" + rs.getString(2) + " " + rs.getString(3));
            }
        }
    }
}
