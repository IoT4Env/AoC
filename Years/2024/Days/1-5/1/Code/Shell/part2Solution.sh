# Returns a contigous array of numbers (removing '\n's and consecutive spaces)
input1=($(cat input1.txt))

column1=()
column2=()

index=0

# '@' means all elements in array
for element in "${input1[@]}";

# Saves in different columns as in the original file input (even index for first column, odd index for second column)
    do if [ $(($index % 2)) -eq 0 ]; 
    then
        column1+=($element)
    else
        column2+=($element)

    fi

    ((index+=1))

done

totalSimilarity=0

c1="${column1[@]}"
c2="${column2[@]}"

# Veeeeery slow processing (#...................................)
for elementCol1 in $c1;
    do for elementCol2 in $c2;
        do if [ $(($elementCol1)) -eq $elementCol2 ]; 
        then
            ((totalSimilarity+=$elementCol1))
        fi
    
    done;

done;

echo $totalSimilarity
