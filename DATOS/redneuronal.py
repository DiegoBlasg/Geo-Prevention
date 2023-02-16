from keras.utils import to_categorical
from sklearn.preprocessing import LabelBinarizer
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix
import tensorflow as tf
from tensorflow import keras
import pandas as pd
from sklearn.model_selection import train_test_split

# Cargar datos de entrenamiento
dataset = pd.read_csv(
    r'C:\Users\diego\Desktop\geo-prevention\Geo-Prevention\DATOS\CompleteDataset.csv')
X = dataset.iloc[:, :15].values
y = dataset.iloc[:, 15].values

# Normalizar los datos
X_norm = (X - X.mean()) / X.std()

# Dividir los datos en conjunto de entrenamiento y conjunto de prueba
X_train, X_test, y_train, y_test = train_test_split(
    X_norm, y, test_size=0.2)

sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

# Definir la arquitectura de la red
model = keras.Sequential()
model.add(keras.layers.LSTM(128, input_shape=(X_train.shape[1], 1)))
model.add(keras.layers.Dense(1, activation='sigmoid'))

# Compilar el modelo
model.compile(loss='binary_crossentropy',
              optimizer='adam', metrics=['accuracy'])

# Entrenar la red
model.fit(X_train, y_train, epochs=50, batch_size=32,
          validation_data=(X_test, y_test))

# Evaluar el modelo
loss, accuracy = model.evaluate(X_test, y_test)
print('Loss:', loss)
print('Accuracy:', accuracy)

scores = model.evaluate(X_test, y_test)
print("\n%s: %.2f%%" % (model.metrics_names[1], scores[1]*100))


# ...


y_train_bin = to_categorical(y_train)
y_test_bin = to_categorical(y_test)

# ...

y_pred = model.predict(X_test)
y_pred_bin = to_categorical(y_pred.round())

cm = confusion_matrix(y_test_bin.argmax(axis=1), y_pred_bin.argmax(axis=1))
print(cm)

model.save('model4.h5')
