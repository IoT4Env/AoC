import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

import java.io.FileReader;
import java.io.BufferedReader;
import java.io.FileNotFoundException;

public class Part1Solution {
    public static void main(String[] args) {
        String fileContent = readFile("input1.txt");
        
        Integer[][] matrix = getMatrix(fileContent);
        
        long similarity = getSimilarity(matrix[0], matrix[1]);
        System.out.println(similarity);
    }

    public static String readFile(String filePath){
        try{
            FileReader fileReader = new FileReader(filePath);
            BufferedReader buffer = new BufferedReader(fileReader);
            StringBuilder stringBuilder = new StringBuilder();

            String line;
            while ((line = buffer.readLine()) != null){
                stringBuilder.append(line + '\n');
            }

            buffer.close();
            return stringBuilder.toString();
        }catch (FileNotFoundException exception){
            System.out.println("provided file path cannot be founbd");
        }catch (Exception exception){
            System.out.println("Something whent horribly wrong!!!");
            System.out.println(exception);
        }

        return "";
    }

    public static Integer[][] getMatrix(String fileContent){
        String[] lines = fileContent.split("\n");

        List<Integer> column1 = new ArrayList<Integer>();
        List<Integer> column2 = new ArrayList<Integer>();
        
        for (String line : lines){
            String[] values = line.split(" ");
            column1.add(Integer.parseInt(values[0]));
            column2.add(Integer.parseInt(values[values.length - 1]));
        }

        return new Integer[][] {column1.toArray(new Integer[column1.size()]), column2.toArray(new Integer[column2.size()])};
    }

    public static long getSimilarity(Integer[] column1, Integer[] column2){
        long similarity = 0;
        for (int i = 0; i < column1.length; i++){
            //Count occurences
            short occurences = 0;
            for (int value : column2){
                if (column1[i] == value) 
                    occurences++;
            }
            similarity += column1[i] * occurences;
        }

        return similarity;
    }
}
