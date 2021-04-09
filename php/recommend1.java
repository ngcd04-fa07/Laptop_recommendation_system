public class dbms extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
response.setContentType("text/html;charset=UTF-8");
     Class.forName("java.sql.Driver");
    con=DriverManager.getConnection("jdbc:mysql://localhost:3306/test?useSSL=false","root","");
    stmt=con.createStatement();
    String sfld=(String)srchFldCBX.getSelectedItem();
    String op=(String)opCBX.getSelectedItem();
    String crit=criteriaTF.getText();
    String query="Select * from laptops_dataset where "+sfld+""+op+""+crit+";";
    rs=stmt.executeQuery(query);
    //System.out.println(rs); connecting database and storing the laptop data in an object for traversal 
     double a[][] = {       
                        {1.0, 0.0},   
                        {0.0, 1.0}
                    };    //for 2 parameters(price and rating),2*2 matrix
     if(Integer.parseInt(request.getParameter("combo1"))==1)
     {a[0][1]=Double.parseDouble(request.getParameter("ques1"));
    a[1][0]=1.0/Double.parseDouble(request.getParameter("ques1"));}
     else
     {
    a[1][0]=Double.parseDouble(request.getParameter("ques1"));
    a[0][1]=1.0/Double.parseDouble(request.getParameter("ques1"));
     }  //filling the response given by the user into the matrix with pre-defined value given to the response.
    int i,j;
    double s1=0.0,s2=0.0,c1,c2;
    s1=a[0][0]+a[1][0];
    s2=a[0][1]+a[1][1]; //calculating sum of each row of the matrix to normalize
    for(i=0;i<2;i++)
    for(j=0;j<2;j++)
    {
    if(i==0)
     a[j][i]/=s1;
    if(i==1)
     a[j][i]/=s2;
    }   //normalizing the matrix
     c1=(a[0][0]+a[0][1])/3;
    c2=(a[1][0]+a[1][1])/3; //weighted mean for each attribute(price and rating)
        try (PrintWriter out = response.getWriter()) {
           int index=0;
           ArrayList<laptop> c = new ArrayList<>();     //for comparison
           ArrayList<laptop> y1 = new ArrayList<>();    //for sorting
           double w1=0.0,w2=0.0;
    while(rs.hasNext()) {
        DBObject obj = rs.next();
        double price = (double)obj.get("PRICE");
        int rating = (int)obj.get("Rating");    //getting values of each laptop and storing in the array
        c.add(new laptop(price,rating,0.0));    //storing the value in the array
        w1+=price;
        w2+=rating;     //calculating the total sum of each attribute to normalize
        index++;
    }
    w1/=index;
    w2/=index;  //normalizing the total sum 
    double p,r;
    for(laptop str: c){
        p=str.price/w1;
        r=str.rating/w2;    //normalizing each data from the laptop dataset
        double score=c2*r-c1*p; //calculating score
        y1.add(new laptop(str.price,str.rating,score));     //storing calculated store to sort 
    }
    Collections.sort(y1,new scorecompare());    //sorting the array using the concept of comparators
    index=0;
DecimalFormat numberFormat = new DecimalFormat("#.0000");   //for dispaying the calculated score upto 4 decimal places
            for(laptop str: y1){
        out.print("<tr><td>"+(index+1)+"</td>");
        out.println("<td>"+"Rs. "+str.price+"</td>");
        out.println("<td>"+str.rating+"</td>"); //displaying each car in a sorted way
        out.println("<td>"+numberFormat.format((str.score)*10)+"</td></tr>");
        index++;
	   }
            out.println("</table>"+(index)+" Results Found</center>");
            out.println("</body></html>");
        }
        catch(Exception e){
            System.out.print(e);
        }
        con.close(); 
    }
}