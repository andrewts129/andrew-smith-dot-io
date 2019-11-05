package utils

import scala.util.Random

import scala.concurrent.ExecutionContext

object Bogosorter {
  var array: Seq[Int] = initArray
  var numCompletions: Int = 0

  def bogoStep(): Unit = {
    if (isSorted(array)) {
      numCompletions += 1
      array = initArray
    } else {
      array = randomSwap(array)
    }
  }

  private def initArray: Seq[Int] = {
    Random.shuffle((1 to 15).toVector)
  }

  private def randomSwap[T](a: Seq[T]): Seq[T] = {
    val i = Random.nextInt(a.size)
    val j = Random.nextInt(a.size - 1)
    swap(a, i, if (i <= j) j + 1 else j)
  }

  @scala.annotation.tailrec
  private def isSorted[T](a: Seq[T])(implicit ev: T => Ordered[T]): Boolean = {
    if (a.size < 2) {
      true
    } else {
      (a.head <= a.tail.head) && isSorted(a.tail)
    }
  }

  private def swap[T](a: Seq[T], i: Int, j: Int): Seq[T] = {
    a.updated(i, a(j)).updated(j, a(i))
  }
}